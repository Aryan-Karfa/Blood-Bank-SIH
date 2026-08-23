import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Badge } from '../../components/ui';
import { APP_CONFIG } from '../../config/appConfig';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#171817] flex flex-col font-sans">
      {/* Top Prototype Indicator */}
      <div className="w-full bg-[#171817] text-[#FFFFFF] text-[11px] font-mono py-1 px-4 flex items-center justify-between border-b border-[#171817]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A15C00]" />
          <span>{APP_CONFIG.environment} — TECHNICAL DEMONSTRATION PROTOTYPE</span>
        </div>
        <span className="text-[#C9C8C2] text-[10px] hidden sm:inline">SYNTHETIC DATA ONLY</span>
      </div>

      {/* Header */}
      <header className="w-full bg-[#FFFFFF] border-b border-[#C9C8C2] px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[4px] bg-[#171817] flex items-center justify-center font-mono font-bold text-xs text-[#FFFFFF]">
              RK
            </div>
            <div>
              <div className="flex items-center gap-2 leading-none">
                <span className="font-bold text-base tracking-wider uppercase text-[#BB0A1E]">
                  {APP_CONFIG.name}
                </span>
                <span className="text-[10px] font-mono bg-[#EAE9E4] text-[#3D3E3A] px-1.5 py-0.5 rounded-[2px] font-semibold">
                  PROTOTYPE
                </span>
              </div>
              <span className="text-xs text-[#3D3E3A] hidden sm:block tracking-tight mt-0.5">
                Regional Blood Network Decision Support System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="text-xs font-semibold uppercase tracking-wider text-[#3D3E3A] hover:text-[#171817] hidden md:inline"
            >
              Direct App Entry
            </Link>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/app')}
            >
              ENTER DEMO
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 px-6 border-b border-[#C9C8C2] bg-[#FFFFFF]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px]">
              <span className="w-2 h-2 rounded-full bg-[#BB0A1E]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171817]">
                Kolkata Regional Blood Network Demonstration
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#171817] leading-tight font-sans">
              Smart Blood-Bank Inventory &amp; Demand Intelligence
            </h1>

            <p className="text-base sm:text-lg text-[#171817] leading-relaxed max-w-2xl mx-auto font-normal">
              A regional network-level prototype for monitoring blood inventory, anticipating transfusion demand, identifying emerging shortages, and evaluating coordinated inter-hospital transfers.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/app')}
                className="w-full sm:w-auto px-8"
              >
                ENTER DEMO PLATFORM
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('operational-preview');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                VIEW LIVE ARCHITECTURE
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 03: LIVE OPERATIONAL PREVIEW */}
        <section id="operational-preview" className="py-12 md:py-16 px-6 border-b border-[#C9C8C2] bg-[#F4F3EF]">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#C9C8C2] pb-3 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] tracking-widest block">
                  Simulated Operating Snapshot
                </span>
                <h2 className="text-xl font-bold uppercase tracking-wider text-[#171817]">
                  Multi-Facility Network State
                </h2>
              </div>
              <Badge variant="outline" isMono>
                LIVE SYNTHETIC MATRIX
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Facility A Card */}
              <div className="p-4 bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#3D3E3A]">HOSP-A</span>
                    <h3 className="text-sm font-bold text-[#171817]">Central City General</h3>
                    <p className="text-[11px] text-[#3D3E3A]">Government Trauma Center</p>
                  </div>
                  <Badge variant="critical">CRITICAL RISK</Badge>
                </div>
                <div className="p-2.5 bg-[#FEF3F2] border border-[#FECDCA] rounded-[2px] text-xs space-y-1">
                  <div className="flex justify-between font-mono">
                    <span className="text-[#171817]"><span className="text-[#BB0A1E] font-bold">O-</span> PRBC Available:</span>
                    <strong className="text-[#BB0A1E]">4 Units</strong>
                  </div>
                  <div className="flex justify-between font-mono text-[11px] text-[#3D3E3A]">
                    <span>Safety Buffer:</span>
                    <span className="text-[#171817] font-semibold">15 Units</span>
                  </div>
                  <div className="text-[10px] text-[#BB0A1E] font-semibold mt-1">
                    • Projected depletion in 18h under trauma surge
                  </div>
                </div>
              </div>

              {/* Facility B Card */}
              <div className="p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#3D3E3A]">HOSP-B</span>
                    <h3 className="text-sm font-bold text-[#171817]">Metropolitan Medical</h3>
                    <p className="text-[11px] text-[#3D3E3A]">Multi-Specialty Private</p>
                  </div>
                  <Badge variant="success">SURPLUS BUFFER</Badge>
                </div>
                <div className="p-2.5 bg-[#EDF7EE] border border-[#B7DFB9] rounded-[2px] text-xs space-y-1">
                  <div className="flex justify-between font-mono">
                    <span className="text-[#171817]"><span className="text-[#BB0A1E] font-bold">O-</span> PRBC Available:</span>
                    <strong className="text-[#216E4E]">38 Units</strong>
                  </div>
                  <div className="flex justify-between font-mono text-[11px] text-[#3D3E3A]">
                    <span>Safety Buffer:</span>
                    <span className="text-[#171817] font-semibold">15 Units</span>
                  </div>
                  <div className="text-[10px] text-[#216E4E] font-semibold mt-1">
                    • 4 units nearing 48h shelf-life (Redistribution Candidate)
                  </div>
                </div>
              </div>

              {/* Recommended Action Card */}
              <div className="p-4 bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-bold text-[#3D3E3A]">DECISION SUPPORT</span>
                    <Badge variant="info">TRANSFER MATCH</Badge>
                  </div>
                  <h3 className="text-sm font-bold text-[#171817] mt-1">
                    Transfer 20 × <span className="text-[#BB0A1E] font-bold">O-</span> PRBC
                  </h3>
                  <div className="text-xs font-mono mt-1 text-[#3D3E3A]">
                    HOSP-B (MMC) → HOSP-A (CCGH)
                  </div>
                  <p className="text-[11px] text-[#3D3E3A] mt-2 leading-relaxed font-normal">
                    Eliminates stockout at Hospital A while maintaining 120% buffer at Hospital B. Transit: 12.4 km (~35m).
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => navigate('/app/recommendations')}
                >
                  REVIEW IN DEMO
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: OPERATIONAL PROBLEM */}
        <section className="py-12 md:py-16 px-6 border-b border-[#C9C8C2] bg-[#FFFFFF]">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] tracking-widest block">
                The Operational Problem
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#171817] mt-1">
                Fragmented Blood Inventory &amp; Emergency Blind Spots
              </h2>
              <p className="text-sm text-[#3D3E3A] mt-1 max-w-2xl">
                Blood banks routinely operate in isolated silos, making regional demand balancing slow, opaque, and prone to simultaneous shortage and wastage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[4px] space-y-2">
                <span className="font-mono text-xs font-bold text-[#BB0A1E] block">01 / ISOLATED INVENTORY</span>
                <h3 className="text-sm font-bold text-[#171817] uppercase">Lack of Regional Visibility</h3>
                <p className="text-xs text-[#3D3E3A] leading-relaxed">
                  Hospital blood banks have zero real-time visibility into neighboring stock. When trauma emergencies strike, staff must resort to manual telephone trees.
                </p>
              </div>

              <div className="p-5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[4px] space-y-2">
                <span className="font-mono text-xs font-bold text-[#BB0A1E] block">02 / UNANTICIPATED SURGES</span>
                <h3 className="text-sm font-bold text-[#171817] uppercase">Reactive Stock Management</h3>
                <p className="text-xs text-[#3D3E3A] leading-relaxed">
                  Transfusion demands are managed reactively as bags are consumed, leaving no lead time to coordinate cold-chain transit before zero-inventory events.
                </p>
              </div>

              <div className="p-5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[4px] space-y-2">
                <span className="font-mono text-xs font-bold text-[#A15C00] block">03 / EXPIRY WASTAGE</span>
                <h3 className="text-sm font-bold text-[#171817] uppercase">Uncoordinated Shelf-Life Aging</h3>
                <p className="text-xs text-[#3D3E3A] leading-relaxed">
                  Units with limited shelf life (especially platelets and near-term red cells) expire unused in low-volume centers while high-volume trauma hospitals face deficits.
                </p>
              </div>

              <div className="p-5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[4px] space-y-2">
                <span className="font-mono text-xs font-bold text-[#245B73] block">04 / LOGISTICS FRICTION</span>
                <h3 className="text-sm font-bold text-[#171817] uppercase">Unverified Transfer Governance</h3>
                <p className="text-xs text-[#3D3E3A] leading-relaxed">
                  Inter-facility transfers lack automated chain-of-custody verification, temperature data logging, and auditable algorithmic impact rationales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: NETWORK COORDINATION MODEL */}
        <section className="py-12 md:py-16 px-6 border-b border-[#C9C8C2] bg-[#F4F3EF]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="border-b border-[#C9C8C2] pb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] tracking-widest block">
                The Network Architecture
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#171817] mt-1">
                Regional Multi-Node Coordination Model
              </h2>
            </div>

            <div className="p-6 bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px]">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] block">Layer 1</span>
                  <h4 className="text-sm font-bold text-[#171817] uppercase mt-1">Node Inventory Feeds</h4>
                  <p className="text-xs text-[#3D3E3A] mt-1">
                    Continuous monitoring of PRBC, FFP, Platelets, and Cryo with safety buffers.
                  </p>
                </div>

                <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px]">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] block">Layer 2</span>
                  <h4 className="text-sm font-bold text-[#171817] uppercase mt-1">Predictive Trajectory</h4>
                  <p className="text-xs text-[#3D3E3A] mt-1">
                    24h/48h demand projections anticipating stockouts hours before they occur.
                  </p>
                </div>

                <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px]">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] block">Layer 3</span>
                  <h4 className="text-sm font-bold text-[#171817] uppercase mt-1">Human-in-the-Loop Actions</h4>
                  <p className="text-xs text-[#3D3E3A] mt-1">
                    Transfusion officers evaluate, approve, modify, or reject recommended transfers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 06: INTELLIGENCE LIFECYCLE */}
        <section className="py-12 md:py-16 px-6 border-b border-[#C9C8C2] bg-[#FFFFFF]">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="border-b border-[#C9C8C2] pb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] tracking-widest block">
                System Workflow
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-wider text-[#171817] mt-1">
                The 5-Step Intelligence Lifecycle
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs">
              <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] space-y-1">
                <span className="text-[10px] text-[#3D3E3A] font-bold">STEP 01</span>
                <h4 className="font-bold text-[#171817] uppercase">MONITOR</h4>
                <p className="text-[11px] text-[#3D3E3A] font-sans">
                  Real-time stock and transfusion orders across nodes.
                </p>
              </div>

              <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] space-y-1">
                <span className="text-[10px] text-[#3D3E3A] font-bold">STEP 02</span>
                <h4 className="font-bold text-[#171817] uppercase">FORECAST</h4>
                <p className="text-[11px] text-[#3D3E3A] font-sans">
                  Project demand curves and depletion timelines.
                </p>
              </div>

              <div className="p-3 bg-[#FEF3F2] border border-[#FECDCA] rounded-[2px] space-y-1">
                <span className="text-[10px] text-[#BB0A1E] font-bold">STEP 03</span>
                <h4 className="font-bold text-[#BB0A1E] uppercase">DETECT RISK</h4>
                <p className="text-[11px] text-[#171817] font-sans font-medium">
                  Flag shortages and near-expiry risk clusters.
                </p>
              </div>

              <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] space-y-1">
                <span className="text-[10px] text-[#3D3E3A] font-bold">STEP 04</span>
                <h4 className="font-bold text-[#171817] uppercase">RECOMMEND</h4>
                <p className="text-[11px] text-[#3D3E3A] font-sans">
                  Generate optimal inter-facility transfer matches.
                </p>
              </div>

              <div className="p-3 bg-[#EDF7EE] border border-[#B7DFB9] rounded-[2px] space-y-1">
                <span className="text-[10px] text-[#216E4E] font-bold">STEP 05</span>
                <h4 className="font-bold text-[#216E4E] uppercase">HUMAN APPROVE</h4>
                <p className="text-[11px] text-[#171817] font-sans font-medium">
                  Officer authorizes dispatch with audit trail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 07: PROTOTYPE SCOPE & SYNTHETIC DATA NOTICE */}
        <section className="py-12 md:py-16 px-6 bg-[#F4F3EF]">
          <div className="max-w-4xl mx-auto p-6 bg-[#FFFFFF] border-2 border-[#171817] rounded-[4px] space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A15C00]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#171817]">
                Demonstration Scope &amp; Synthetic Boundary
              </h3>
            </div>

            <p className="text-xs text-[#3D3E3A] leading-relaxed">
              This application is an engineering demonstration prototype developed for evaluation. All hospital entities (Central City General Hospital and Metropolitan Medical Centre), transfusion records, inventory figures, and transfer telemetry are synthetically simulated.
            </p>

            <div className="p-3 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[2px] text-xs font-mono text-[#3D3E3A] space-y-1">
              <div>• Environment: Offline Local Simulation (Deterministic Mode)</div>
              <div>• Patient Records: 0 (No Real Medical Data Utilized)</div>
              <div>• Clinical Status: Non-Diagnostic / Operational Decision Support Model</div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="md" onClick={() => navigate('/app')}>
                ENTER DEMONSTRATION WORKSPACE
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#EAE9E4] border-t border-[#C9C8C2] px-6 py-4 text-xs text-[#3D3E3A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-[#BB0A1E]">RAKTKOSH DEMO</span>
            <span>•</span>
            <span className="text-[11px] text-[#171817]">Smart Blood-Bank Inventory &amp; Demand Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium">
            <Link to="/privacy" className="hover:text-[#171817] underline decoration-[#C9C8C2]">
              Privacy Notice
            </Link>
            <Link to="/terms" className="hover:text-[#171817] underline decoration-[#C9C8C2]">
              Demonstration Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
