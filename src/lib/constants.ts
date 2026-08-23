import { BloodComponent, BloodGroup } from '../types';

export const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const BLOOD_COMPONENTS: BloodComponent[] = ['PRBC', 'FFP', 'Platelets', 'Cryoprecipitate'];

export const COMPONENT_LABELS: Record<BloodComponent, string> = {
  PRBC: 'Packed Red Blood Cells (PRBC)',
  FFP: 'Fresh Frozen Plasma (FFP)',
  Platelets: 'Platelet Concentrate',
  Cryoprecipitate: 'Cryoprecipitate',
};

export const COMPONENT_STORAGE_INFO: Record<BloodComponent, string> = {
  PRBC: '2°C to 6°C • Shelf life 35–42 days',
  FFP: '-18°C or below • Shelf life 1 year',
  Platelets: '20°C to 24°C with agitation • Shelf life 5 days',
  Cryoprecipitate: '-18°C or below • Shelf life 1 year',
};

export const SCENARIOS = [
  {
    id: 'normal',
    name: 'Normal Operations',
    description: 'Baseline distribution across Kolkata regional nodes. Stable inventory levels.',
  },
  {
    id: 'emergency_surge',
    name: 'Emergency Demand Spike (Hero Scenario)',
    description: 'Sudden emergency trauma influx at CCGH (Hosp A) leads to critical O- PRBC shortage risk.',
  },
  {
    id: 'supply_disruption',
    name: 'Supply Chain Disruption',
    description: 'Delayed voluntary blood donation camp processing creates network-wide platelet deficits.',
  },
  {
    id: 'expiry_cluster',
    name: 'Cluster Expiration Warning',
    description: '14 units of B+ PRBC nearing 48h expiration at MMC (Hosp B) requiring redistribution.',
  },
] as const;
