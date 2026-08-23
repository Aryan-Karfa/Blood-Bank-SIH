import { HospitalId } from './hospital';
import { BloodComponent, BloodGroup } from './inventory';

export type LotStorageStatus = 'OK' | 'EXPIRING_SOON' | 'EXPIRED';
export type LotTemperatureStatus = 'COMPLIANT' | 'WARNING';

export interface InventoryLot {
  id: string;
  inventoryItemId: string;
  hospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  lotNumber: string;
  units: number;
  collectionDate: string;
  expiryDate: string;
  storageStatus: LotStorageStatus;
  temperatureStatus: LotTemperatureStatus;
  storageLocation: string;
  isSynthetic: true;
}
