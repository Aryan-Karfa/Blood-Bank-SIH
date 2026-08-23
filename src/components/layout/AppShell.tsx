import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { DemoBanner } from './DemoBanner';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Drawer, DataRow, Button } from '../ui';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';

export const AppShell: React.FC = () => {
  const { drawerOpen, drawerData, closeDrawer } = useAppStore();

  const mobileNavItems = [
    { path: '/app', label: 'Dashboard' },
    { path: '/app/network', label: 'Network' },
    { path: '/app/inventory', label: 'Inventory' },
    { path: '/app/requests', label: 'Requests' },
    { path: '/app/forecast', label: 'Forecast' },
    { path: '/app/risks', label: 'Risks' },
    { path: '/app/recommendations', label: 'Recommendations' },
    { path: '/app/transfers', label: 'Transfers' },
    { path: '/app/activity', label: 'Activity' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col font-sans text-[#171817]">
      {/* Top Banner */}
      <DemoBanner />

      {/* Main Header */}
      <Header />

      {/* Mobile Nav Bar */}
      <div className="md:hidden bg-[#EAE9E4] border-b border-[#C9C8C2] px-3 py-2 overflow-x-auto flex items-center gap-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/app'}
            className={({ isActive }) =>
              cn(
                'px-2.5 py-1 text-xs font-semibold uppercase tracking-wider whitespace-nowrap rounded-[2px] border',
                isActive
                  ? 'bg-[#171817] text-[#FFFFFF] border-[#171817]'
                  : 'bg-[#FFFFFF] text-[#5D5E5A] border-[#C9C8C2]'
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* App Body */}
      <div className="flex-1 flex w-full">
        <Sidebar />

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Detail Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        title={drawerData?.title || 'Operational Detail'}
        subtitle="Live Synchronized Entity Inspection"
        footerActions={
          <Button variant="secondary" size="sm" onClick={closeDrawer}>
            CLOSE PANEL
          </Button>
        }
      >
        {drawerData?.payload ? (
          <div className="space-y-3">
            <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px]">
              <span className="text-[10px] font-mono uppercase font-bold text-[#5D5E5A] block mb-1">
                Entity Record Attributes
              </span>
              <div className="divide-y divide-[#C9C8C2]/40">
                {Object.entries(drawerData.payload as Record<string, unknown>).map(
                  ([key, val]) => (
                    <DataRow
                      key={key}
                      label={key}
                      value={
                        typeof val === 'object' && val !== null
                          ? JSON.stringify(val)
                          : String(val)
                      }
                      isMono
                    />
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#5D5E5A]">No payload data available.</p>
        )}
      </Drawer>
    </div>
  );
};
