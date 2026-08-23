import React from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={cn('flex items-center gap-1 border-b border-[#C9C8C2]', className)} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-[1px] flex items-center gap-2 cursor-pointer',
              isActive
                ? 'border-[#171817] text-[#171817] bg-[#FFFFFF]'
                : 'border-transparent text-[#5D5E5A] hover:text-[#171817] hover:bg-[#EAE9E4]'
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'px-1.5 py-0.2 text-[10px] font-mono rounded-[2px]',
                  isActive ? 'bg-[#171817] text-[#FFFFFF]' : 'bg-[#EAE9E4] text-[#5D5E5A]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
