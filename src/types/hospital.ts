export type HospitalId = 'HOSP-A' | 'HOSP-B';

export type HospitalStatusType = 'OPERATIONAL' | 'CONGESTED' | 'ELEVATED_DEMAND' | 'OFFLINE';

export interface HospitalLocation {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface HospitalContact {
  bloodBankInCharge: string;
  phone: string;
  emergencyDesk: string;
  email: string;
}

export interface HospitalInventorySummary {
  totalUnits: number;
  availableUnits: number;
  reservedUnits: number;
  criticalItemCount: number;
}

export interface Hospital {
  id: HospitalId;
  code: string;
  name: string;
  shortName: string;
  type: string;
  category: 'Government General' | 'Multi-Specialty Private' | 'Apex Trauma';
  role: 'Primary receiving / high-demand facility' | 'Secondary / balancing facility';
  location: HospitalLocation;
  status: HospitalStatusType;
  bedCapacity: number;
  occupiedBeds: number;
  contact: HospitalContact;
  transitDistanceKmToB?: number;
  transitTimeMinToB?: number;
  isSynthetic: true;
  lastUpdated: string;
}
