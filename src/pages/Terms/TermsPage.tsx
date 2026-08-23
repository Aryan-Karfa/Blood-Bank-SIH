import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col font-sans">
      <header className="w-full bg-[#FFFFFF] border-b border-[#C9C8C2] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-sm font-bold uppercase tracking-wider text-[#171817]">
            ← BACK TO RAKTKOSH PROTOTYPE
          </Link>
          <span className="text-xs font-mono text-[#3D3E3A]">DEMO TERMS OF USE</span>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full">
        <div className="bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#C9C8C2] pb-4">
            <span className="text-[10px] font-mono uppercase font-bold text-[#3D3E3A] tracking-widest block">
              Legal &amp; Regulatory Status
            </span>
            <h1 className="text-2xl font-bold uppercase tracking-wider text-[#171817] mt-1">
              Demonstration Prototype Terms of Use
            </h1>
            <p className="text-xs font-mono text-[#3D3E3A] mt-1">
              Scope: Hackathon Evaluation &amp; Technical Architecture Demonstration
            </p>
          </div>

          <div className="space-y-4 text-xs text-[#171817] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase text-[#171817]">
                1. Demonstration Purpose Only
              </h2>
              <p>
                RAKTKOSH is a concept prototype created strictly for technical demonstration, architectural review, and feasibility evaluation in the context of Smart India Hackathon 2026.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase text-[#BB0A1E]">
                2. Non-Clinical / Non-Diagnostic System
              </h2>
              <p>
                This software is NOT a certified medical device and must NOT be used for real-time patient diagnosis, blood cross-matching, clinical transfusion authorization, or real-world dispatch of emergency medical resources.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase text-[#171817]">
                3. Temporary Product Codename
              </h2>
              <p>
                The name &quot;RAKTKOSH&quot; is used exclusively as an internal engineering codename for prototype demonstration. The official production product name, trademark, and organizational governance remain TBD.
              </p>
            </section>
          </div>

          <div className="pt-4 border-t border-[#C9C8C2] flex justify-end">
            <Link to="/app">
              <Button variant="primary" size="sm">
                ACCEPT &amp; ENTER WORKSPACE
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
