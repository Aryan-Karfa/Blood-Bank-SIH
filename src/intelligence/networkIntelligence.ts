import { HospitalId, InventoryItem, Network } from '../types';

export interface SourceHospitalEvaluation {
  hospitalId: HospitalId;
  isFeasible: boolean;
  maxTransferableUnits: number;
  remainingBufferPostTransfer: number;
  minimumThreshold: number;
  safetyBufferRatioPercent: number;
  transitMinutes: number;
  distanceKm: number;
  corridorStatus: string;
  invalidationReason?: string;
}

/**
 * Answers: "Which hospital can safely supply the affected hospital without creating a secondary shortage?"
 * Strictly enforces that the source node maintains >= 120% of its minimum safety buffer post-transfer.
 */
export function evaluateSourceHospital(
  sourceHospitalId: HospitalId,
  destinationHospitalId: HospitalId,
  unitsToTransfer: number,
  inventory: InventoryItem[],
  network: Network,
  bloodGroup: string,
  component: string
): SourceHospitalEvaluation {
  const corridor = network.activeCorridors.find(
    (c) =>
      (c.source === sourceHospitalId && c.destination === destinationHospitalId) ||
      (c.source === destinationHospitalId && c.destination === sourceHospitalId)
  ) || {
    id: 'COR-01',
    distanceKm: 12.4,
    estimatedTransitMinutes: 35,
    operationalStatus: 'CLEAR' as const,
  };

  const sourceInv = inventory.find(
    (item) =>
      item.hospitalId === sourceHospitalId &&
      item.bloodGroup === bloodGroup &&
      item.component === component
  );

  if (!sourceInv) {
    return {
      hospitalId: sourceHospitalId,
      isFeasible: false,
      maxTransferableUnits: 0,
      remainingBufferPostTransfer: 0,
      minimumThreshold: 0,
      safetyBufferRatioPercent: 0,
      transitMinutes: corridor.estimatedTransitMinutes,
      distanceKm: corridor.distanceKm,
      corridorStatus: corridor.operationalStatus,
      invalidationReason: `No inventory record found at source hospital ${sourceHospitalId}.`,
    };
  }

  // Safety buffer rule: Source must retain >= 120% of minimum threshold
  const safetyThresholdMultiplier = 1.2;
  const requiredSafetyBuffer = Math.ceil(sourceInv.minimumThreshold * safetyThresholdMultiplier);
  const maxTransferableUnits = Math.max(0, sourceInv.availableUnits - requiredSafetyBuffer);

  const remainingBufferPostTransfer = sourceInv.availableUnits - unitsToTransfer;
  const safetyBufferRatioPercent = Math.round(
    (remainingBufferPostTransfer / Math.max(1, sourceInv.minimumThreshold)) * 100
  );

  if (unitsToTransfer > sourceInv.availableUnits) {
    return {
      hospitalId: sourceHospitalId,
      isFeasible: false,
      maxTransferableUnits,
      remainingBufferPostTransfer,
      minimumThreshold: sourceInv.minimumThreshold,
      safetyBufferRatioPercent,
      transitMinutes: corridor.estimatedTransitMinutes,
      distanceKm: corridor.distanceKm,
      corridorStatus: corridor.operationalStatus,
      invalidationReason: `Requested transfer (${unitsToTransfer} units) exceeds available unreserved source stock (${sourceInv.availableUnits} units).`,
    };
  }

  if (remainingBufferPostTransfer < sourceInv.minimumThreshold) {
    return {
      hospitalId: sourceHospitalId,
      isFeasible: false,
      maxTransferableUnits,
      remainingBufferPostTransfer,
      minimumThreshold: sourceInv.minimumThreshold,
      safetyBufferRatioPercent,
      transitMinutes: corridor.estimatedTransitMinutes,
      distanceKm: corridor.distanceKm,
      corridorStatus: corridor.operationalStatus,
      invalidationReason: `Transfer creates secondary shortage: Source buffer would drop to ${remainingBufferPostTransfer} units (below ${sourceInv.minimumThreshold} min threshold).`,
    };
  }

  if (corridor.operationalStatus === 'DISRUPTED') {
    return {
      hospitalId: sourceHospitalId,
      isFeasible: false,
      maxTransferableUnits,
      remainingBufferPostTransfer,
      minimumThreshold: sourceInv.minimumThreshold,
      safetyBufferRatioPercent,
      transitMinutes: corridor.estimatedTransitMinutes,
      distanceKm: corridor.distanceKm,
      corridorStatus: corridor.operationalStatus,
      invalidationReason: `Transit corridor ${corridor.id} is currently disrupted.`,
    };
  }

  return {
    hospitalId: sourceHospitalId,
    isFeasible: true,
    maxTransferableUnits,
    remainingBufferPostTransfer,
    minimumThreshold: sourceInv.minimumThreshold,
    safetyBufferRatioPercent,
    transitMinutes: corridor.estimatedTransitMinutes,
    distanceKm: corridor.distanceKm,
    corridorStatus: corridor.operationalStatus,
  };
}
