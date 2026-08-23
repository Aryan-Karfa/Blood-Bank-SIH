import {
  InventoryItem,
  BloodRequest,
  RiskItem,
  Recommendation,
  TransferRecord,
  Hospital,
  HospitalId,
  InventoryLot,
  StockStatus,
} from '../types';

export function deriveInventoryStatus(
  totalUnits: number,
  reservedUnits: number,
  inTransitUnits: number,
  minimumThreshold: number,
  criticalThreshold: number
): StockStatus {
  const available = totalUnits - reservedUnits - inTransitUnits;
  if (totalUnits <= criticalThreshold || available <= 1) {
    return 'CRITICAL';
  }
  if (available < minimumThreshold) {
    return 'LOW';
  }
  if (available <= minimumThreshold + 2) {
    return 'WATCH';
  }
  if (totalUnits >= minimumThreshold * 2) {
    return 'SURPLUS';
  }
  return 'NORMAL';
}

export function selectTotalNetworkUnits(inventory: InventoryItem[]): number {
  return inventory.reduce((sum, item) => sum + item.totalUnits, 0);
}

export function selectAvailableUnits(inventory: InventoryItem[]): number {
  return inventory.reduce((sum, item) => sum + item.availableUnits, 0);
}

export function selectReservedUnits(inventory: InventoryItem[]): number {
  return inventory.reduce((sum, item) => sum + item.reservedUnits, 0);
}

export function selectInTransitUnits(inventory: InventoryItem[]): number {
  return inventory.reduce((sum, item) => sum + item.inTransitUnits, 0);
}

export function selectCriticalRiskCount(risks: RiskItem[]): number {
  return risks.filter((r) => r.level === 'CRITICAL' && r.status === 'ACTIVE').length;
}

export function selectActiveRequestsCount(requests: BloodRequest[]): number {
  return requests.filter((req) => req.status !== 'FULFILLED' && req.status !== 'CANCELLED').length;
}

export function selectPendingRecommendationsCount(recommendations: Recommendation[]): number {
  return recommendations.filter((r) => r.status === 'PENDING_REVIEW').length;
}

export function selectActiveTransfersCount(transfers: TransferRecord[]): number {
  return transfers.filter((t) => t.status === 'IN_TRANSIT' || t.status === 'APPROVED' || t.status === 'DISPATCHED').length;
}

export function selectHospitalInventory(
  inventory: InventoryItem[],
  hospitalId: 'ALL' | HospitalId
): InventoryItem[] {
  if (hospitalId === 'ALL') return inventory;
  return inventory.filter((item) => item.hospitalId === hospitalId);
}

export function selectHospitalRequests(
  requests: BloodRequest[],
  hospitalId: 'ALL' | HospitalId
): BloodRequest[] {
  if (hospitalId === 'ALL') return requests;
  return requests.filter((req) => req.hospitalId === hospitalId);
}

export function selectHospitalRisks(
  risks: RiskItem[],
  hospitalId: 'ALL' | HospitalId
): RiskItem[] {
  if (hospitalId === 'ALL') return risks;
  return risks.filter((r) => r.hospitalId === hospitalId);
}

export function selectLotsForInventoryItem(
  lots: InventoryLot[],
  inventoryItemId: string
): InventoryLot[] {
  return lots.filter((lot) => lot.inventoryItemId === inventoryItemId);
}

export function selectHospitalBedOccupancy(hospital: Hospital): {
  total: number;
  occupied: number;
  ratePercent: number;
} {
  const rate = Math.round((hospital.occupiedBeds / hospital.bedCapacity) * 100);
  return {
    total: hospital.bedCapacity,
    occupied: hospital.occupiedBeds,
    ratePercent: rate,
  };
}
