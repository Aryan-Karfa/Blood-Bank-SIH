import { HospitalId } from './hospital';
import { BloodGroup, BloodComponent } from './inventory';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | 'NORMAL';

export type RiskType =
  | 'SHORTAGE'
  | 'EXPIRY'
  | 'DEMAND_SURGE'
  | 'SUPPLY_DISRUPTION'
  | 'ALLOCATION_PRESSURE';

export type RiskStatus = 'ACTIVE' | 'MITIGATING' | 'RESOLVED';

export interface RiskItem {
  id: string;
  riskCode: string;
  hospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  level: RiskLevel;
  type: RiskType;
  title: string;
  description: string;
  detectedAt: string;
  projectedAt: string;
  timeToImpact: string; // e.g. "18 hours"
  hoursToImpact: number;
  currentStock: number;
  currentAvailable: number;
  projectedDemand: number;
  projectedDeficit: number;
  rootCause: string;
  affectedRequests: string[]; // e.g. ["REQ-SYN-001"]
  recommendedAction: string;
  networkAlternativeAvailable: boolean;
  alternativeSourceHospitalId?: HospitalId;
  potentialUnitsAvailable?: number;
  status: RiskStatus;
  isSynthetic: true;
}
