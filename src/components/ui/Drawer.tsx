import React, { useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: 'md' | 'lg' | 'xl';
  footerActions?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'md',
  footerActions,
}) => {
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

  const widthClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#171817]/40 transition-opacity"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          'w-full bg-[#FFFFFF] border-l-2 border-[#171817] flex flex-col h-full',
          widthClasses[width]
        )}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#C9C8C2] bg-[#F4F3EF] flex items-start justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#5D5E5A] mb-0.5">
              Detail Inspection Panel
            </div>
            <h2 className="text-base font-bold uppercase tracking-wider text-[#171817]">{title}</h2>
            {subtitle && <p className="text-xs text-[#5D5E5A] mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="text-[#5D5E5A] hover:text-[#171817] p-1.5 text-sm font-mono border border-[#C9C8C2] hover:bg-[#EAE9E4] rounded-[2px] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-sm">{children}</div>

        {/* Drawer Footer */}
        {footerActions && (
          <div className="px-5 py-3 border-t border-[#C9C8C2] bg-[#F4F3EF] flex items-center justify-end gap-3">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
};
