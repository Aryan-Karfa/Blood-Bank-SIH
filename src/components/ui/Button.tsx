import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'critical' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors border select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#171817] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 rounded-[2px] h-7 gap-1.5',
    md: 'text-xs px-3.5 py-1.5 rounded-[4px] h-9 gap-2 uppercase tracking-wide',
    lg: 'text-sm px-4 py-2.5 rounded-[4px] h-11 gap-2.5 uppercase tracking-wide',
  };

  const variantStyles = {
    primary:
      'bg-[#171817] text-[#FFFFFF] border-[#171817] hover:bg-[#2E302E] active:bg-[#000000]',
    secondary:
      'bg-[#EAE9E4] text-[#171817] border-[#C9C8C2] hover:bg-[#DDDCD7] hover:border-[#9C9A91]',
    outline:
      'bg-transparent text-[#171817] border-[#C9C8C2] hover:bg-[#EAE9E4] hover:border-[#9C9A91]',
    subtle:
      'bg-transparent text-[#3D3E3A] border-transparent hover:bg-[#EAE9E4] hover:text-[#171817]',
    critical:
      'bg-[#BB0A1E] text-[#FFFFFF] border-[#BB0A1E] hover:bg-[#960818] active:bg-[#70150E]',
    warning:
      'bg-[#A15C00] text-[#FFFFFF] border-[#A15C00] hover:bg-[#824A00]',
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
