import { Hospital } from '../types';

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'HOSP-A',
    code: 'CCGH',
    name: 'Central City General Hospital',
    shortName: 'CCGH',
    type: 'Government General Hospital',
    category: 'Apex Trauma',
    role: 'Primary receiving / high-demand facility',
    location: {
      city: 'Kolkata',
      state: 'West Bengal',
      latitude: 22.5726,
      longitude: 88.3639,
      address: 'Medical College Enclave, College Street, Central Kolkata 700073',
    },
    status: 'ELEVATED_DEMAND',
    bedCapacity: 1250,
    occupiedBeds: 1140, // 91.2% occupancy
    contact: {
      bloodBankInCharge: 'Dr. Arindam Sen, MD (Transfusion Med)',
      phone: '+91 33 2255 1001',
      emergencyDesk: 'Ext. 404 / 405 (24x7 Control)',
      email: 'bloodbank.ccgh@wbhealth.gov.in',
    },
    transitDistanceKmToB: 12.4,
    transitTimeMinToB: 35,
    isSynthetic: true,
    lastUpdated: '2026-08-23T10:00:00+05:30',
  },
  {
    id: 'HOSP-B',
    code: 'MMC',
    name: 'Metropolitan Medical Centre',
    shortName: 'MMC',
    type: 'Multi-Specialty Hospital',
    category: 'Multi-Specialty Private',
    role: 'Secondary / balancing facility',
    location: {
      city: 'Kolkata',
      state: 'West Bengal',
      latitude: 22.5186,
      longitude: 88.3883,
      address: 'EM Bypass Connector, Sector IV, East Kolkata 700107',
    },
    status: 'OPERATIONAL',
    bedCapacity: 850,
    occupiedBeds: 620, // 72.9% occupancy
    contact: {
      bloodBankInCharge: 'Dr. Sunita Banerjee, MD (Pathology)',
      phone: '+91 33 4011 8800',
      emergencyDesk: 'Ext. 112 (Transfusion Desk)',
      email: 'transfusion.desk@mmckolkata.org',
    },
    transitDistanceKmToB: 12.4,
    transitTimeMinToB: 35,
    isSynthetic: true,
    lastUpdated: '2026-08-23T10:00:00+05:30',
  },
];
