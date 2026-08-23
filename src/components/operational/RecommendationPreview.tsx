import React from 'react';
import { Recommendation } from '../../types';
import { Badge, Button } from '../ui';
import { cn } from '../../lib/utils';

export interface RecommendationPreviewProps {
  recommendation: Recommendation;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  className?: string;
}

export const RecommendationPreview: React.FC<RecommendationPreviewProps> = ({
  recommendation,
  onApprove,
  onReject,
  onViewDetails,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'p-4 bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] flex flex-col justify-between',
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#3D3E3A]">
                {recommendation.recommendationCode}
              </span>
              <Badge variant="critical" size="sm">
                HIGH PRIORITY ACTION
              </Badge>
            </div>
            <h3 className="text-base font-bold text-[#171817] mt-1.5">
              Transfer {recommendation.recommendedUnits} × <span className="text-[#BB0A1E] font-bold">{recommendation.bloodGroup}</span> {recommendation.component}
            </h3>
          </div>

          <Badge variant="outline" isMono>
            ETA {recommendation.transitTimeMinutes}m
          </Badge>
        </div>

        {/* Transfer Route Box */}
        <div className="mt-3 p-2.5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#3D3E3A] block">Source Facility</span>
            <span className="font-bold text-[#171817] font-mono">{recommendation.sourceHospitalId}</span>
            <p className="text-[11px] text-[#3D3E3A] mt-0.5">Surplus node capacity verified.</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#BB0A1E] block">Destination Facility</span>
            <span className="font-bold text-[#171817] font-mono">{recommendation.destinationHospitalId}</span>
            <p className="text-[11px] text-[#3D3E3A] mt-0.5">Projected deficit mitigation destination.</p>
          </div>
        </div>

        {/* Operational Rationale */}
        <div className="mt-3 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D3E3A]">
            Decision-Support Rationale
          </span>
          <p className="text-xs text-[#171817] leading-relaxed bg-[#FFFFFF] border-l-2 border-l-[#171817] pl-2.5 py-1 font-medium">
            {recommendation.reason}
          </p>
        </div>

        {/* Expected Risk Reduction */}
        <div className="mt-3 pt-2 border-t border-[#C9C8C2]/60 flex items-center justify-between text-xs">
          <span className="text-[10px] uppercase font-semibold text-[#3D3E3A]">Risk Reduction Index</span>
          <div className="flex items-center gap-1.5 font-mono font-bold text-[11px]">
            <span className="text-[#BB0A1E]">{recommendation.beforeRiskLevel}</span>
            <span className="text-[#3D3E3A] font-sans font-normal">→</span>
            <span className="text-[#216E4E]">{recommendation.afterRiskLevel}</span>
          </div>
        </div>
      </div>

      {/* Human Operator Action Bar */}
      <div className="mt-4 pt-3 border-t border-[#C9C8C2] flex flex-wrap items-center justify-between gap-2">
        {onViewDetails && (
          <Button variant="subtle" size="sm" onClick={() => onViewDetails(recommendation.id)}>
            Inspect Data Model
          </Button>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {onReject && (
            <Button variant="outline" size="sm" onClick={() => onReject(recommendation.id)}>
              Reject
            </Button>
          )}
          {onApprove && (
            <Button variant="primary" size="sm" onClick={() => onApprove(recommendation.id)}>
              Approve Dispatch
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
