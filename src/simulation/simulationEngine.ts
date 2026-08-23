import {
  InventoryItem,
  InventoryLot,
  BloodRequest,
  DemandDataPoint,
  ComponentForecast,
  RiskItem,
  TransferRecord,
  AuditEvent,
  ScenarioId,
  Network,
} from '../types';
import { evaluateOperationalRisks } from '../intelligence/riskEngine';
import { calculateDemandMetrics } from '../intelligence/demandIntelligence';
import { deriveInventoryStatus } from '../data/selectors';

export interface SimulationStepResult {
  simulatedTimestamp: string;
  inventory: InventoryItem[];
  inventoryLots: InventoryLot[];
  requests: BloodRequest[];
  forecasts: ComponentForecast[];
  risks: RiskItem[];
  transfers: TransferRecord[];
  auditEvents: AuditEvent[];
}

/**
 * Adds hours to ISO timestamp preserving IST +05:30 representation.
 */
export function addHoursToTimestamp(isoString: string, hours: number): string {
  const date = new Date(isoString);
  const newDate = new Date(date.getTime() + hours * 60 * 60 * 1000);
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(newDate.getTime() + istOffsetMs);
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const h = String(istDate.getUTCHours()).padStart(2, '0');
  const m = String(istDate.getUTCMinutes()).padStart(2, '0');
  const s = String(istDate.getUTCSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${h}:${m}:${s}+05:30`;
}

/**
 * Advances the deterministic simulation clock by specified hours.
 * Consumes inventory based on hourly burn rate, progresses transfers, ages batch lots,
 * and triggers live dynamic risk/forecast recalculation.
 */
export function advanceSimulationState(
  currentTimestamp: string,
  hoursToAdvance: number,
  inventory: InventoryItem[],
  inventoryLots: InventoryLot[],
  requests: BloodRequest[],
  demandHistory: DemandDataPoint[],
  forecasts: ComponentForecast[],
  transfers: TransferRecord[],
  auditEvents: AuditEvent[],
  scenario: ScenarioId,
  _network: Network
): SimulationStepResult {
  const newTimestamp = addHoursToTimestamp(currentTimestamp, hoursToAdvance);

  // 1. Consume inventory over elapsed hours
  const updatedInventory = inventory.map((item) => {
    const demandMetrics = calculateDemandMetrics(
      item.hospitalId,
      item.bloodGroup,
      item.component,
      demandHistory,
      requests,
      scenario
    );

    const hourlyBurn = demandMetrics.baselineHourlyDemand * demandMetrics.surgeMultiplier;
    const unitsConsumed = Math.min(
      item.availableUnits,
      Math.round(hourlyBurn * (hoursToAdvance / 24) * 8)
    );

    const newTotal = Math.max(item.reservedUnits, item.totalUnits - unitsConsumed);
    const newAvailable = Math.max(0, newTotal - item.reservedUnits - item.inTransitUnits);
    const newStatus = deriveInventoryStatus(
      newTotal,
      item.reservedUnits,
      item.inTransitUnits,
      item.minimumThreshold,
      item.criticalThreshold
    );

    return {
      ...item,
      totalUnits: newTotal,
      availableUnits: newAvailable,
      status: newStatus,
      lastUpdated: newTimestamp,
    };
  });

  // 2. Age inventory lots
  const updatedLots = inventoryLots.map((lot) => {
    const expiryDate = new Date(lot.expiryDate);
    const simDate = new Date(newTimestamp);
    const hoursRemaining = (expiryDate.getTime() - simDate.getTime()) / (1000 * 60 * 60);

    let storageStatus = lot.storageStatus;
    if (hoursRemaining <= 0) {
      storageStatus = 'EXPIRED';
    } else if (hoursRemaining <= 48) {
      storageStatus = 'EXPIRING_SOON';
    }

    return {
      ...lot,
      storageStatus,
    };
  });

  // 3. Recalculate operational risks dynamically
  const updatedRisks = evaluateOperationalRisks(
    updatedInventory,
    updatedLots,
    requests,
    demandHistory,
    scenario,
    newTimestamp
  );

  // 4. Recalculate component forecasts dynamically
  const updatedForecasts = forecasts.map((fc) => {
    const matchingInv = updatedInventory.find(
      (inv) =>
        inv.hospitalId === fc.hospitalId &&
        inv.bloodGroup === fc.bloodGroup &&
        inv.component === fc.component
    );

    const metrics = calculateDemandMetrics(
      fc.hospitalId,
      fc.bloodGroup,
      fc.component,
      demandHistory,
      requests,
      scenario
    );

    const currentStock = matchingInv ? matchingInv.totalUnits : fc.currentStock;
    const currentAvailable = matchingInv ? matchingInv.availableUnits : fc.currentAvailable;
    const hourlyRate = metrics.baselineHourlyDemand * metrics.surgeMultiplier;
    const hoursUntilDepletion = currentAvailable <= 0 ? 0 : Number((currentAvailable / Math.max(0.1, hourlyRate)).toFixed(1));

    return {
      ...fc,
      currentStock,
      currentAvailable,
      projected24hDemand: metrics.projected24hDemand,
      projected48hDemand: metrics.projected48hDemand,
      hoursUntilDepletion: hoursUntilDepletion > 48 ? null : hoursUntilDepletion,
    };
  });

  // 5. Append audit logs
  const auditCode = `AUD-${Date.now().toString().slice(-6)}`;
  const timeAdvanceAudit: AuditEvent = {
    id: `AUD-${Date.now()}-ADV`,
    auditCode,
    timestamp: newTimestamp,
    actorType: 'SYSTEM',
    actorId: 'SIMULATION_CLOCK_CONTROLLER',
    action: 'SIMULATION_TIME_ADVANCED',
    entityType: 'SIMULATION',
    entityId: `T+${hoursToAdvance}h`,
    previousState: currentTimestamp,
    newState: newTimestamp,
    summary: `Simulation clock advanced by +${hoursToAdvance} hour(s). State recalculated across inventory, demand burn, and dynamic risk engine.`,
    reason: 'Operator simulation time step execution.',
    isSynthetic: true,
  };

  return {
    simulatedTimestamp: newTimestamp,
    inventory: updatedInventory,
    inventoryLots: updatedLots,
    requests,
    forecasts: updatedForecasts,
    risks: updatedRisks,
    transfers,
    auditEvents: [timeAdvanceAudit, ...auditEvents],
  };
}
