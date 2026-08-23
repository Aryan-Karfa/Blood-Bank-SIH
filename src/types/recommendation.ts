import { HospitalId } from './hospital';
import { BloodGroup, BloodComponent } from './inventory';
import { RiskLevel } from './risk';

export type RecommendationStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'EXECUTED';
export type RecommendationConfidence = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Recommendation {
  id: string;
  recommendationCode: string;
  riskId: string;
  sourceHospitalId: HospitalId;
  destinationHospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  recommendedUnits: number;
  reason: string;
  rationalePoints: string[]; // 5-point explainability
  expectedImpact: string;
  confidence: RecommendationConfidence;
  createdAt: string;
  status: RecommendationStatus;
  beforeRiskLevel: RiskLevel;
  afterRiskLevel: RiskLevel;
  transitTimeMinutes: number;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  isSynthetic: true;
}
