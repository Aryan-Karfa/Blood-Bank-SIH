import React from 'react';
import { Modal, Badge, Button } from '../ui';
import { ScenarioId } from '../../types';
import { useAppStore } from '../../store/useAppStore';

export interface ScenarioComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScenarioComparisonModal: React.FC<ScenarioComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { activeScenario, setScenario } = useAppStore();

  const scenarios: Array<{
    id: ScenarioId;
    name: string;
    description: string;
    riskSeverity: string;
    demandSurgeMultiplier: string;
    stockCoverage: string;
    depletionHorizon: string;
    recommendedMitigation: string;
  }> = [
    {
      id: 'normal',
      name: 'Normal Operating Conditions',
      description: 'Standard baseline municipal demand with fully balanced inter-facility buffer.',
      riskSeverity: 'NORMAL / WATCH',
      demandSurgeMultiplier: '1.0x Baseline',
      stockCoverage: '>48 Hours across all groups',
      depletionHorizon: 'Stable (>48h)',
      recommendedMitigation: 'Routine daily apheresis & FEFO inventory rotation',
    },
    {
      id: 'emergency_surge',
      name: 'Trauma Emergency Surge (Hero)',
      description: 'Multiple polytrauma MVA admissions at Central City General Hospital (CCGH).',
      riskSeverity: 'CRITICAL',
      demandSurgeMultiplier: '2.8x (O- PRBC)',
      stockCoverage: '<18 Hours at CCGH (1 unit unreserved)',
      depletionHorizon: '18 Hours to zero stockout',
      recommendedMitigation: 'Transfer 20 units O- PRBC from Metropolitan Medical (MMC)',
    },
    {
      id: 'supply_disruption',
      name: 'Transit Corridor Congestion / Disruption',
      description: 'Arterial bridge route congestion and temporary donation intake slowdown.',
      riskSeverity: 'HIGH',
      demandSurgeMultiplier: '1.4x Redirection Demand',
      stockCoverage: '~24 Hours safety window',
      depletionHorizon: '24-30 Hours',
      recommendedMitigation: 'Local elective surgical reserve reallocation + secondary corridor dispatch',
    },
    {
      id: 'expiry_cluster',
      name: 'Batch Expiry Cluster (<48h)',
      description: '4 units of O- PRBC and platelets approaching 35-day shelf life at MMC.',
      riskSeverity: 'MODERATE (Expiry Risk)',
      demandSurgeMultiplier: '1.1x',
      stockCoverage: 'Sufficient, but wastage risk elevated',
      depletionHorizon: '48 Hours to expiration',
      recommendedMitigation: 'Proactive FEFO inter-facility transfer to high-turnover apex trauma center',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulation Scenario Matrix Comparison"
      subtitle="Deterministic Behavioral Comparison Across Network Disruption & Demand Profiles"
      footerActions={
        <Button variant="outline" size="sm" onClick={onClose}>
          CLOSE COMPARISON
        </Button>
      }
    >
      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scenarios.map((sc) => {
            const isActive = activeScenario === sc.id;
            return (
              <div
                key={sc.id}
                className={`p-4 border rounded-[4px] space-y-2.5 transition-colors ${
                  isActive
                    ? 'border-2 border-[#171817] bg-[#F4F3EF]'
                    : 'border-[#C9C8C2] bg-[#FFFFFF]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#171817]">
                      {sc.name}
                    </h4>
                    <p className="text-[11px] text-[#3D3E3A] mt-0.5">{sc.description}</p>
                  </div>
                  {isActive && (
                    <Badge variant="success" size="sm" isMono>
                      ACTIVE
                    </Badge>
                  )}
                </div>

                <div className="space-y-1 pt-2 border-t border-[#C9C8C2]/60 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#3D3E3A]">Risk Severity:</span>
                    <strong className="text-[#171817]">{sc.riskSeverity}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3D3E3A]">Surge Multiplier:</span>
                    <strong className="text-[#171817]">{sc.demandSurgeMultiplier}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3D3E3A]">Depletion Horizon:</span>
                    <strong className="text-[#BB0A1E]">{sc.depletionHorizon}</strong>
                  </div>
                  <div className="pt-1 text-[10px] text-[#3D3E3A] font-sans">
                    Strategy: <strong className="text-[#171817]">{sc.recommendedMitigation}</strong>
                  </div>
                </div>

                {!isActive && (
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        setScenario(sc.id);
                        onClose();
                      }}
                      className="text-[10px]"
                    >
                      SWITCH TO THIS SCENARIO
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
