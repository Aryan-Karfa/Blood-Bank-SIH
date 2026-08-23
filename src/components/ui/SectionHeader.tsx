import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
  className = '',
}) => {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#C9C8C2] gap-2', className)}>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#171817]">{title}</h2>
          {badge}
        </div>
        {subtitle && <p className="text-xs text-[#3D3E3A] mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
};
