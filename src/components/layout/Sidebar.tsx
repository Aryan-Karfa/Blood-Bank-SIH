import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { Badge } from '../ui';

interface NavItem {
  path: string;
  label: string;
  code: string;
  badge?: {
    count: string | number;
    variant: 'critical' | 'warning' | 'info' | 'neutral';
  };
}

const NAV_ITEMS: NavItem[] = [
  { path: '/app', label: 'Dashboard', code: '01' },
  { path: '/app/network', label: 'Network', code: '02' },
  { path: '/app/inventory', label: 'Inventory', code: '03' },
  {
    path: '/app/requests',
    label: 'Requests',
    code: '04',
    badge: { count: 4, variant: 'neutral' },
  },
  { path: '/app/forecast', label: 'Forecast', code: '05' },
  {
    path: '/app/risks',
    label: 'Risks',
    code: '06',
    badge: { count: 1, variant: 'critical' },
  },
  {
    path: '/app/recommendations',
    label: 'Recommendations',
    code: '07',
    badge: { count: 1, variant: 'warning' },
  },
  {
    path: '/app/transfers',
    label: 'Transfers',
    code: '08',
    badge: { count: 1, variant: 'info' },
  },
  { path: '/app/activity', label: 'Activity / Audit', code: '09' },
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed } = useAppStore();

  return (
    <aside
      className={cn(
        'bg-[#FFFFFF] border-r border-[#C9C8C2] flex flex-col justify-between transition-all duration-200 select-none z-20',
        sidebarCollapsed ? 'w-16' : 'w-64',
        'hidden md:flex shrink-0 min-h-[calc(100vh-84px)]'
      )}
    >
      {/* Navigation Links */}
      <div className="py-3 flex flex-col gap-0.5">
        <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3D3E3A]">
          {!sidebarCollapsed ? 'Navigation' : 'NAV'}
        </div>

        <nav className="flex flex-col gap-0.5" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-l-2',
                  isActive
                    ? 'border-[#171817] bg-[#F4F3EF] text-[#171817] font-bold'
                    : 'border-transparent text-[#3D3E3A] hover:text-[#171817] hover:bg-[#F4F3EF]/60'
                )
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] text-[#5D5E5A] font-semibold">{item.code}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </div>

              {!sidebarCollapsed && item.badge && (
                <Badge variant={item.badge.variant} size="sm" isMono>
                  {item.badge.count}
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-[#C9C8C2] bg-[#F4F3EF] space-y-2 text-[11px] text-[#3D3E3A]">
          <div className="flex justify-between items-center">
            <span className="font-bold uppercase tracking-wider text-[10px]">Data Stream</span>
            <span className="font-mono text-[#216E4E] font-bold text-[10px]">SYNCHRONIZED</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold uppercase tracking-wider text-[10px]">Audit Status</span>
            <span className="font-mono text-[#171817] font-bold text-[10px]">VERIFIED (HASH-OK)</span>
          </div>
        </div>
      )}
    </aside>
  );
};
