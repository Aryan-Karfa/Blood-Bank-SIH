export type AuditActorType = 'SYSTEM' | 'OPERATOR' | 'LOGISTICS';

export type AuditActionType =
  | 'RISK_DETECTED'
  | 'RISK_MITIGATED'
  | 'RISK_RECALCULATED'
  | 'RECOMMENDATION_GENERATED'
  | 'RECOMMENDATION_APPROVED'
  | 'RECOMMENDATION_REJECTED'
  | 'TRANSFER_CREATED'
  | 'TRANSFER_DISPATCHED'
  | 'TRANSFER_RECEIVED'
  | 'TRANSFER_CANCELLED'
  | 'REQUEST_CREATED'
  | 'REQUEST_ALLOCATED'
  | 'REQUEST_FULFILLED'
  | 'REQUEST_CANCELLED'
  | 'INVENTORY_RECONCILED'
  | 'SIMULATION_SCENARIO_LOADED'
  | 'SIMULATION_TIME_ADVANCED'
  | 'COLD_CHAIN_ALERT'
  | 'AI_REQUEST_STARTED'
  | 'AI_REQUEST_COMPLETED'
  | 'AI_RESPONSE_VALIDATED'
  | 'AI_RESPONSE_REJECTED'
  | 'AI_REQUEST_TIMEOUT'
  | 'AI_RATE_LIMITED'
  | 'AI_CACHE_HIT'
  | 'AI_FALLBACK_TRIGGERED'
  | 'AI_DECISION_SUPPORT_INVOKED';

export type AuditEntityType =
  | 'HOSPITAL'
  | 'INVENTORY'
  | 'REQUEST'
  | 'FORECAST'
  | 'RISK'
  | 'RECOMMENDATION'
  | 'TRANSFER'
  | 'SIMULATION'
  | 'AI_GATEWAY';

export interface AuditEvent {
  id: string;
  auditCode: string;
  timestamp: string;
  actorType: AuditActorType;
  actorId: string;
  action: AuditActionType;
  entityType: AuditEntityType;
  entityId: string;
  previousState?: string;
  newState?: string;
  summary: string;
  reason?: string;
  metadata?: Record<string, unknown>;
  isSynthetic: true;
}
