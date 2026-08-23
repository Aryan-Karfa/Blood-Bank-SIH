import React from 'react';
import { cn } from '../../lib/utils';

export interface DataRowProps {
  label: string;
  value: React.ReactNode;
  isMono?: boolean;
  className?: string;
}

export const DataRow: React.FC<DataRowProps> = ({
  label,
  value,
  isMono = false,
  className = '',
}) => {
  return (
    <div className={cn('flex items-baseline justify-between py-1.5 border-b border-[#C9C8C2]/60 text-xs', className)}>
      <span className="text-[#3D3E3A] uppercase tracking-wider font-semibold">{label}</span>
      <span className={cn('text-[#171817] text-right', isMono && 'font-mono')}>{value}</span>
    </div>
  );
};
