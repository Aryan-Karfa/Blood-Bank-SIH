import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { SectionHeader, Badge, Button, Metric } from '../../components/ui';
import { RiskIndicator } from '../../components/operational';
import { selectHospitalRisks } from '../../data/selectors';

export const RisksPage: React.FC = () => {
  const navigate = useNavigate();
  const { risks, activeHospitalId, openDrawer, runAiDecisionSupport } = useAppStore();

  const filteredRisks = selectHospitalRisks(risks, activeHospitalId);
  const criticalCount = filteredRisks.filter((r) => r.level === 'CRITICAL' && r.status === 'ACTIVE').length;
  const highCount = filteredRisks.filter((r) => r.level === 'HIGH' && r.status === 'ACTIVE').length;
  const resolvedCount = filteredRisks.filter((r) => r.status === 'RESOLVED').length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Emerging Shortage &amp; Risk Intelligence Matrix"
        subtitle="Dynamic state-driven detection of localized deficits, near-expiry clusters, and network capacity constraints"
        badge={
          <Badge variant={criticalCount > 0 ? 'critical' : 'success'} isMono>
            {criticalCount} CRITICAL • {resolvedCount} RESOLVED
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={async () => {
                await runAiDecisionSupport(filteredRisks[0]?.id);
                navigate('/app/recommendations');
              }}
            >
              ⚡ AI MITIGATION ANALYSIS
            </Button>
            <Button variant="secondary" size="sm" onClick={() => navigate('/app/recommendations')}>
              VIEW RECOMMENDATIONS
            </Button>
          </div>
        }
      />

      {/* RISK SUMMARY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Metric
          label="Critical Depletion Threats"
          value={criticalCount}
          subtext="Immediate action required (<24h)"
          highlight={criticalCount > 0 ? 'critical' : 'none'}
        />
        <Metric
          label="Elevated Risk Channels"
          value={highCount}
          subtext="Action required within 48h"
          highlight={highCount > 0 ? 'warning' : 'none'}
        />
        <Metric
          label="Near-Expiry Lots (<48h)"
          value="04"
          unit="Units"
          subtext="MMC (HOSP-B) LOT-SYN-201"
          highlight="warning"
        />
        <Metric
          label="Network Alternative Coverage"
          value="100%"
          subtext="All deficits mitigable via inter-node transit"
          highlight="success"
        />
      </div>

      {/* ACTIVE RISK CARDS */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <RiskIndicator
            key={risk.id}
            risk={risk}
            onReview={() =>
              openDrawer(`Risk Condition: ${risk.riskCode}`, 'RISK', {
                riskCode: risk.riskCode,
                level: risk.level,
                type: risk.type,
                hospitalId: risk.hospitalId,
                bloodGroup: risk.bloodGroup,
                component: risk.component,
                currentStock: risk.currentStock,
                currentAvailable: risk.currentAvailable,
                projectedDemand: risk.projectedDemand,
                projectedDeficit: risk.projectedDeficit,
                rootCause: risk.rootCause,
                affectedRequests: risk.affectedRequests,
                recommendedAction: risk.recommendedAction,
                networkAlternativeAvailable: risk.networkAlternativeAvailable,
                alternativeSourceHospitalId: risk.alternativeSourceHospitalId,
                potentialUnitsAvailable: risk.potentialUnitsAvailable,
                status: risk.status,
                detectedAt: risk.detectedAt,
                isSynthetic: risk.isSynthetic,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
