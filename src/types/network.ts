import { HospitalId } from './hospital';

export type NetworkStatusType = 'OPERATIONAL' | 'WATCH' | 'DEGRADED' | 'CRITICAL';

export interface TransferCorridor {
  id: string;
  source: HospitalId;
  destination: HospitalId;
  distanceKm: number;
  estimatedTransitMinutes: number;
  operationalStatus: 'CLEAR' | 'CONGESTED' | 'DISRUPTED';
  coldChainRequired: boolean;
  transitRouteDescription: string;
}

export interface Network {
  id: string;
  name: string;
  region: string;
  hospitalIds: HospitalId[];
  activeCorridors: TransferCorridor[];
  networkStatus: NetworkStatusType;
  lastUpdated: string;
  isSynthetic: true;
}
