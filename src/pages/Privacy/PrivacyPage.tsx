import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col font-sans">
      <header className="w-full bg-[#FFFFFF] border-b border-[#C9C8C2] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-sm font-bold uppercase tracking-wider text-[#171817]">
            ← BACK TO RAKTKOSH PROTOTYPE
          </Link>
          <span className="text-xs font-mono text-[#3D3E3A]">DEMO PRIVACY NOTICE</span>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
        <div className="bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#C9C8C2] pb-4">
            <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] tracking-widest block">
              Compliance &amp; Governance
            </span>
            <h1 className="text-2xl font-bold uppercase tracking-wider text-[#171817] mt-1">
              Privacy &amp; Synthetic Data Policy
            </h1>
            <p className="text-xs font-mono text-[#3D3E3A] mt-1">
              Effective Date: August 2026 • Prototype Phase 1
            </p>
          </div>

          <div className="space-y-4 text-xs text-[#171817] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase text-[#171817]">
                1. 100% Synthetic Data Boundary
              </h2>
              <p>
                The RAKTKOSH application is an offline technical demonstration prototype. All hospital names, physician identifiers, transfusion orders, patient blood group statistics, and cold-chain sensor streams displayed in this application are completely artificial and synthetically generated.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase text-[#171817]">
                2. No Collection of Real Patient Information
              </h2>
              <p>
                This prototype does NOT connect to real electronic health records (EHR), hospital information systems (HIS), or external clinical databases. It does not collect, process, store, or transmit Protected Health Information (PHI) or Personally Identifiable Information (PII).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase text-[#171817]">
                3. Local Simulation Runtime
              </h2>
              <p>
                All decision support logic, inventory calculations, demand forecasts, and transfer simulations execute locally within the browser client. No operational data is transmitted to external servers.
              </p>
            </section>
          </div>

          <div className="pt-4 border-t border-[#C9C8C2] flex justify-end">
            <Link to="/app">
              <Button variant="primary" size="sm">
                RETURN TO DEMO DASHBOARD
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
