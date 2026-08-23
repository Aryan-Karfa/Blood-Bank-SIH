import { create } from 'zustand';
import {
  Hospital,
  Network,
  InventoryItem,
  InventoryLot,
  BloodRequest,
  DemandDataPoint,
  ComponentForecast,
  RiskItem,
  Recommendation,
  TransferRecord,
  AuditEvent,
  HospitalId,
  ScenarioId,
  CandidateAction,
  GeminiRecommendationResponse,
  AiEngineStatus,
  AiTelemetryStats,
} from '../types';
import {
  MOCK_HOSPITALS,
  MOCK_NETWORK,
  MOCK_INVENTORY,
  MOCK_INVENTORY_LOTS,
  MOCK_REQUESTS,
  MOCK_DEMAND_HISTORY,
  MOCK_FORECASTS,
  MOCK_RISKS,
  MOCK_RECOMMENDATIONS,
  MOCK_TRANSFERS,
  MOCK_AUDIT_LOGS,
  deriveInventoryStatus,
} from '../data';
import {
  evaluateOperationalRisks,
  generateCandidateActions,
  buildGeminiDecisionContext,
  calculateDemandMetrics,
} from '../intelligence';
import { executeAiDecisionSupport, clearAiResponseCache } from '../services/aiGateway';
import { advanceSimulationState, addHoursToTimestamp } from '../simulation/simulationEngine';

export const BASELINE_SIMULATION_CLOCK = '2026-08-23T10:00:00+05:30';

export interface AppState {
  // Shared Operational World Collections
  hospitals: Hospital[];
  network: Network;
  inventory: InventoryItem[];
  inventoryLots: InventoryLot[];
  requests: BloodRequest[];
  demandHistory: DemandDataPoint[];
  forecasts: ComponentForecast[];
  risks: RiskItem[];
  recommendations: Recommendation[];
  transfers: TransferRecord[];
  auditEvents: AuditEvent[];

  // Navigation & Workspace State
  activeHospitalId: 'ALL' | HospitalId;
  activeScenario: ScenarioId;
  isDemoMode: boolean;
  simulatedTimestamp: string;
  sidebarCollapsed: boolean;

  // AI Decision Support & Gateway State
  aiEngineStatus: AiEngineStatus;
  aiSimulateFailure: boolean;
  isAnalyzingWithAi: boolean;
  activeDecisionSupport: GeminiRecommendationResponse | null;
  candidateActions: CandidateAction[];
  aiTelemetry: AiTelemetryStats;

  // Simulation Clock & Modals
  simulationRunning: boolean;
  scenarioComparisonOpen: boolean;
  aiDiagnosticsOpen: boolean;

  // Detail Drawer & Modals
  drawerOpen: boolean;
  drawerData: {
    title: string;
    type: 'INVENTORY' | 'LOT' | 'REQUEST' | 'TRANSFER' | 'RISK' | 'RECOMMENDATION' | 'AUDIT' | 'INFO';
    payload: unknown;
  } | null;

  // Operational & UI Actions
  setHospital: (id: 'ALL' | HospitalId) => void;
  setScenario: (scenario: ScenarioId) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openDrawer: (
    title: string,
    type: 'INVENTORY' | 'LOT' | 'REQUEST' | 'TRANSFER' | 'RISK' | 'RECOMMENDATION' | 'AUDIT' | 'INFO',
    payload: unknown
  ) => void;
  closeDrawer: () => void;
  setAiSimulateFailure: (simulate: boolean) => void;
  openScenarioComparison: () => void;
  closeScenarioComparison: () => void;
  openAiDiagnostics: () => void;
  closeAiDiagnostics: () => void;

  // Intelligence & Simulation Actions
  advanceSimulationTime: (hours: number) => void;
  toggleSimulationRunning: () => void;
  runAiDecisionSupport: (riskId?: string) => Promise<void>;
  recalculateIntelligence: () => void;

  // Domain State Transitions
  allocateRequest: (requestId: string, unitsToAllocate: number) => { success: boolean; message: string };
  fulfillRequest: (requestId: string) => { success: boolean; message: string };
  approveRecommendation: (recId: string, operatorId?: string, candidateUnitsOverride?: number) => { success: boolean; transferId?: string; error?: string };
  rejectRecommendation: (recId: string, reason?: string) => void;
  dispatchTransfer: (transferId: string) => void;
  receiveTransfer: (transferId: string) => void;
  resetDemoState: () => void;
}

// Initial candidate generation for baseline
const initialCandidates = generateCandidateActions(
  MOCK_RISKS[0],
  MOCK_INVENTORY,
  MOCK_INVENTORY_LOTS,
  MOCK_NETWORK
);

export const useAppStore = create<AppState>((set, get) => ({
  // Initialize baseline datasets
  hospitals: [...MOCK_HOSPITALS],
  network: { ...MOCK_NETWORK },
  inventory: [...MOCK_INVENTORY],
  inventoryLots: [...MOCK_INVENTORY_LOTS],
  requests: [...MOCK_REQUESTS],
  demandHistory: [...MOCK_DEMAND_HISTORY],
  forecasts: [...MOCK_FORECASTS],
  risks: [...MOCK_RISKS],
  recommendations: [...MOCK_RECOMMENDATIONS],
  transfers: [...MOCK_TRANSFERS],
  auditEvents: [...MOCK_AUDIT_LOGS],

  activeHospitalId: 'ALL',
  activeScenario: 'emergency_surge',
  isDemoMode: true,
  simulatedTimestamp: BASELINE_SIMULATION_CLOCK,
  sidebarCollapsed: false,
  drawerOpen: false,
  drawerData: null,

  // AI & Simulation Initial State
  aiEngineStatus: 'GEMINI_LIVE',
  aiSimulateFailure: false,
  isAnalyzingWithAi: false,
  activeDecisionSupport: null,
  candidateActions: initialCandidates,
  simulationRunning: false,
  scenarioComparisonOpen: false,
  aiDiagnosticsOpen: false,
  aiTelemetry: {
    requestCount: 1,
    fallbackCount: 0,
    rateLimitCount: 0,
    cacheHitCount: 0,
    lastLatencyMs: 850,
    avgLatencyMs: 850,
    dailyBudgetLimit: 100,
    dailyBudgetUsed: 1,
    lastAnalysisTimestamp: BASELINE_SIMULATION_CLOCK,
    lastEngineUsed: 'Google Gemini 2.0 Flash (Simulated)',
  },

  setHospital: (id) => set({ activeHospitalId: id }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setAiSimulateFailure: (simulate) => set({ aiSimulateFailure: simulate }),
  openScenarioComparison: () => set({ scenarioComparisonOpen: true }),
  closeScenarioComparison: () => set({ scenarioComparisonOpen: false }),
  openAiDiagnostics: () => set({ aiDiagnosticsOpen: true }),
  closeAiDiagnostics: () => set({ aiDiagnosticsOpen: false }),

  openDrawer: (title, type, payload) =>
    set({ drawerOpen: true, drawerData: { title, type, payload } }),
  closeDrawer: () => set({ drawerOpen: false, drawerData: null }),

  // ==========================================
  // SCENARIO SWITCHING & RECALCULATION
  // ==========================================

  setScenario: (scenario) => {
    const state = get();
    clearAiResponseCache();

    // Recalculate dynamic risks under the new scenario
    const updatedRisks = evaluateOperationalRisks(
      state.inventory,
      state.inventoryLots,
      state.requests,
      state.demandHistory,
      scenario,
      state.simulatedTimestamp
    );

    const primaryRisk = updatedRisks[0] || state.risks[0];
    const newCandidates = generateCandidateActions(
      primaryRisk,
      state.inventory,
      state.inventoryLots,
      state.network
    );

    const auditCode = `AUD-${Date.now().toString().slice(-6)}`;
    const scenarioAudit: AuditEvent = {
      id: `AUD-${Date.now()}-SCN`,
      auditCode,
      timestamp: state.simulatedTimestamp,
      actorType: 'SYSTEM',
      actorId: 'SCENARIO_CONTROLLER',
      action: 'SIMULATION_SCENARIO_LOADED',
      entityType: 'SIMULATION',
      entityId: scenario.toUpperCase(),
      previousState: state.activeScenario,
      newState: scenario,
      summary: `Applied scenario preset "${scenario}". Recalculated demand multipliers, dynamic risk matrix, and transfer candidates.`,
      reason: 'Operator scenario configuration switch.',
      isSynthetic: true,
    };

    set({
      activeScenario: scenario,
      risks: updatedRisks,
      candidateActions: newCandidates,
      auditEvents: [scenarioAudit, ...state.auditEvents],
    });
  },

  recalculateIntelligence: () => {
    const state = get();
    const updatedRisks = evaluateOperationalRisks(
      state.inventory,
      state.inventoryLots,
      state.requests,
      state.demandHistory,
      state.activeScenario,
      state.simulatedTimestamp
    );

    const primaryRisk = updatedRisks[0] || state.risks[0];
    const newCandidates = generateCandidateActions(
      primaryRisk,
      state.inventory,
      state.inventoryLots,
      state.network
    );

    set({
      risks: updatedRisks,
      candidateActions: newCandidates,
    });
  },

  // ==========================================
  // SIMULATION CLOCK CONTROLS
  // ==========================================

  advanceSimulationTime: (hours) => {
    const state = get();
    const result = advanceSimulationState(
      state.simulatedTimestamp,
      hours,
      state.inventory,
      state.inventoryLots,
      state.requests,
      state.demandHistory,
      state.forecasts,
      state.transfers,
      state.auditEvents,
      state.activeScenario,
      state.network
    );

    const primaryRisk = result.risks[0] || state.risks[0];
    const newCandidates = generateCandidateActions(
      primaryRisk,
      result.inventory,
      result.inventoryLots,
      state.network
    );

    set({
      simulatedTimestamp: result.simulatedTimestamp,
      inventory: result.inventory,
      inventoryLots: result.inventoryLots,
      forecasts: result.forecasts,
      risks: result.risks,
      auditEvents: result.auditEvents,
      candidateActions: newCandidates,
    });
  },

  toggleSimulationRunning: () => {
    const state = get();
    set({ simulationRunning: !state.simulationRunning });
  },

  // ==========================================
  // AI DECISION SUPPORT EXECUTION (GEMINI + FALLBACK)
  // ==========================================

  runAiDecisionSupport: async (riskId) => {
    const state = get();
    if (state.isAnalyzingWithAi) return;

    set({ isAnalyzingWithAi: true, aiEngineStatus: 'GEMINI_ANALYZING' });

    const targetRisk =
      (riskId ? state.risks.find((r) => r.id === riskId) : state.risks[0]) || state.risks[0];

    const demandMetrics = calculateDemandMetrics(
      targetRisk.hospitalId,
      targetRisk.bloodGroup,
      targetRisk.component,
      state.demandHistory,
      state.requests,
      state.activeScenario
    );

    const candidates = generateCandidateActions(
      targetRisk,
      state.inventory,
      state.inventoryLots,
      state.network
    );

    const context = buildGeminiDecisionContext({
      scenario: state.activeScenario,
      simulatedTime: state.simulatedTimestamp,
      risk: targetRisk,
      inventory: state.inventory,
      requests: state.requests,
      demandMetrics,
      candidateActions: candidates,
      network: state.network,
    });

    const startAuditCode = `AUD-${Date.now().toString().slice(-6)}`;
    const aiStartAudit: AuditEvent = {
      id: `AUD-${Date.now()}-AIBEGIN`,
      auditCode: startAuditCode,
      timestamp: state.simulatedTimestamp,
      actorType: 'SYSTEM',
      actorId: 'SYS_AI_GATEWAY',
      action: 'AI_REQUEST_STARTED',
      entityType: 'AI_GATEWAY',
      entityId: targetRisk.riskCode,
      summary: `Invoked AI decision support for ${targetRisk.riskCode} (${targetRisk.bloodGroup} ${targetRisk.component}). Passing ${candidates.length} candidate actions.`,
      reason: 'Operator triggered decision-support analysis.',
      isSynthetic: true,
    };

    set((s) => ({ auditEvents: [aiStartAudit, ...s.auditEvents] }));

    try {
      const gatewayResult = await executeAiDecisionSupport(context, state.aiSimulateFailure);
      const isFallback = gatewayResult.status === 'DETERMINISTIC_FALLBACK' || gatewayResult.status === 'GEMINI_RATE_LIMITED';

      const completionAuditCode = `AUD-${Date.now().toString().slice(-6)}`;
      const aiCompleteAudit: AuditEvent = {
        id: `AUD-${Date.now()}-AICOMPLETE`,
        auditCode: completionAuditCode,
        timestamp: state.simulatedTimestamp,
        actorType: 'SYSTEM',
        actorId: isFallback ? 'SYS_FALLBACK_ENGINE' : 'SYS_GEMINI_GATEWAY',
        action: isFallback ? 'AI_FALLBACK_TRIGGERED' : 'AI_RESPONSE_VALIDATED',
        entityType: 'AI_GATEWAY',
        entityId: targetRisk.riskCode,
        summary: isFallback
          ? `Deterministic fallback decision support generated for ${targetRisk.riskCode}. Reason: ${gatewayResult.reason || 'Fallback mode active'}.`
          : `Google Gemini 2.0 Flash response validated. Selected ${gatewayResult.response.selectedCandidateId} with ${gatewayResult.response.confidence} confidence (${gatewayResult.latencyMs}ms).`,
        reason: 'Decision-support analysis completed.',
        isSynthetic: true,
      };

      set((s) => ({
        isAnalyzingWithAi: false,
        aiEngineStatus: gatewayResult.status,
        activeDecisionSupport: gatewayResult.response,
        candidateActions: candidates,
        auditEvents: [aiCompleteAudit, ...s.auditEvents],
        aiTelemetry: {
          ...s.aiTelemetry,
          requestCount: s.aiTelemetry.requestCount + 1,
          fallbackCount: isFallback ? s.aiTelemetry.fallbackCount + 1 : s.aiTelemetry.fallbackCount,
          rateLimitCount: gatewayResult.status === 'GEMINI_RATE_LIMITED' ? s.aiTelemetry.rateLimitCount + 1 : s.aiTelemetry.rateLimitCount,
          cacheHitCount: gatewayResult.isCached ? s.aiTelemetry.cacheHitCount + 1 : s.aiTelemetry.cacheHitCount,
          lastLatencyMs: gatewayResult.latencyMs,
          avgLatencyMs: Math.round((s.aiTelemetry.avgLatencyMs + gatewayResult.latencyMs) / 2),
          dailyBudgetUsed: s.aiTelemetry.dailyBudgetUsed + (gatewayResult.isCached ? 0 : 1),
          lastAnalysisTimestamp: s.simulatedTimestamp,
          lastEngineUsed: gatewayResult.response.engine === 'GEMINI' ? 'Google Gemini 2.0 Flash' : 'Deterministic Optimization Core',
        },
      }));
    } catch {
      set({
        isAnalyzingWithAi: false,
        aiEngineStatus: 'DETERMINISTIC_FALLBACK',
      });
    }
  },

  // ==========================================
  // OPERATIONAL STATE MUTATIONS WITH REVALIDATION GUARD
  // ==========================================

  allocateRequest: (requestId, unitsToAllocate) => {
    const state = get();
    const req = state.requests.find((r) => r.id === requestId || r.requestId === requestId);
    if (!req) return { success: false, message: 'Request not found' };

    const invItem = state.inventory.find(
      (inv) =>
        inv.hospitalId === req.hospitalId &&
        inv.bloodGroup === req.bloodGroup &&
        inv.component === req.component
    );

    if (!invItem) return { success: false, message: 'Inventory item not found for this facility' };

    if (invItem.availableUnits < unitsToAllocate) {
      return {
        success: false,
        message: `Insufficient available inventory (Available: ${invItem.availableUnits}, Requested: ${unitsToAllocate})`,
      };
    }

    const newAllocated = req.unitsAllocated + unitsToAllocate;
    const newStatus = newAllocated >= req.unitsRequested ? 'ALLOCATED' : 'PARTIALLY_ALLOCATED';

    const newReserved = invItem.reservedUnits + unitsToAllocate;
    const newAvailable = invItem.totalUnits - newReserved - invItem.inTransitUnits;
    const newInvStatus = deriveInventoryStatus(
      invItem.totalUnits,
      newReserved,
      invItem.inTransitUnits,
      invItem.minimumThreshold,
      invItem.criticalThreshold
    );

    const auditCode = `AUD-${Date.now().toString().slice(-6)}`;
    const newAudit: AuditEvent = {
      id: `AUD-${Date.now()}`,
      auditCode,
      timestamp: state.simulatedTimestamp,
      actorType: 'OPERATOR',
      actorId: 'Transfusion Officer (Current Session)',
      action: 'REQUEST_ALLOCATED',
      entityType: 'REQUEST',
      entityId: req.requestId,
      previousState: req.status,
      newState: newStatus,
      summary: `Allocated ${unitsToAllocate} units of ${req.bloodGroup} ${req.component} for ${req.patientRef} (${req.requestingDepartment}).`,
      reason: 'Clinical priority allocation executed in simulation.',
      isSynthetic: true,
    };

    set({
      requests: state.requests.map((r) =>
        r.id === req.id ? { ...r, unitsAllocated: newAllocated, status: newStatus } : r
      ),
      inventory: state.inventory.map((inv) =>
        inv.id === invItem.id
          ? {
              ...inv,
              reservedUnits: newReserved,
              availableUnits: newAvailable,
              status: newInvStatus,
              lastUpdated: state.simulatedTimestamp,
            }
          : inv
      ),
      auditEvents: [newAudit, ...state.auditEvents],
    });

    get().recalculateIntelligence();
    return { success: true, message: `Successfully allocated ${unitsToAllocate} units.` };
  },

  fulfillRequest: (requestId) => {
    const state = get();
    const req = state.requests.find((r) => r.id === requestId || r.requestId === requestId);
    if (!req) return { success: false, message: 'Request not found' };

    const invItem = state.inventory.find(
      (inv) =>
        inv.hospitalId === req.hospitalId &&
        inv.bloodGroup === req.bloodGroup &&
        inv.component === req.component
    );

    if (!invItem) return { success: false, message: 'Inventory record not found' };

    const unitsToDeduct = req.unitsAllocated;
    const newTotal = invItem.totalUnits - unitsToDeduct;
    const newReserved = invItem.reservedUnits - unitsToDeduct;
    const newAvailable = newTotal - newReserved - invItem.inTransitUnits;
    const newInvStatus = deriveInventoryStatus(
      newTotal,
      newReserved,
      invItem.inTransitUnits,
      invItem.minimumThreshold,
      invItem.criticalThreshold
    );

    const auditCode = `AUD-${Date.now().toString().slice(-6)}`;
    const newAudit: AuditEvent = {
      id: `AUD-${Date.now()}`,
      auditCode,
      timestamp: state.simulatedTimestamp,
      actorType: 'OPERATOR',
      actorId: 'Transfusion Lead (Current Session)',
      action: 'REQUEST_FULFILLED',
      entityType: 'REQUEST',
      entityId: req.requestId,
      previousState: req.status,
      newState: 'FULFILLED',
      summary: `Transfusion completed: ${unitsToDeduct} units ${req.bloodGroup} ${req.component} transfused to ${req.patientRef}.`,
      reason: 'Surgical/trauma administration completed.',
      isSynthetic: true,
    };

    set({
      requests: state.requests.map((r) =>
        r.id === req.id ? { ...r, status: 'FULFILLED' } : r
      ),
      inventory: state.inventory.map((inv) =>
        inv.id === invItem.id
          ? {
              ...inv,
              totalUnits: newTotal,
              reservedUnits: newReserved,
              availableUnits: newAvailable,
              status: newInvStatus,
              lastUpdated: state.simulatedTimestamp,
            }
          : inv
      ),
      auditEvents: [newAudit, ...state.auditEvents],
    });

    get().recalculateIntelligence();
    return { success: true, message: `Request ${req.requestId} fulfilled.` };
  },

  approveRecommendation: (recId, operatorId = 'Dr. Sunita Banerjee / Chief Operator', candidateUnitsOverride) => {
    const state = get();
    const rec = state.recommendations.find((r) => r.id === recId || r.recommendationCode === recId);
    if (!rec) return { success: false, error: 'Recommendation not found' };

    const unitsToTransfer = candidateUnitsOverride || rec.recommendedUnits;

    // ====================================================
    // REVALIDATION GUARD: Secondary Shortage Protection
    // ====================================================
    const sourceInv = state.inventory.find(
      (inv) =>
        inv.hospitalId === rec.sourceHospitalId &&
        inv.bloodGroup === rec.bloodGroup &&
        inv.component === rec.component
    );

    if (!sourceInv) {
      return { success: false, error: 'RECOMMENDATION NO LONGER VALID: Source inventory record does not exist.' };
    }

    if (sourceInv.availableUnits < unitsToTransfer) {
      return {
        success: false,
        error: `RECOMMENDATION NO LONGER VALID: Available units at ${rec.sourceHospitalId} (${sourceInv.availableUnits} u) cannot satisfy ${unitsToTransfer} u transfer.`,
      };
    }

    const remainingBuffer = sourceInv.availableUnits - unitsToTransfer;
    if (remainingBuffer < sourceInv.minimumThreshold) {
      return {
        success: false,
        error: `RECOMMENDATION BLOCKED: Executing transfer would breach source facility safety buffer (${remainingBuffer} u remaining vs ${sourceInv.minimumThreshold} min threshold).`,
      };
    }

    const transferIdCode = `TR-SYN-${Date.now().toString().slice(-3)}`;
    const newTransfer: TransferRecord = {
      id: `TR-${Date.now()}`,
      transferId: transferIdCode,
      recommendationId: rec.recommendationCode,
      sourceHospitalId: rec.sourceHospitalId,
      destinationHospitalId: rec.destinationHospitalId,
      bloodGroup: rec.bloodGroup,
      component: rec.component,
      units: unitsToTransfer,
      status: 'APPROVED',
      requestedAt: state.simulatedTimestamp,
      approvedAt: state.simulatedTimestamp,
      eta: addHoursToTimestamp(state.simulatedTimestamp, 1),
      coldChain: {
        monitoredTempCelsius: 3.8,
        minTempAllowed: 2.0,
        maxTempAllowed: 6.0,
        dataLoggerId: `LOGGER-${Date.now().toString().slice(-4)}`,
        status: 'COMPLIANT',
        isSimulated: true,
      },
      chainOfCustody: {
        dispatchOfficer: 'Sunil Mondal (MMC Blood Bank Tech)',
        transitCourier: 'MedExpress Cold Logistics (Van #04)',
        receivingOfficer: 'Dr. Arindam Sen (CCGH Inbound)',
      },
      reason: rec.reason,
      isSynthetic: true,
    };

    // Mark source units as in-transit commitment
    const newInTransit = sourceInv.inTransitUnits + unitsToTransfer;
    const newAvailable = sourceInv.totalUnits - sourceInv.reservedUnits - newInTransit;
    const newStatus = deriveInventoryStatus(
      sourceInv.totalUnits,
      sourceInv.reservedUnits,
      newInTransit,
      sourceInv.minimumThreshold,
      sourceInv.criticalThreshold
    );

    const updatedInventory = state.inventory.map((inv) =>
      inv.id === sourceInv.id
        ? {
            ...inv,
            inTransitUnits: newInTransit,
            availableUnits: Math.max(0, newAvailable),
            status: newStatus,
            lastUpdated: state.simulatedTimestamp,
          }
        : inv
    );

    const auditCode = `AUD-${Date.now().toString().slice(-6)}`;
    const newAudit: AuditEvent = {
      id: `AUD-${Date.now()}`,
      auditCode,
      timestamp: state.simulatedTimestamp,
      actorType: 'OPERATOR',
      actorId: operatorId,
      action: 'RECOMMENDATION_APPROVED',
      entityType: 'RECOMMENDATION',
      entityId: rec.recommendationCode,
      previousState: 'PENDING_REVIEW',
      newState: 'APPROVED',
      summary: `Human operator authorized transfer of ${unitsToTransfer} units ${rec.bloodGroup} ${rec.component}: ${rec.sourceHospitalId} -> ${rec.destinationHospitalId}. Revalidation passed.`,
      reason: rec.reason,
      isSynthetic: true,
    };

    set({
      recommendations: state.recommendations.map((r) =>
        r.id === rec.id
          ? {
              ...r,
              status: 'APPROVED',
              reviewedAt: state.simulatedTimestamp,
              reviewedBy: operatorId,
            }
          : r
      ),
      transfers: [newTransfer, ...state.transfers],
      inventory: updatedInventory,
      auditEvents: [newAudit, ...state.auditEvents],
    });

    get().recalculateIntelligence();
    return { success: true, transferId: transferIdCode };
  },

  rejectRecommendation: (recId, reason = 'Operator preference / Clinical evaluation') => {
    const state = get();
    const rec = state.recommendations.find((r) => r.id === recId);
    if (!rec) return;

    const auditCode = `AUD-${Date.now().toString().slice(-6)}`;
    const newAudit: AuditEvent = {
      id: `AUD-${Date.now()}`,
      auditCode,
      timestamp: state.simulatedTimestamp,
      actorType: 'OPERATOR',
      actorId: 'Transfusion Officer (Current Session)',
      action: 'RECOMMENDATION_REJECTED',
      entityType: 'RECOMMENDATION',
      entityId: rec.recommendationCode,
      previousState: 'PENDING_REVIEW',
      newState: 'REJECTED',
      summary: `Operator rejected recommendation ${rec.recommendationCode} for ${rec.recommendedUnits} units ${rec.bloodGroup} ${rec.component}.`,
      reason,
      isSynthetic: true,
    };

    set({
      recommendations: state.recommendations.map((r) =>
        r.id === rec.id
          ? {
              ...r,
              status: 'REJECTED',
              rejectionReason: reason,
              reviewedAt: state.simulatedTimestamp,
            }
          : r
      ),
      auditEvents: [newAudit, ...state.auditEvents],
    });
  },

  dispatchTransfer: (transferId) => {
    const state = get();
    const transfer = state.transfers.find((t) => t.id === transferId || t.transferId === transferId);
    if (!transfer) return;

    const auditCode = `AUD-${Date.now().toString().slice(-6)}`;
    const newAudit: AuditEvent = {
      id: `AUD-${Date.now()}`,
      auditCode,
      timestamp: state.simulatedTimestamp,
      actorType: 'LOGISTICS',
      actorId: transfer.chainOfCustody.transitCourier,
      action: 'TRANSFER_DISPATCHED',
      entityType: 'TRANSFER',
      entityId: transfer.transferId,
      previousState: transfer.status,
      newState: 'IN_TRANSIT',
      summary: `Transfer ${transfer.transferId} dispatched. Courier in transit with temperature telemetry compliant (${transfer.coldChain.monitoredTempCelsius}°C).`,
      reason: 'Physical cold box handover completed.',
      isSynthetic: true,
    };

    set({
      transfers: state.transfers.map((t) =>
        t.id === transfer.id
          ? {
              ...t,
              status: 'IN_TRANSIT',
              dispatchedAt: state.simulatedTimestamp,
            }
          : t
      ),
      auditEvents: [newAudit, ...state.auditEvents],
    });
  },

  receiveTransfer: (transferId) => {
    const state = get();
    const transfer = state.transfers.find((t) => t.id === transferId || t.transferId === transferId);
    if (!transfer) return;

    const sourceInv = state.inventory.find(
      (inv) =>
        inv.hospitalId === transfer.sourceHospitalId &&
        inv.bloodGroup === transfer.bloodGroup &&
        inv.component === transfer.component
    );

    const destInv = state.inventory.find(
      (inv) =>
        inv.hospitalId === transfer.destinationHospitalId &&
        inv.bloodGroup === transfer.bloodGroup &&
        inv.component === transfer.component
    );

    let updatedInventory = state.inventory;

    if (sourceInv && destInv) {
      const newSourceTotal = sourceInv.totalUnits - transfer.units;
      const newSourceInTransit = Math.max(0, sourceInv.inTransitUnits - transfer.units);
      const newSourceAvailable = newSourceTotal - sourceInv.reservedUnits - newSourceInTransit;
      const newSourceStatus = deriveInventoryStatus(
        newSourceTotal,
        sourceInv.reservedUnits,
        newSourceInTransit,
        sourceInv.minimumThreshold,
        sourceInv.criticalThreshold
      );

      const newDestTotal = destInv.totalUnits + transfer.units;
      const newDestAvailable = newDestTotal - destInv.reservedUnits - destInv.inTransitUnits;
      const newDestStatus = deriveInventoryStatus(
        newDestTotal,
        destInv.reservedUnits,
        destInv.inTransitUnits,
        destInv.minimumThreshold,
        destInv.criticalThreshold
      );

      updatedInventory = state.inventory.map((inv) => {
        if (inv.id === sourceInv.id) {
          return {
            ...inv,
            totalUnits: newSourceTotal,
            inTransitUnits: newSourceInTransit,
            availableUnits: newSourceAvailable,
            status: newSourceStatus,
            lastUpdated: state.simulatedTimestamp,
          };
        }
        if (inv.id === destInv.id) {
          return {
            ...inv,
            totalUnits: newDestTotal,
            availableUnits: newDestAvailable,
            status: newDestStatus,
            lastUpdated: state.simulatedTimestamp,
          };
        }
        return inv;
      });
    }

    const updatedRisks = state.risks.map((risk) => {
      if (
        risk.hospitalId === transfer.destinationHospitalId &&
        risk.bloodGroup === transfer.bloodGroup &&
        risk.component === transfer.component &&
        risk.status === 'ACTIVE'
      ) {
        return {
          ...risk,
          status: 'RESOLVED' as const,
          level: 'LOW' as const,
          title: `[RESOLVED] ${risk.title} (Transfer ${transfer.transferId} Received)`,
        };
      }
      return risk;
    });

    const auditCode = `AUD-${Date.now().toString().slice(-6)}`;
    const newAudit: AuditEvent = {
      id: `AUD-${Date.now()}`,
      auditCode,
      timestamp: state.simulatedTimestamp,
      actorType: 'LOGISTICS',
      actorId: transfer.chainOfCustody.receivingOfficer || 'Inbound Inspection Lead',
      action: 'TRANSFER_RECEIVED',
      entityType: 'TRANSFER',
      entityId: transfer.transferId,
      previousState: transfer.status,
      newState: 'RECEIVED',
      summary: `Transfer ${transfer.transferId} received at ${transfer.destinationHospitalId}. ${transfer.units} units added to active inventory.`,
      reason: 'Physical intake & cold-chain compliance verified.',
      isSynthetic: true,
    };

    set({
      transfers: state.transfers.map((t) =>
        t.id === transfer.id
          ? {
              ...t,
              status: 'RECEIVED',
              receivedAt: state.simulatedTimestamp,
            }
          : t
      ),
      inventory: updatedInventory,
      risks: updatedRisks,
      auditEvents: [newAudit, ...state.auditEvents],
    });

    get().recalculateIntelligence();
  },

  resetDemoState: () => {
    clearAiResponseCache();
    set({
      hospitals: [...MOCK_HOSPITALS],
      network: { ...MOCK_NETWORK },
      inventory: [...MOCK_INVENTORY],
      inventoryLots: [...MOCK_INVENTORY_LOTS],
      requests: [...MOCK_REQUESTS],
      demandHistory: [...MOCK_DEMAND_HISTORY],
      forecasts: [...MOCK_FORECASTS],
      risks: [...MOCK_RISKS],
      recommendations: [...MOCK_RECOMMENDATIONS],
      transfers: [...MOCK_TRANSFERS],
      auditEvents: [...MOCK_AUDIT_LOGS],
      activeHospitalId: 'ALL',
      activeScenario: 'emergency_surge',
      drawerOpen: false,
      drawerData: null,
      simulatedTimestamp: BASELINE_SIMULATION_CLOCK,
      aiEngineStatus: 'GEMINI_LIVE',
      aiSimulateFailure: false,
      isAnalyzingWithAi: false,
      activeDecisionSupport: null,
      candidateActions: initialCandidates,
      simulationRunning: false,
      scenarioComparisonOpen: false,
      aiDiagnosticsOpen: false,
      aiTelemetry: {
        requestCount: 1,
        fallbackCount: 0,
        rateLimitCount: 0,
        cacheHitCount: 0,
        lastLatencyMs: 850,
        avgLatencyMs: 850,
        dailyBudgetLimit: 100,
        dailyBudgetUsed: 1,
        lastAnalysisTimestamp: BASELINE_SIMULATION_CLOCK,
        lastEngineUsed: 'Google Gemini 2.0 Flash (Simulated)',
      },
    });
  },
}));
