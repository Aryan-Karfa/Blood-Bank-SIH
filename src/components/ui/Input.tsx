import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isMono?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, isMono = false, className = '', id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1 w-full text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-[#3D3E3A]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            'h-9 px-3 text-sm bg-[#FFFFFF] border border-[#C9C8C2] text-[#171817] rounded-[4px] placeholder:text-[#5D5E5A]',
            'focus:outline-none focus:border-[#171817] focus:ring-1 focus:ring-[#171817]',
            'disabled:bg-[#EAE9E4] disabled:text-[#5D5E5A] disabled:cursor-not-allowed',
            error && 'border-[#BB0A1E] focus:border-[#BB0A1E] focus:ring-[#BB0A1E]',
            isMono && 'font-mono text-xs',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-[#BB0A1E] font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-[#3D3E3A]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
