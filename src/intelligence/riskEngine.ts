import {
  InventoryItem,
  InventoryLot,
  BloodRequest,
  DemandDataPoint,
  RiskItem,
  RiskLevel,
  RiskType,
  ScenarioId,
} from '../types';
import { calculateDemandMetrics } from './demandIntelligence';

/**
 * Dynamic Risk Engine: Evaluates operational state and derives active risks & dynamic severity.
 * Replaces static mock risks with live state-driven risk detection.
 */
export function evaluateOperationalRisks(
  inventory: InventoryItem[],
  inventoryLots: InventoryLot[],
  requests: BloodRequest[],
  demandHistory: DemandDataPoint[],
  scenario: ScenarioId,
  simulatedTime: string
): RiskItem[] {
  const risks: RiskItem[] = [];

  // Group inventory by Hospital and Component
  for (const inv of inventory) {
    const demandMetrics = calculateDemandMetrics(
      inv.hospitalId,
      inv.bloodGroup,
      inv.component,
      demandHistory,
      requests,
      scenario
    );

    const relevantLots = inventoryLots.filter((lot) => lot.inventoryItemId === inv.id);
    const nearExpiryLots = relevantLots.filter((lot) => lot.storageStatus === 'EXPIRING_SOON');
    const nearExpiryUnitsCount = nearExpiryLots.reduce((sum, lot) => sum + lot.units, 0);

    const activeReqsForComp = requests.filter(
      (r) =>
        r.hospitalId === inv.hospitalId &&
        r.bloodGroup === inv.bloodGroup &&
        r.component === inv.component &&
        r.status !== 'FULFILLED' &&
        r.status !== 'CANCELLED'
    );

    const hasEmergencyRequest = activeReqsForComp.some((r) => r.urgency === 'EMERGENCY');
    const unallocatedRequestUnits = activeReqsForComp.reduce(
      (sum, r) => sum + (r.unitsRequested - r.unitsAllocated),
      0
    );

    // Calculate hours to depletion
    const hourlyBurnRate = Math.max(0.2, demandMetrics.projected24hDemand / 24);
    const hoursToDepletion = Math.max(
      0,
      Number((inv.availableUnits / hourlyBurnRate).toFixed(1))
    );
    const projectedDeficit = Math.max(
      0,
      demandMetrics.projected24hDemand - inv.availableUnits
    );

    // Identify potential network alternative source
    const alternativeSource = inventory.find(
      (other) =>
        other.hospitalId !== inv.hospitalId &&
        other.bloodGroup === inv.bloodGroup &&
        other.component === inv.component &&
        other.availableUnits > other.minimumThreshold
    );

    // ==========================================
    // 1. SHORTAGE & DEMAND SURGE RISK EVALUATION
    // ==========================================
    let shortageLevel: RiskLevel | null = null;
    let shortageType: RiskType = 'SHORTAGE';

    if (
      inv.availableUnits <= inv.criticalThreshold ||
      hoursToDepletion <= 18 ||
      (inv.availableUnits <= 2 && hasEmergencyRequest)
    ) {
      shortageLevel = 'CRITICAL';
      shortageType = demandMetrics.surgeMultiplier > 1.8 ? 'DEMAND_SURGE' : 'SHORTAGE';
    } else if (
      inv.availableUnits < inv.minimumThreshold ||
      hoursToDepletion <= 28 ||
      unallocatedRequestUnits >= 3
    ) {
      shortageLevel = 'HIGH';
      shortageType = demandMetrics.surgeMultiplier > 1.4 ? 'DEMAND_SURGE' : 'SHORTAGE';
    } else if (
      inv.availableUnits <= inv.minimumThreshold + 2 ||
      hoursToDepletion <= 40
    ) {
      shortageLevel = 'MODERATE';
    }

    if (shortageLevel) {
      const riskCode = `RSK-${inv.hospitalId}-${inv.bloodGroup.replace(/[^a-zA-Z0-9]/g, '')}-${inv.component}-01`;
      const timeToImpactStr = `${hoursToDepletion} hours`;

      const title =
        shortageLevel === 'CRITICAL'
          ? `Critical ${inv.bloodGroup} ${inv.component} Depletion Threat (<18h)`
          : shortageLevel === 'HIGH'
          ? `Elevated Shortage Warning for ${inv.bloodGroup} ${inv.component}`
          : `Buffer Compression Watch on ${inv.bloodGroup} ${inv.component}`;

      const rootCause = hasEmergencyRequest
        ? `Emergency Red-Zone trauma influx at ${inv.hospitalId} with unreserved stock down to ${inv.availableUnits} units.`
        : `Projected 24h demand (${demandMetrics.projected24hDemand} units) exceeds available buffer (${inv.availableUnits} units).`;

      risks.push({
        id: `RSK-${inv.id}`,
        riskCode,
        hospitalId: inv.hospitalId,
        bloodGroup: inv.bloodGroup,
        component: inv.component,
        level: shortageLevel,
        type: shortageType,
        title,
        description: `Available unreserved stock (${inv.availableUnits} units) projected to deplete in ${timeToImpactStr} under current clinical consumption rate.`,
        detectedAt: simulatedTime,
        projectedAt: simulatedTime,
        timeToImpact: timeToImpactStr,
        hoursToImpact: hoursToDepletion,
        currentStock: inv.totalUnits,
        currentAvailable: inv.availableUnits,
        projectedDemand: demandMetrics.projected24hDemand,
        projectedDeficit,
        rootCause,
        affectedRequests: activeReqsForComp.map((r) => r.requestId),
        recommendedAction: alternativeSource
          ? `Inter-facility transfer of ${Math.min(projectedDeficit + 4, alternativeSource.availableUnits - alternativeSource.minimumThreshold)} units from ${alternativeSource.hospitalId}.`
          : `Local reservation reallocation or targeted voluntary donor call.`,
        networkAlternativeAvailable: !!alternativeSource,
        alternativeSourceHospitalId: alternativeSource?.hospitalId,
        potentialUnitsAvailable: alternativeSource ? alternativeSource.availableUnits : 0,
        status: 'ACTIVE',
        isSynthetic: true,
      });
    }

    // ==========================================
    // 2. EXPIRY CLUSTER RISK EVALUATION
    // ==========================================
    if (nearExpiryUnitsCount >= 3 || (scenario === 'expiry_cluster' && inv.nearExpiryUnits > 0)) {
      const expiryRiskCode = `RSK-${inv.hospitalId}-${inv.bloodGroup.replace(/[^a-zA-Z0-9]/g, '')}-EXP-02`;
      risks.push({
        id: `RSK-EXP-${inv.id}`,
        riskCode: expiryRiskCode,
        hospitalId: inv.hospitalId,
        bloodGroup: inv.bloodGroup,
        component: inv.component,
        level: nearExpiryUnitsCount >= 4 ? 'HIGH' : 'MODERATE',
        type: 'EXPIRY',
        title: `Near-Expiry Batch Lot Cluster (${nearExpiryUnitsCount} Units ${inv.bloodGroup} ${inv.component})`,
        description: `${nearExpiryUnitsCount} units in shelf-life expiration window (<48h) exceed internal hospital consumption velocity.`,
        detectedAt: simulatedTime,
        projectedAt: simulatedTime,
        timeToImpact: '48 hours',
        hoursToImpact: 48,
        currentStock: inv.totalUnits,
        currentAvailable: inv.availableUnits,
        projectedDemand: demandMetrics.projected24hDemand,
        projectedDeficit: 0,
        rootCause: `Batch age distribution exceeds internal 48h utilization rate at ${inv.hospitalId}.`,
        affectedRequests: [],
        recommendedAction: `Prioritize FEFO dispatch and inter-facility redistribution to high-consumption center.`,
        networkAlternativeAvailable: true,
        alternativeSourceHospitalId: inv.hospitalId === 'HOSP-A' ? 'HOSP-B' : 'HOSP-A',
        potentialUnitsAvailable: nearExpiryUnitsCount,
        status: 'ACTIVE',
        isSynthetic: true,
      });
    }
  }

  return risks;
}
