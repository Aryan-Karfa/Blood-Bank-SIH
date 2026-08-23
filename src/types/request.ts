import { HospitalId } from './hospital';
import { BloodGroup, BloodComponent } from './inventory';

export type RequestUrgency = 'EMERGENCY' | 'URGENT' | 'ROUTINE';

export type RequestStatus =
  | 'PENDING'
  | 'PARTIALLY_ALLOCATED'
  | 'ALLOCATED'
  | 'IN_TRANSIT'
  | 'FULFILLED'
  | 'CANCELLED';

export interface BloodRequest {
  id: string;
  requestId: string;
  patientRef: string; // e.g. PAT-SYN-001
  hospitalId: HospitalId;
  requestingDepartment: string;
  clinicalIndication: string;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  unitsRequested: number;
  unitsAllocated: number;
  urgency: RequestUrgency;
  status: RequestStatus;
  requestedAt: string;
  requiredBy: string;
  requestingPhysicianId: string;
  notes?: string;
  isSynthetic: true;
}
