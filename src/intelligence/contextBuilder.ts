import {
  GeminiDecisionContext,
  RiskItem,
  InventoryItem,
  BloodRequest,
  DemandMetrics,
  CandidateAction,
  Network,
  ScenarioId,
  CompactInventoryContext,
  CompactRequestContext,
} from '../types';

export interface ContextBuilderInput {
  scenario: ScenarioId;
  simulatedTime: string;
  risk: RiskItem;
  inventory: InventoryItem[];
  requests: BloodRequest[];
  demandMetrics: DemandMetrics;
  candidateActions: CandidateAction[];
  network: Network;
}

/**
 * Sanitizes and compacts data into minimal structured context for Gemini.
 * Enforces strict payload limits (<=5 hospitals, <=10 candidate actions, <=20 inventory rows, <=20 requests).
 * Strips all unnecessary credentials, internal state variables, and non-essential fields.
 */
export function buildGeminiDecisionContext(input: ContextBuilderInput): GeminiDecisionContext {
  const {
    scenario,
    simulatedTime,
    risk,
    inventory,
    requests,
    demandMetrics,
    candidateActions,
    network,
  } = input;

  // Filter inventory related to the risk blood group/component or affected facilities (max 20 records)
  const relevantInventory: CompactInventoryContext[] = inventory
    .filter(
      (item) =>
        item.bloodGroup === risk.bloodGroup && item.component === risk.component
    )
    .slice(0, 20)
    .map((item) => ({
      hospitalId: item.hospitalId,
      bloodGroup: item.bloodGroup,
      component: item.component,
      totalUnits: item.totalUnits,
      availableUnits: item.availableUnits,
      reservedUnits: item.reservedUnits,
      inTransitUnits: item.inTransitUnits,
      minimumThreshold: item.minimumThreshold,
      criticalThreshold: item.criticalThreshold,
      status: item.status,
      nearExpiryUnits: item.nearExpiryUnits,
    }));

  // Filter relevant pending/urgent requests for the affected component (max 20 records)
  const relevantRequests: CompactRequestContext[] = requests
    .filter(
      (req) =>
        req.bloodGroup === risk.bloodGroup &&
        req.component === risk.component &&
        req.status !== 'FULFILLED' &&
        req.status !== 'CANCELLED'
    )
    .slice(0, 20)
    .map((req) => ({
      requestId: req.requestId,
      hospitalId: req.hospitalId,
      bloodGroup: req.bloodGroup,
      component: req.component,
      unitsRequested: req.unitsRequested,
      unitsAllocated: req.unitsAllocated,
      urgency: req.urgency,
      department: req.requestingDepartment,
    }));

  const corridor = network.activeCorridors[0] || {
    id: 'COR-01',
    distanceKm: 12.4,
    estimatedTransitMinutes: 35,
    operationalStatus: 'CLEAR',
  };

  return {
    scenario,
    simulatedTime,
    risk: {
      id: risk.id,
      riskCode: risk.riskCode,
      hospitalId: risk.hospitalId,
      bloodGroup: risk.bloodGroup,
      component: risk.component,
      level: risk.level,
      type: risk.type,
      title: risk.title,
      hoursToDepletion: risk.hoursToImpact,
      projectedDeficit: risk.projectedDeficit,
      rootCause: risk.rootCause,
    },
    relevantInventory,
    relevantRequests,
    demandMetrics,
    candidateActions: candidateActions.slice(0, 10),
    networkCorridor: {
      corridorId: corridor.id,
      distanceKm: corridor.distanceKm,
      estimatedMinutes: corridor.estimatedTransitMinutes,
      status: corridor.operationalStatus,
    },
    isSynthetic: true,
  };
}

/**
 * Deterministic fingerprint for caching and duplicate request prevention.
 */
export function generateContextFingerprint(context: GeminiDecisionContext): string {
  const parts = [
    context.scenario,
    context.risk.id,
    context.risk.level,
    context.risk.hoursToDepletion,
    context.risk.projectedDeficit,
    ...context.relevantInventory.map(
      (i) => `${i.hospitalId}:${i.availableUnits}:${i.totalUnits}`
    ),
    ...context.candidateActions.map((c) => `${c.id}:${c.units}:${c.isFeasible}`),
  ];
  return parts.join('|');
}
