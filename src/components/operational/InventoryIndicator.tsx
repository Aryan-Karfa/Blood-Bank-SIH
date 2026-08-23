import React from 'react';
import { InventoryItem } from '../../types';
import { Badge, StatusDot } from '../ui';
import { cn } from '../../lib/utils';

export interface InventoryIndicatorProps {
  item: InventoryItem;
  onClick?: () => void;
  className?: string;
}

export const InventoryIndicator: React.FC<InventoryIndicatorProps> = ({
  item,
  onClick,
  className = '',
}) => {
  const percentOfThreshold = Math.min(
    Math.round((item.availableUnits / Math.max(1, item.minimumThreshold)) * 100),
    200
  );

  const isLow = item.availableUnits < item.minimumThreshold;
  const isCritical = item.status === 'CRITICAL' || item.availableUnits <= Math.floor(item.minimumThreshold * 0.3);

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-3.5 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] flex flex-col justify-between hover:border-[#9C9A91] transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-base font-bold text-[#BB0A1E]">{item.bloodGroup}</span>
            <span className="text-xs font-semibold text-[#171817]">{item.component}</span>
          </div>
          <span className="text-[10px] font-mono uppercase text-[#3D3E3A] block mt-0.5">
            {item.hospitalId}
          </span>
        </div>

        <StatusDot status={item.status} size="sm" />
      </div>

      {/* Stock Bar */}
      <div className="mt-3">
        <div className="flex justify-between items-baseline text-xs mb-1">
          <span className="font-mono font-bold text-sm text-[#171817]">
            {item.availableUnits}{' '}
            <span className="text-[10px] text-[#3D3E3A] font-normal font-sans">Available</span>
          </span>
          <span className="text-[10px] font-mono text-[#3D3E3A]">
            Total: {item.totalUnits} | Min: {item.minimumThreshold}
          </span>
        </div>

        <div className="w-full h-2 bg-[#EAE9E4] rounded-[2px] overflow-hidden flex">
          <div
            className={cn(
              'h-full transition-all duration-300',
              isCritical
                ? 'bg-[#BB0A1E]'
                : isLow
                ? 'bg-[#A15C00]'
                : 'bg-[#216E4E]'
            )}
            style={{ width: `${Math.min(percentOfThreshold, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-[#C9C8C2]/60 flex items-center justify-between text-[10px] text-[#3D3E3A]">
        <span>
          Reserved: <strong className="text-[#171817] font-mono">{item.reservedUnits}</strong>
        </span>
        {item.nearExpiryUnits > 0 ? (
          <Badge variant="warning" size="sm">
            {item.nearExpiryUnits} near-expiry
          </Badge>
        ) : (
          <span>Expiry: Stable</span>
        )}
      </div>
    </div>
  );
};
