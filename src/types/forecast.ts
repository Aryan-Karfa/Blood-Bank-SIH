import { HospitalId } from './hospital';
import { BloodGroup, BloodComponent } from './inventory';

export type ForecastConfidence = 'HIGH' | 'MEDIUM' | 'LOW';
export type ForecastPointStatus = 'ADEQUATE' | 'WATCH' | 'DEFICIT';

export interface ForecastPoint {
  hourOffset: number; // e.g. +4, +8, +12, +18, +24, +36, +48
  timestamp: string;
  projectedDemandUnits: number;
  projectedStockUnits: number;
  projectedAvailableUnits: number;
  safetyThreshold: number;
  criticalThreshold: number;
  isShortageRisk: boolean;
  confidence: ForecastConfidence;
  status: ForecastPointStatus;
  isSynthetic: true;
}

export interface ComponentForecast {
  id: string;
  hospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  currentStock: number;
  currentAvailable: number;
  projected24hDemand: number;
  projected48hDemand: number;
  hoursUntilDepletion: number | null; // null if stable
  overallConfidence: ForecastConfidence;
  trajectory: ForecastPoint[];
  isSynthetic: true;
}
