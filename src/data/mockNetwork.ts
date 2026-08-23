import { Network } from '../types';

export const MOCK_NETWORK: Network = {
  id: 'NET-KOL-01',
  name: 'Kolkata Regional Blood Network',
  region: 'Kolkata Metropolitan Area, West Bengal',
  hospitalIds: ['HOSP-A', 'HOSP-B'],
  activeCorridors: [
    {
      id: 'COR-01',
      source: 'HOSP-B',
      destination: 'HOSP-A',
      distanceKm: 12.4,
      estimatedTransitMinutes: 35,
      operationalStatus: 'CLEAR',
      coldChainRequired: true,
      transitRouteDescription: 'College Street to EM Bypass Connector via AJC Bose Flyover',
    },
  ],
  networkStatus: 'WATCH',
  lastUpdated: '2026-08-23T10:00:00+05:30',
  isSynthetic: true,
};
