import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'critical' | 'warning' | 'success' | 'info' | 'neutral' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  isMono?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  isMono = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-medium border uppercase tracking-wider rounded-[2px] select-none';

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 leading-none',
    md: 'text-[11px] px-2 py-0.5 leading-tight',
  };

  const variantStyles = {
    critical: 'bg-[#FEF3F2] text-[#BB0A1E] border-[#FECDCA]',
    warning: 'bg-[#FFFAEB] text-[#A15C00] border-[#FEDF89]',
    success: 'bg-[#EDF7EE] text-[#216E4E] border-[#B7DFB9]',
    info: 'bg-[#F0F7FA] text-[#245B73] border-[#C2E2EF]',
    neutral: 'bg-[#EAE9E4] text-[#171817] border-[#C9C8C2]',
    outline: 'bg-transparent text-[#3D3E3A] border-[#C9C8C2]',
  };

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        isMono && 'font-mono',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
