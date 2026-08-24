import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../../config/appConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EAE9E4] border-t border-[#C9C8C2] px-6 py-4 text-xs text-[#3D3E3A]">
      <div className="max-w-7xl mx-auto space-y-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-mono font-bold text-[#171817] uppercase tracking-wider">
              {APP_CONFIG.name} — {APP_CONFIG.productCategory}
            </span>
            <span className="hidden sm:inline text-[#C9C8C2]">|</span>
            <span className="text-[11px] text-[#3D3E3A] font-medium">
              Demonstration Prototype • 100% Synthetic Operational Data
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <Link
              to="/privacy"
              className="text-[#3D3E3A] hover:text-[#171817] underline decoration-[#C9C8C2] underline-offset-2"
            >
              Privacy &amp; Synthetic Data Notice
            </Link>
            <Link
              to="/terms"
              className="text-[#3D3E3A] hover:text-[#171817] underline decoration-[#C9C8C2] underline-offset-2"
            >
              Demonstration Terms
            </Link>
          </div>
        </div>

        <div className="text-[10px] text-[#5D5E5A] leading-normal pt-1 border-t border-[#C9C8C2]/60">
          <strong className="text-[#171817]">LEGAL &amp; CLINICAL DISCLAIMER:</strong> TRANSFUSE is a technical proof-of-concept prototype for hackathon demonstration. It is not a certified medical device and does not diagnose patients or make autonomous clinical decisions. AI-generated recommendations serve strictly as decision-support explanations. All physical allocations and inter-facility dispatches mandate human clinician authorization.
        </div>
      </div>
    </footer>
  );
};
