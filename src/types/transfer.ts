import { HospitalId } from './hospital';
import { BloodGroup, BloodComponent } from './inventory';

export type TransferStatusType =
  | 'PROPOSED'
  | 'APPROVED'
  | 'DISPATCHED'
  | 'IN_TRANSIT'
  | 'RECEIVED'
  | 'CANCELLED';

export interface ColdChainLog {
  monitoredTempCelsius: number;
  minTempAllowed: number;
  maxTempAllowed: number;
  dataLoggerId: string;
  status: 'COMPLIANT' | 'WARNING' | 'BREACH';
  isSimulated: true;
}

export interface ChainOfCustody {
  dispatchOfficer: string;
  transitCourier: string;
  receivingOfficer?: string;
}

export interface TransferRecord {
  id: string;
  transferId: string;
  recommendationId?: string;
  sourceHospitalId: HospitalId;
  destinationHospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  units: number;
  status: TransferStatusType;
  requestedAt: string;
  approvedAt?: string;
  dispatchedAt?: string;
  eta: string;
  receivedAt?: string;
  coldChain: ColdChainLog;
  chainOfCustody: ChainOfCustody;
  reason: string;
  isSynthetic: true;
}
