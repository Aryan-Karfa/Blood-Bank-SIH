import { HospitalId } from './hospital';
import { BloodComponent, BloodGroup } from './inventory';

export interface DemandDataPoint {
  id: string;
  hospitalId: HospitalId;
  date: string;
  hour: number; // 0 to 23
  bloodGroup: BloodGroup;
  component: BloodComponent;
  unitsRequested: number;
  unitsFulfilled: number;
  isSynthetic: true;
}
