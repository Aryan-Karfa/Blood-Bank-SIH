import { Recommendation } from '../types';

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'REC-01',
    recommendationCode: 'REC-SYN-001',
    riskId: 'RSK-01',
    sourceHospitalId: 'HOSP-B',
    destinationHospitalId: 'HOSP-A',
    bloodGroup: 'O-',
    component: 'PRBC',
    recommendedUnits: 20,
    reason:
      'Rebalance regional O- PRBC inventory from surplus facility (MMC) to prevent zero-stockout event at apex trauma facility (CCGH).',
    rationalePoints: [
      'HOSP-A is projected to deplete all unreserved O- PRBC units within 18 hours under trauma influx.',
      'HOSP-B currently maintains 38 units (230% of minimum threshold), providing ample surplus capacity.',
      'Inter-facility transit corridor (12.4 km) estimated at 35 minutes with verified IoT cold-chain telemetry.',
      '4 units from near-expiry lot LOT-SYN-201 will be prioritized for immediate utilization, preventing wastage.',
      'Post-transfer stock at HOSP-A increases to 24 units, successfully reducing risk index from CRITICAL to NORMAL.',
    ],
    expectedImpact:
      'Eliminates stockout threat at HOSP-A while preserving 18 units (120% buffer) at HOSP-B.',
    confidence: 'HIGH',
    createdAt: '2026-08-23T09:25:00+05:30',
    status: 'PENDING_REVIEW',
    beforeRiskLevel: 'CRITICAL',
    afterRiskLevel: 'NORMAL',
    transitTimeMinutes: 35,
    isSynthetic: true,
  },
  {
    id: 'REC-02',
    recommendationCode: 'REC-SYN-002',
    riskId: 'RSK-03',
    sourceHospitalId: 'HOSP-B',
    destinationHospitalId: 'HOSP-A',
    bloodGroup: 'A+',
    component: 'Platelets',
    recommendedUnits: 4,
    reason:
      'Proactive redistribution of Platelet Concentrate to support multi-ward surgical and oncology transfusion requirements.',
    rationalePoints: [
      'HOSP-A projected platelet safety margin compresses to 1 unit by T+24 hours.',
      'HOSP-B maintains 12 units of compatible Platelet Concentrate.',
      'Transit within temperature-controlled agitation box prevents coagulation degradation.',
      'Maintains minimum 8-unit safety floor at source node HOSP-B.',
      'Stabilizes emergency oncology transfusion coverage for next 48 hours.',
    ],
    expectedImpact:
      'Reduces HOSP-A platelet deficit risk from HIGH to NORMAL.',
    confidence: 'MEDIUM',
    createdAt: '2026-08-23T09:30:00+05:30',
    status: 'PENDING_REVIEW',
    beforeRiskLevel: 'HIGH',
    afterRiskLevel: 'NORMAL',
    transitTimeMinutes: 35,
    isSynthetic: true,
  },
];
