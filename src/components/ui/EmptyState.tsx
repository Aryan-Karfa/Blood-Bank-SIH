import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'p-8 text-center bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] flex flex-col items-center justify-center max-w-md mx-auto my-6',
        className
      )}
    >
      <div className="w-8 h-8 rounded-[2px] bg-[#EAE9E4] border border-[#C9C8C2] flex items-center justify-center text-xs font-mono font-bold text-[#5D5E5A] mb-3">
        Ø
      </div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-[#171817]">{title}</h3>
      <p className="text-xs text-[#5D5E5A] mt-1.5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
