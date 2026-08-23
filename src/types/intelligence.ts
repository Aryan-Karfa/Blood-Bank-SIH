import { HospitalId } from './hospital';
import { BloodComponent, BloodGroup } from './inventory';
import { RiskLevel, RiskType } from './risk';

export type ScenarioId = 'normal' | 'emergency_surge' | 'supply_disruption' | 'expiry_cluster';

export type CandidateActionType = 'TRANSFER' | 'LOCAL_REALLOCATION' | 'MONITOR';

export interface CandidateAction {
  id: string; // e.g. 'CAND-A', 'CAND-B'
  label: string; // e.g. 'Candidate A (Full Rebalance)'
  type: CandidateActionType;
  sourceHospitalId: HospitalId;
  destinationHospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  units: number;
  expectedTransitMinutes: number;
  sourceBufferPostTransfer: number; // units remaining at source post-transfer
  sourceMinThreshold: number;
  sourceSafetyBufferPercent: number; // (sourceBufferPostTransfer / sourceMinThreshold) * 100
  isFeasible: boolean;
  invalidationReason?: string;
  prioritizesNearExpiryLot?: string;
  coldChainCompliant: boolean;
  summary: string;
}

export interface DemandMetrics {
  hospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  baselineHourlyDemand: number;
  recentTrend: 'ACCELERATING' | 'STABLE' | 'DECELERATING';
  hourlyPattern: number[]; // 24 values
  surgeMultiplier: number; // 1.0 to 3.0
  accelerationFactor: number;
  pendingRequestPressureUnits: number;
  projected24hDemand: number;
  projected48hDemand: number;
}

export interface CompactHospitalContext {
  id: HospitalId;
  name: string;
  role: string;
  bedOccupancyPercent: number;
  status: string;
}

export interface CompactInventoryContext {
  hospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  totalUnits: number;
  availableUnits: number;
  reservedUnits: number;
  inTransitUnits: number;
  minimumThreshold: number;
  criticalThreshold: number;
  status: string;
  nearExpiryUnits: number;
}

export interface CompactRequestContext {
  requestId: string;
  hospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  unitsRequested: number;
  unitsAllocated: number;
  urgency: string;
  department: string;
}

export interface CompactRiskContext {
  id: string;
  riskCode: string;
  hospitalId: HospitalId;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  level: RiskLevel;
  type: RiskType;
  title: string;
  hoursToDepletion: number;
  projectedDeficit: number;
  rootCause: string;
}

export interface GeminiDecisionContext {
  scenario: ScenarioId;
  simulatedTime: string;
  risk: CompactRiskContext;
  relevantInventory: CompactInventoryContext[];
  relevantRequests: CompactRequestContext[];
  demandMetrics: DemandMetrics;
  candidateActions: CandidateAction[];
  networkCorridor: {
    corridorId: string;
    distanceKm: number;
    estimatedMinutes: number;
    status: string;
  };
  isSynthetic: true;
}

export interface ExplainabilityFivePoints {
  what: string; // 01 WHAT is being recommended
  why: string; // 02 WHY this candidate is preferable
  evidence: string[]; // 03 EVIDENCE from operational signals
  selection: string; // 04 SELECTION over alternatives
  consequences: string; // 05 CONSEQUENCES if action is executed
}

export interface GeminiRecommendationResponse {
  selectedCandidateId: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceScore: number; // 0.0 to 1.0 (deterministic mapping)
  rationale: ExplainabilityFivePoints;
  expectedImpact: string;
  uncertainties: string[];
  requiresHumanApproval: true;
  engine: 'GEMINI' | 'DETERMINISTIC_FALLBACK';
  modelIdentifier?: string;
  generatedAt: string;
  fingerprint: string;
}

export type AiEngineStatus =
  | 'GEMINI_LIVE'
  | 'GEMINI_ANALYZING'
  | 'GEMINI_UNAVAILABLE'
  | 'GEMINI_RATE_LIMITED'
  | 'GEMINI_TIMEOUT'
  | 'GEMINI_VALIDATION_FAILED'
  | 'DETERMINISTIC_FALLBACK';

export interface AiTelemetryStats {
  requestCount: number;
  fallbackCount: number;
  rateLimitCount: number;
  cacheHitCount: number;
  lastLatencyMs: number;
  avgLatencyMs: number;
  dailyBudgetLimit: number;
  dailyBudgetUsed: number;
  lastAnalysisTimestamp: string | null;
  lastEngineUsed: string;
}
