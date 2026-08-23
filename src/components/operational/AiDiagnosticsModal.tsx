import React from 'react';
import { Modal, Badge, Button } from '../ui';
import { getAiTelemetryMetrics } from '../../services/aiGateway';
import { useAppStore } from '../../store/useAppStore';

export interface AiDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiDiagnosticsModal: React.FC<AiDiagnosticsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { aiEngineStatus, activeDecisionSupport } = useAppStore();
  const metrics = getAiTelemetryMetrics();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Engine Diagnostics &amp; Telemetry"
      subtitle="Real-Time Performance, Rate Limiting, and Fallback Telemetry"
      footerActions={
        <Button variant="outline" size="sm" onClick={onClose}>
          CLOSE DIAGNOSTICS
        </Button>
      }
    >
      <div className="space-y-4 text-xs">
        {/* Status Header */}
        <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[3px] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#3D3E3A] block">Current AI Engine</span>
            <span className="font-bold text-[#171817] font-mono text-sm">{metrics.model}</span>
          </div>
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
            {aiEngineStatus}
          </Badge>
        </div>

        {/* Rate Limiting & Quotas Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono">
          <div className="p-2.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[2px]">
            <span className="text-[9px] uppercase text-[#3D3E3A] block">Requests Today</span>
            <span className="font-bold text-sm text-[#171817]">
              {metrics.dailyBudgetUsed} / {metrics.dailyBudgetLimit}
            </span>
          </div>

          <div className="p-2.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[2px]">
            <span className="text-[9px] uppercase text-[#3D3E3A] block">Requests / Hour</span>
            <span className="font-bold text-sm text-[#171817]">
              {metrics.requestsThisHour} / 30
            </span>
          </div>

          <div className="p-2.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[2px]">
            <span className="text-[9px] uppercase text-[#3D3E3A] block">Requests / Minute</span>
            <span className="font-bold text-sm text-[#171817]">
              {metrics.requestsThisMinute} / 10
            </span>
          </div>

          <div className="p-2.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[2px]">
            <span className="text-[9px] uppercase text-[#3D3E3A] block">Cache Hit Rate</span>
            <span className="font-bold text-sm text-[#216E4E]">
              {metrics.cacheHitRate}% ({metrics.cacheHits} hits)
            </span>
          </div>

          <div className="p-2.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[2px]">
            <span className="text-[9px] uppercase text-[#3D3E3A] block">Fallback Rate</span>
            <span className="font-bold text-sm text-[#A15C00]">
              {metrics.fallbackRate}% ({metrics.fallbackInvocations} calls)
            </span>
          </div>

          <div className="p-2.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[2px]">
            <span className="text-[9px] uppercase text-[#3D3E3A] block">Average Latency</span>
            <span className="font-bold text-sm text-[#171817]">
              {metrics.avgLatencyMs} ms
            </span>
          </div>
        </div>

        {/* Multi-Layer Protection Description */}
        <div className="p-3 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[3px] space-y-1.5 text-[11px] text-[#3D3E3A]">
          <div className="font-bold text-[#171817] uppercase text-[10px] tracking-wider">
            Three-Layer Quota &amp; Safety Pipeline
          </div>
          <div>• <strong>Layer 1 (Client Cooldown):</strong> 30-second context deduplication prevents UI double-triggering.</div>
          <div>• <strong>Layer 2 (App Rate Limiter):</strong> Hard caps (10/min, 30/hr, 100/day) protect system stability.</div>
          <div>• <strong>Layer 3 (Deterministic Fallback):</strong> Guaranteed rule-based 5-point explainability during API outage or rate limits.</div>
        </div>

        {activeDecisionSupport?.fingerprint && (
          <div className="text-[10px] font-mono text-[#3D3E3A] truncate">
            Last Context Fingerprint: {activeDecisionSupport.fingerprint}
          </div>
        )}
      </div>
    </Modal>
  );
};
