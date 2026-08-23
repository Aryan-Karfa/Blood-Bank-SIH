import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footerActions,
  maxWidth = 'md',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171817]/60"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={cn(
          'w-full bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] overflow-hidden flex flex-col',
          maxWidthClasses[maxWidth]
        )}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#C9C8C2] bg-[#F4F3EF] flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-[#171817]">{title}</h2>
            {subtitle && <p className="text-xs text-[#5D5E5A] mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-[#5D5E5A] hover:text-[#171817] p-1 text-sm font-mono border border-transparent hover:border-[#C9C8C2] rounded-[2px]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[70vh] text-sm text-[#171817]">{children}</div>

        {/* Footer */}
        {footerActions && (
          <div className="px-5 py-3 border-t border-[#C9C8C2] bg-[#F4F3EF] flex items-center justify-end gap-3">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
};
