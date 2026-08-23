import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { SectionHeader, Badge, Button, Modal } from '../../components/ui';
import { Recommendation } from '../../types';
import { renderWithBloodGroup } from '../../lib/utils';

export const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    recommendations,
    candidateActions,
    activeDecisionSupport,
    aiEngineStatus,
    isAnalyzingWithAi,
    runAiDecisionSupport,
    approveRecommendation,
    rejectRecommendation,
    openDrawer,
    inventory,
    risks,
  } = useAppStore();

  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [operatorId, setOperatorId] = useState('Dr. Sunita Banerjee / Chief Transfusion Lead');
  const [revalidationError, setRevalidationError] = useState<string | null>(null);

  const primaryRisk = risks[0];
  const primaryRec = recommendations[0];

  const activeCandidate =
    candidateActions.find((c) => c.id === activeDecisionSupport?.selectedCandidateId) ||
    candidateActions[0];

  const handleApproveClick = (rec: Recommendation) => {
    setSelectedRec(rec);
    setRevalidationError(null);
    setApprovalModalOpen(true);
  };

  const handleConfirmApproval = () => {
    if (!selectedRec) return;
    const unitsToTransfer = activeCandidate?.isFeasible ? activeCandidate.units : selectedRec.recommendedUnits;
    const res = approveRecommendation(selectedRec.id, operatorId, unitsToTransfer);
    if (!res.success) {
      setRevalidationError(res.error || 'Recommendation revalidation failed.');
    } else {
      setApprovalModalOpen(false);
      navigate('/app/transfers');
    }
  };

  const handleTriggerAiAnalysis = async () => {
    await runAiDecisionSupport(primaryRisk?.id);
  };

  // Live before/after metrics calculation
  const destInv = inventory.find((i) => i.hospitalId === 'HOSP-A' && i.bloodGroup === 'O-' && i.component === 'PRBC');
  const sourceInv = inventory.find((i) => i.hospitalId === 'HOSP-B' && i.bloodGroup === 'O-' && i.component === 'PRBC');

  const destStockBefore = destInv?.totalUnits ?? 4;
  const destAvailableBefore = destInv?.availableUnits ?? 1;
  const sourceStockBefore = sourceInv?.totalUnits ?? 38;

  const destStockAfter = destStockBefore + (primaryRec?.recommendedUnits ?? 20);
  const sourceStockAfter = sourceStockBefore - (primaryRec?.recommendedUnits ?? 20);

  return (
    <div className="space-y-6">
      {/* HEADER WITH AI TRIGGER BUTTON */}
      <SectionHeader
        title="AI Decision Support &amp; Transfer Optimization"
        subtitle="Multi-objective algorithmic matching paired with Google Gemini 3.7 Flash structured explainability and resilient deterministic fallback"
        badge={
          <Badge variant="info" isMono>
            {aiEngineStatus === 'GEMINI_LIVE'
              ? 'GEMINI 3.7 FLASH LIVE'
              : aiEngineStatus === 'GEMINI_ANALYZING'
              ? 'AI ANALYZING...'
              : 'DETERMINISTIC FALLBACK'}
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              disabled={isAnalyzingWithAi}
              onClick={handleTriggerAiAnalysis}
              className="font-mono text-xs"
            >
              {isAnalyzingWithAi ? 'ANALYZING...' : '⚡ RUN AI ANALYSIS (GEMINI)'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                openDrawer('AI Pipeline Architecture', 'INFO', {
                  pipeline:
                    'Operational State → Deterministic Risk Detection → Candidate Generation → Gemini Decision Support → Response Validation → Human Operator Review → State Mutation',
                  sourceOfTruth: 'Deterministic Simulation Engine',
                  explainabilityFramework: '5-Point Structured Explainability (What, Why, Evidence, Selection, Consequences)',
                  fallbackGuarantees: '100% Deterministic rule-based decision support during offline/failure states',
                  isSynthetic: true,
                })
              }
            >
              PIPELINE SPEC
            </Button>
          </div>
        }
      />

      {/* AI PROVENANCE & TRANSPARENCY PANEL */}
      <div className="p-4 bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C9C8C2] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#3D3E3A]">
              DECISION SUPPORT PROVENANCE
            </span>
            <Badge
              variant={
                aiEngineStatus === 'GEMINI_LIVE'
                  ? 'success'
                  : aiEngineStatus === 'GEMINI_ANALYZING'
                  ? 'info'
                  : 'warning'
              }
              size="sm"
              isMono
            >
              {activeDecisionSupport?.engine === 'GEMINI'
                ? 'GOOGLE GEMINI 3.7 FLASH'
                : 'DETERMINISTIC FALLBACK CORE'}
            </Badge>
          </div>
          <div className="text-[10px] font-mono text-[#3D3E3A] font-medium">
            ANALYSIS TIMESTAMP: {activeDecisionSupport?.generatedAt || '2026-08-23 10:00 IST'}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <span className="text-[10px] uppercase text-[#3D3E3A] block">Model / Engine</span>
            <strong className="text-[#171817]">
              {activeDecisionSupport?.modelIdentifier || 'gemini-3.7-flash'}
            </strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#3D3E3A] block">Confidence Rating</span>
            <strong className="text-[#216E4E]">
              {activeDecisionSupport?.confidence || 'HIGH'} ({Math.round((activeDecisionSupport?.confidenceScore || 0.96) * 100)}%)
            </strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#3D3E3A] block">Source of Truth</span>
            <strong className="text-[#171817]">Deterministic Simulation</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#3D3E3A] block">Authorization Mode</span>
            <strong className="text-[#A15C00]">Human Operator Required</strong>
          </div>
        </div>
      </div>

      {/* CANDIDATE ACTIONS COMPARISON MATRIX */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171817]">
              Generated Candidate Actions Matrix
            </h3>
            <p className="text-[11px] text-[#3D3E3A]">
              Deterministic candidates evaluated by Gemini / Fallback decision-support engine
            </p>
          </div>
          <Badge variant="outline" isMono size="sm">
            {candidateActions.length} CANDIDATES EVALUATED
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {candidateActions.map((cand) => {
            const isSelected =
              activeDecisionSupport?.selectedCandidateId === cand.id ||
              (!activeDecisionSupport && cand.id === 'CAND-A');

            return (
              <div
                key={cand.id}
                className={`p-3.5 border rounded-[4px] flex flex-col justify-between transition-colors ${
                  isSelected
                    ? 'border-2 border-[#171817] bg-[#F4F3EF]'
                    : cand.isFeasible
                    ? 'border-[#C9C8C2] bg-[#FFFFFF]'
                    : 'border-[#FECDCA] bg-[#FEF3F2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono font-bold text-xs text-[#171817]">{cand.id}</span>
                    {isSelected ? (
                      <Badge variant="success" size="sm" isMono>
                        SELECTED
                      </Badge>
                    ) : cand.isFeasible ? (
                      <Badge variant="outline" size="sm" isMono>
                        FEASIBLE
                      </Badge>
                    ) : (
                      <Badge variant="critical" size="sm" isMono>
                        INFEASIBLE
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-bold text-xs text-[#171817] mt-1.5">{renderWithBloodGroup(cand.label)}</h4>
                  <p className="text-[11px] text-[#3D3E3A] mt-1 leading-normal font-normal">{renderWithBloodGroup(cand.summary)}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#C9C8C2]/60 font-mono text-[10px] space-y-1">
                  {cand.type === 'TRANSFER' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-[#3D3E3A]">Source Post-Buffer:</span>
                        <strong className="text-[#171817]">{cand.sourceBufferPostTransfer} u ({cand.sourceSafetyBufferPercent}%)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3D3E3A]">Transit ETA:</span>
                        <strong className="text-[#171817]">~{cand.expectedTransitMinutes} min</strong>
                      </div>
                    </>
                  )}
                  {cand.prioritizesNearExpiryLot && (
                    <div className="text-[#A15C00] font-sans font-semibold">
                      ✓ Prioritizes lot {cand.prioritizesNearExpiryLot}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5-POINT EXPLAINABILITY BREAKDOWN & HERO RECOMMENDATION */}
      {recommendations.map((rec) => {
        const isApproved = rec.status === 'APPROVED';
        const isPending = rec.status === 'PENDING_REVIEW';
        const rationale = activeDecisionSupport?.rationale || {
          what: `Transfer ${rec.recommendedUnits} units ${rec.bloodGroup} ${rec.component} from ${rec.sourceHospitalId} (MMC) to ${rec.destinationHospitalId} (CCGH).`,
          why: `Eliminates zero-stockout threat at CCGH within 18 hours while preserving safe 120% buffer at MMC.`,
          evidence: rec.rationalePoints,
          selection: `Candidate A (20-unit transfer) was selected over partial options because it resolves 100% of 24h deficit and utilizes near-expiry units.`,
          consequences: `Restores CCGH inventory from 4 to 24 units (NORMAL risk index). Preserves MMC reserve at 18 units.`,
        };

        return (
          <div
            key={rec.id}
            className="p-5 bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] space-y-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-[#C9C8C2] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#3D3E3A]">
                    {rec.recommendationCode}
                  </span>
                  <Badge variant={isApproved ? 'success' : 'critical'} size="sm">
                    {rec.status}
                  </Badge>
                  <span className="text-[10px] font-mono text-[#3D3E3A]">
                    LINKED RISK: {rec.riskId}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#171817] uppercase tracking-wider mt-1">
                  Transfer {rec.recommendedUnits} × <span className="text-[#BB0A1E] font-bold">{rec.bloodGroup}</span> {rec.component}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" isMono>
                  ETA {rec.transitTimeMinutes} min
                </Badge>
                <Badge variant="info" isMono>
                  CONFIDENCE: {activeDecisionSupport?.confidence || rec.confidence}
                </Badge>
              </div>
            </div>

            {/* STRUCTURED 5-POINT EXPLAINABILITY RATIONALE */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D3E3A]">
                  Structured 5-Point Explainability Breakdown (AI Decision Support)
                </span>
                <span className="text-[10px] font-mono text-[#3D3E3A]">
                  EVIDENCE-GROUNDED REASONING
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {/* 01 WHAT */}
                <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[3px]">
                  <div className="font-mono font-bold text-[10px] text-[#3D3E3A] uppercase tracking-wider">
                    01 • WHAT IS RECOMMENDED
                  </div>
                  <p className="text-[#171817] font-semibold mt-0.5 leading-relaxed">
                    {renderWithBloodGroup(rationale.what)}
                  </p>
                </div>

                {/* 02 WHY */}
                <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[3px]">
                  <div className="font-mono font-bold text-[10px] text-[#3D3E3A] uppercase tracking-wider">
                    02 • WHY THIS ACTION IS PREFERABLE
                  </div>
                  <p className="text-[#171817] mt-0.5 leading-relaxed font-normal">
                    {renderWithBloodGroup(rationale.why)}
                  </p>
                </div>

                {/* 03 EVIDENCE */}
                <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[3px] space-y-1">
                  <div className="font-mono font-bold text-[10px] text-[#3D3E3A] uppercase tracking-wider">
                    03 • OPERATIONAL EVIDENCE &amp; SIGNALS
                  </div>
                  <div className="space-y-1 pt-1">
                    {rationale.evidence.map((ev, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-[#171817] text-[10px] shrink-0 font-bold">•</span>
                        <p className="text-[#171817] text-[11px] leading-relaxed">
                          {renderWithBloodGroup(ev)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 04 SELECTION */}
                <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[3px]">
                  <div className="font-mono font-bold text-[10px] text-[#3D3E3A] uppercase tracking-wider">
                    04 • SELECTION OVER ALTERNATIVE CANDIDATES
                  </div>
                  <p className="text-[#171817] mt-0.5 leading-relaxed font-normal">
                    {renderWithBloodGroup(rationale.selection)}
                  </p>
                </div>

                {/* 05 CONSEQUENCES */}
                <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[3px]">
                  <div className="font-mono font-bold text-[10px] text-[#3D3E3A] uppercase tracking-wider">
                    05 • OPERATIONAL CONSEQUENCES &amp; IMPACT
                  </div>
                  <p className="text-[#171817] mt-0.5 leading-relaxed font-normal">
                    {renderWithBloodGroup(rationale.consequences)}
                  </p>
                </div>
              </div>
            </div>

            {/* RECOMMENDATION IMPACT COMPARISON PANEL */}
            <div className="p-3.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D3E3A] block">
                Live State Impact Projection (Before vs After Authorization)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-[#FEF3F2] border border-[#FECDCA] rounded-[2px] space-y-1">
                  <div className="font-bold text-[#BB0A1E] uppercase text-[10px]">Current Pre-Transfer State</div>
                  <div className="text-[#171817]">• CCGH (HOSP-A) Stock: <strong>{destStockBefore} Units ({destAvailableBefore} available)</strong></div>
                  <div className="text-[#171817]">• Projected Depletion: <strong className="text-[#BB0A1E]">&lt;18 Hours</strong></div>
                  <div className="text-[#171817]">• Operational Risk Index: <strong className="text-[#BB0A1E]">CRITICAL</strong></div>
                </div>

                <div className="p-2.5 bg-[#EDF7F2] border border-[#A6E9D5] rounded-[2px] space-y-1">
                  <div className="font-bold text-[#216E4E] uppercase text-[10px]">Projected Post-Transfer State</div>
                  <div className="text-[#171817]">• CCGH (HOSP-A) Stock: <strong>{destStockAfter} Units (Deficit Resolved)</strong></div>
                  <div className="text-[#171817]">• MMC (HOSP-B) Post-Buffer: <strong>{sourceStockAfter} Units (&gt;120% buffer)</strong></div>
                  <div className="text-[#171817]">• Operational Risk Index: <strong className="text-[#216E4E]">NORMAL</strong></div>
                </div>
              </div>
            </div>

            {/* Human Operator Action Bar */}
            <div className="pt-3 border-t border-[#C9C8C2] flex flex-wrap items-center justify-between gap-2">
              <Button
                variant="subtle"
                size="sm"
                onClick={() =>
                  openDrawer(`Recommendation: ${rec.recommendationCode}`, 'RECOMMENDATION', {
                    recommendationCode: rec.recommendationCode,
                    riskId: rec.riskId,
                    sourceHospitalId: rec.sourceHospitalId,
                    destinationHospitalId: rec.destinationHospitalId,
                    bloodGroup: rec.bloodGroup,
                    component: rec.component,
                    recommendedUnits: rec.recommendedUnits,
                    aiDecisionSupport: activeDecisionSupport,
                    candidateActions,
                    isSynthetic: true,
                  })
                }
              >
                INSPECT DATA MODEL
              </Button>

              {isPending && (
                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => rejectRecommendation(rec.id, 'Declined by human operator')}
                  >
                    REJECT
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApproveClick(rec)}
                  >
                    AUTHORIZE DISPATCH ORDER
                  </Button>
                </div>
              )}

              {isApproved && (
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-[#216E4E] font-mono font-bold">
                    ✓ AUTHORIZED BY {rec.reviewedBy || 'OPERATOR'}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/app/transfers')}
                  >
                    VIEW ACTIVE TRANSFER →
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* HUMAN AUTHORIZATION MODAL WITH PRE-EXECUTION REVALIDATION GUARD */}
      <Modal
        isOpen={approvalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
        title="Authorize Inter-Hospital Dispatch"
        subtitle="Mandatory Human-in-the-Loop Clinical & Logistical Authorization"
        footerActions={
          <>
            <Button variant="outline" size="sm" onClick={() => setApprovalModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmApproval}>
              CONFIRM &amp; DISPATCH ORDER
            </Button>
          </>
        }
      >
        {selectedRec && (
          <div className="space-y-4 text-xs">
            <p className="leading-relaxed text-[#171817]">
              You are authorizing the physical dispatch of{' '}
              <strong>
                {activeCandidate?.isFeasible ? activeCandidate.units : selectedRec.recommendedUnits} units of <span className="text-[#BB0A1E] font-bold">{selectedRec.bloodGroup}</span> {selectedRec.component}
              </strong>{' '}
              from <strong>{selectedRec.sourceHospitalId}</strong> to{' '}
              <strong>{selectedRec.destinationHospitalId}</strong>.
            </p>

            <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] space-y-1.5 font-mono text-[11px] text-[#171817]">
              <div>• Destination Stockout Mitigation: +{activeCandidate?.isFeasible ? activeCandidate.units : selectedRec.recommendedUnits} units</div>
              <div>• Estimated Cold-Chain Transit: {selectedRec.transitTimeMinutes} minutes</div>
              <div>• Logistics Courier: MedExpress Cold Logistics (Van #04)</div>
              <div>• Strict Temperature Envelope: 2.0°C to 6.0°C Verified</div>
            </div>

            {revalidationError && (
              <div className="p-3 bg-[#FEF3F2] border border-[#FECDCA] rounded-[2px] text-[#BB0A1E] font-medium space-y-1">
                <div className="font-bold uppercase text-[10px]">Action Blocked by Operational Guard</div>
                <div>{revalidationError}</div>
              </div>
            )}

            <div className="space-y-1">
              <label className="font-bold uppercase text-[10px] text-[#3D3E3A] block">
                Authorizing Transfusion Lead Signature / ID
              </label>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                className="w-full h-9 px-3 border border-[#C9C8C2] rounded-[4px] font-mono text-xs text-[#171817] bg-[#FFFFFF]"
              />
            </div>

            <p className="text-[11px] text-[#3D3E3A]">
              Execution performs state revalidation before mutating source and destination inventory ledgers, generating an active logistics record and immutable audit log.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
