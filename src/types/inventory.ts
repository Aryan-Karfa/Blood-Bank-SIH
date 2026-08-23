import { HospitalId } from './hospital';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type BloodComponent = 'PRBC' | 'FFP' | 'Platelets' | 'Cryoprecipitate';

export type StockStatus = 'NORMAL' | 'WATCH' | 'LOW' | 'CRITICAL' | 'EXPIRING' | 'SURPLUS';

export interface InventoryItem {
  id: string;
  hospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  totalUnits: number;
  reservedUnits: number;
  inTransitUnits: number;
  availableUnits: number; // totalUnits - reservedUnits - inTransitUnits
  minimumThreshold: number;
  criticalThreshold: number;
  averageDailyDemand: number;
  status: StockStatus;
  nearExpiryUnits: number; // expiring within 48h
  expiryBreakdown: {
    within24h: number;
    within48h: number;
    within7days: number;
    beyond7days: number;
  };
  lastUpdated: string;
  isSynthetic: true;
}
