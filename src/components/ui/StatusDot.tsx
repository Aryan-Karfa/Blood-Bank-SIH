import React from 'react';
import { cn } from '../../lib/utils';

export type StatusType =
  | 'CRITICAL'
  | 'WARNING'
  | 'HIGH'
  | 'MODERATE'
  | 'NORMAL'
  | 'ADEQUATE'
  | 'LOW'
  | 'SURPLUS'
  | 'PENDING'
  | 'APPROVED'
  | 'IN_TRANSIT'
  | 'FULFILLED'
  | 'REJECTED'
  | 'OPERATIONAL'
  | 'ELEVATED_DEMAND'
  | 'OFFLINE';

export interface StatusDotProps {
  status: StatusType | string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  label,
  className = '',
  size = 'md',
}) => {
  const normalized = status.toUpperCase();

  const getDotColor = (s: string) => {
    switch (s) {
      case 'CRITICAL':
      case 'HIGH':
      case 'OFFLINE':
      case 'REJECTED':
        return 'bg-[#BB0A1E]';
      case 'WARNING':
      case 'MODERATE':
      case 'LOW':
      case 'ELEVATED_DEMAND':
      case 'PENDING':
        return 'bg-[#A15C00]';
      case 'NORMAL':
      case 'ADEQUATE':
      case 'SURPLUS':
      case 'SUCCESS':
      case 'OPERATIONAL':
      case 'APPROVED':
      case 'FULFILLED':
        return 'bg-[#216E4E]';
      case 'IN_TRANSIT':
      case 'INFO':
      case 'ALLOCATED':
        return 'bg-[#245B73]';
      default:
        return 'bg-[#5D5E5A]';
    }
  };

  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <span className={cn('inline-flex items-center gap-1.5 font-medium tracking-wider text-xs', className)}>
      <span className={cn('rounded-full shrink-0', dotSize, getDotColor(normalized))} aria-hidden="true" />
      <span>{label || status}</span>
    </span>
  );
};
