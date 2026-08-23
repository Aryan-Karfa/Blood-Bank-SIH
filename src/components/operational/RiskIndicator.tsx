import React from 'react';
import { RiskItem } from '../../types';
import { Badge, Button } from '../ui';
import { cn } from '../../lib/utils';

export interface RiskIndicatorProps {
  risk: RiskItem;
  onReview?: () => void;
  className?: string;
}

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  risk,
  onReview,
  className = '',
}) => {
  const isCritical = risk.level === 'CRITICAL';
  const isHigh = risk.level === 'HIGH';

  return (
    <div
      className={cn(
        'p-4 bg-[#FFFFFF] border rounded-[4px] flex flex-col justify-between transition-colors',
        isCritical
          ? 'border-l-4 border-l-[#BB0A1E] border-[#C9C8C2]'
          : isHigh
          ? 'border-l-4 border-l-[#A15C00] border-[#C9C8C2]'
          : 'border-[#C9C8C2]',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#3D3E3A]">{risk.riskCode}</span>
            <Badge variant={isCritical ? 'critical' : isHigh ? 'warning' : 'info'}>
              {risk.level}
            </Badge>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#BB0A1E]">
            {risk.timeToImpact}
          </span>
        </div>

        <h4 className="text-sm font-bold uppercase tracking-wide text-[#171817] mt-2">
          {risk.title.includes('O-') ? (
            <>
              {risk.title.split('O-')[0]}
              <span className="text-[#BB0A1E] font-bold">O-</span>
              {risk.title.split('O-')[1]}
            </>
          ) : (
            risk.title
          )}
        </h4>
        <p className="text-xs text-[#3D3E3A] mt-1 leading-relaxed">{risk.description}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#C9C8C2]/60 space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-[#3D3E3A] uppercase text-[10px] font-semibold tracking-wider">
            Root Cause
          </span>
          <span className="text-[#171817] font-medium text-right max-w-xs truncate">
            {risk.rootCause}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#3D3E3A] uppercase text-[10px] font-semibold tracking-wider">
            Network Alternative
          </span>
          {risk.networkAlternativeAvailable ? (
            <span className="text-[#216E4E] font-medium flex items-center gap-1 font-mono text-[11px]">
              Available ({risk.alternativeSourceHospitalId} • {risk.potentialUnitsAvailable} units)
            </span>
          ) : (
            <span className="text-[#BB0A1E] font-medium text-[11px]">No local alternative</span>
          )}
        </div>
      </div>

      {onReview && (
        <div className="mt-3 pt-2">
          <Button variant="outline" size="sm" fullWidth onClick={onReview}>
            VIEW RISK MITIGATION PATH
          </Button>
        </div>
      )}
    </div>
  );
};
