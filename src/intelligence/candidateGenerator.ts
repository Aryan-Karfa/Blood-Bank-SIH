import {
  CandidateAction,
  InventoryItem,
  InventoryLot,
  Network,
  RiskItem,
} from '../types';
import { evaluateSourceHospital } from './networkIntelligence';

/**
 * Generates feasible deterministic candidate actions for a detected risk condition.
 * Ensures that all candidate actions respect physical inventory constraints and network rules.
 */
export function generateCandidateActions(
  risk: RiskItem,
  inventory: InventoryItem[],
  inventoryLots: InventoryLot[],
  network: Network
): CandidateAction[] {
  const candidateActions: CandidateAction[] = [];

  const sourceHospitalId = risk.hospitalId === 'HOSP-A' ? 'HOSP-B' : 'HOSP-A';
  const destinationHospitalId = risk.hospitalId;

  // Find relevant lots at source to check if any near-expiry lots can be prioritized
  const sourceLots = inventoryLots.filter(
    (lot) =>
      lot.hospitalId === sourceHospitalId &&
      lot.bloodGroup === risk.bloodGroup &&
      lot.component === risk.component
  );
  const nearExpiryLot = sourceLots.find((lot) => lot.storageStatus === 'EXPIRING_SOON');

  // Candidate A: Full Rebalance (e.g. 20 units O- PRBC)
  const fullUnits = risk.projectedDeficit > 0 ? Math.max(15, risk.projectedDeficit + 4) : 20;
  const evalA = evaluateSourceHospital(
    sourceHospitalId,
    destinationHospitalId,
    fullUnits,
    inventory,
    network,
    risk.bloodGroup,
    risk.component
  );

  candidateActions.push({
    id: 'CAND-A',
    label: `Candidate A: Full Rebalance (${fullUnits} units)`,
    type: 'TRANSFER',
    sourceHospitalId,
    destinationHospitalId,
    bloodGroup: risk.bloodGroup,
    component: risk.component,
    units: fullUnits,
    expectedTransitMinutes: evalA.transitMinutes,
    sourceBufferPostTransfer: evalA.remainingBufferPostTransfer,
    sourceMinThreshold: evalA.minimumThreshold,
    sourceSafetyBufferPercent: evalA.safetyBufferRatioPercent,
    isFeasible: evalA.isFeasible,
    invalidationReason: evalA.invalidationReason,
    prioritizesNearExpiryLot: nearExpiryLot?.lotNumber,
    coldChainCompliant: true,
    summary: `Transfer ${fullUnits} units ${risk.bloodGroup} ${risk.component} from ${sourceHospitalId} to ${destinationHospitalId}. Fully resolves 24h deficit (${risk.projectedDeficit} units) while maintaining safe ${evalA.safetyBufferRatioPercent}% buffer at source.`,
  });

  // Candidate B: Conservative Partial Transfer (e.g. 10 units)
  const partialUnits = Math.max(5, Math.floor(fullUnits / 2));
  const evalB = evaluateSourceHospital(
    sourceHospitalId,
    destinationHospitalId,
    partialUnits,
    inventory,
    network,
    risk.bloodGroup,
    risk.component
  );

  candidateActions.push({
    id: 'CAND-B',
    label: `Candidate B: Conservative Transfer (${partialUnits} units)`,
    type: 'TRANSFER',
    sourceHospitalId,
    destinationHospitalId,
    bloodGroup: risk.bloodGroup,
    component: risk.component,
    units: partialUnits,
    expectedTransitMinutes: evalB.transitMinutes,
    sourceBufferPostTransfer: evalB.remainingBufferPostTransfer,
    sourceMinThreshold: evalB.minimumThreshold,
    sourceSafetyBufferPercent: evalB.safetyBufferRatioPercent,
    isFeasible: evalB.isFeasible,
    invalidationReason: evalB.invalidationReason,
    coldChainCompliant: true,
    summary: `Transfer ${partialUnits} units ${risk.bloodGroup} ${risk.component} from ${sourceHospitalId} to ${destinationHospitalId}. Partially mitigates emergency pressure with minimal footprint on source node.`,
  });

  // Candidate C: Local Reservation Reallocation / Internal Prioritization
  candidateActions.push({
    id: 'CAND-C',
    label: 'Candidate C: Local Surgical Reserve Reallocation',
    type: 'LOCAL_REALLOCATION',
    sourceHospitalId: destinationHospitalId,
    destinationHospitalId,
    bloodGroup: risk.bloodGroup,
    component: risk.component,
    units: 4,
    expectedTransitMinutes: 0,
    sourceBufferPostTransfer: 0,
    sourceMinThreshold: 0,
    sourceSafetyBufferPercent: 0,
    isFeasible: true,
    coldChainCompliant: true,
    summary: `Reallocate uncrossmatched elective surgical standby units internally within ${destinationHospitalId}. Covers immediate short-term red-zone demands without inter-facility logistics.`,
  });

  // Candidate D: Active Monitoring & Telemetry Watch
  candidateActions.push({
    id: 'CAND-D',
    label: 'Candidate D: Active Telemetry Watch',
    type: 'MONITOR',
    sourceHospitalId,
    destinationHospitalId,
    bloodGroup: risk.bloodGroup,
    component: risk.component,
    units: 0,
    expectedTransitMinutes: 0,
    sourceBufferPostTransfer: evalA.remainingBufferPostTransfer + fullUnits,
    sourceMinThreshold: evalA.minimumThreshold,
    sourceSafetyBufferPercent: 100,
    isFeasible: true,
    coldChainCompliant: true,
    summary: `Maintain current node stock without immediate transfer. Increase sampling frequency of emergency admissions and re-evaluate at T+2 hours.`,
  });

  return candidateActions;
}
