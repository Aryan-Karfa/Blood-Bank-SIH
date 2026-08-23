import React from 'react';
import { cn } from '../../lib/utils';

export interface MetricProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  statusBadge?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    text: string;
  };
  className?: string;
  highlight?: 'critical' | 'warning' | 'success' | 'info' | 'none';
}

export const Metric: React.FC<MetricProps> = ({
  label,
  value,
  unit,
  subtext,
  statusBadge,
  trend,
  className = '',
  highlight = 'none',
}) => {
  const highlightBorders = {
    none: 'border-[#C9C8C2]',
    critical: 'border-l-4 border-l-[#BB0A1E] border-[#C9C8C2]',
    warning: 'border-l-4 border-l-[#A15C00] border-[#C9C8C2]',
    success: 'border-l-4 border-l-[#216E4E] border-[#C9C8C2]',
    info: 'border-l-4 border-l-[#245B73] border-[#C9C8C2]',
  };

  return (
    <div
      className={cn(
        'p-3.5 bg-[#FFFFFF] border rounded-[4px] flex flex-col justify-between',
        highlightBorders[highlight],
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3D3E3A]">{label}</span>
        {statusBadge}
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold font-mono text-[#171817] leading-none">{value}</span>
        {unit && <span className="text-xs text-[#3D3E3A] font-medium">{unit}</span>}
      </div>

      {(subtext || trend) && (
        <div className="mt-2 pt-2 border-t border-[#C9C8C2]/60 flex items-center justify-between text-[11px] text-[#3D3E3A]">
          {subtext && <span>{subtext}</span>}
          {trend && (
            <span
              className={cn(
                'font-mono font-medium',
                trend.direction === 'up' && 'text-[#BB0A1E]',
                trend.direction === 'down' && 'text-[#216E4E]',
                trend.direction === 'neutral' && 'text-[#3D3E3A]'
              )}
            >
              {trend.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
