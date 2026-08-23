import React from 'react';
import { APP_CONFIG } from '../../config/appConfig';
import { useAppStore } from '../../store/useAppStore';
import { Badge } from '../ui';

export const DemoBanner: React.FC = () => {
  const {
    aiEngineStatus,
    aiSimulateFailure,
    setAiSimulateFailure,
    aiTelemetry,
    simulatedTimestamp,
    openScenarioComparison,
    openAiDiagnostics,
  } = useAppStore();

  return (
    <div className="w-full bg-[#171817] text-[#FFFFFF] text-[11px] font-mono py-1 px-4 flex flex-wrap items-center justify-between border-b border-[#171817] select-none gap-2">
      {/* Left: Environment & Clock */}
      <div className="flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A15C00]" />
        <span className="font-bold tracking-wider">{APP_CONFIG.environment}</span>
        <span className="text-[#9C9A91] hidden sm:inline">•</span>
        <span className="text-[#EAE9E4] font-bold">
          CLOCK: {simulatedTimestamp.slice(0, 10)} {simulatedTimestamp.slice(11, 16)} IST
        </span>
        <span className="text-[#9C9A91] hidden md:inline">•</span>
        <button
          onClick={openScenarioComparison}
          className="text-[#FFFFFF] underline hover:text-[#C9C8C2] text-[10px] hidden md:inline"
        >
          SCENARIO MATRIX ↗
        </button>
      </div>

      {/* Right: AI Engine Status & Failure Toggle */}
      <div className="flex items-center gap-3 text-[10px]">
        {/* AI Engine Status Badge */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#9C9A91]">AI ENGINE:</span>
          <button
            onClick={openAiDiagnostics}
            className="hover:opacity-80 transition-opacity focus:outline-none"
            title="Inspect AI Engine Diagnostics & Telemetry"
          >
            <Badge
              variant={
                aiEngineStatus === 'GEMINI_LIVE'
                  ? 'success'
                  : aiEngineStatus === 'GEMINI_ANALYZING'
                  ? 'info'
                  : aiEngineStatus === 'GEMINI_RATE_LIMITED'
                  ? 'warning'
                  : 'outline'
              }
              size="sm"
              isMono
            >
              {aiEngineStatus === 'GEMINI_LIVE'
                ? 'GEMINI 3.7 FLASH'
                : aiEngineStatus === 'GEMINI_ANALYZING'
                ? 'ANALYZING...'
                : aiEngineStatus === 'GEMINI_RATE_LIMITED'
                ? 'AI RATE LIMITED'
                : 'DETERMINISTIC FALLBACK'}
            </Badge>
          </button>
        </div>

        {/* AI Usage Budget */}
        <button
          onClick={openAiDiagnostics}
          className="hidden lg:flex items-center gap-1 text-[#9C9A91] hover:text-[#FFFFFF] transition-colors"
          title="Inspect AI Quotas & Performance"
        >
          <span>BUDGET:</span>
          <span className="text-[#FFFFFF] font-bold">
            {aiTelemetry.dailyBudgetUsed}/{aiTelemetry.dailyBudgetLimit}
          </span>
        </button>

        {/* Demo Failure Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-[#2E302E] px-2 py-0.5 rounded-[2px]">
          <span className="text-[#9C9A91] text-[9px]">CONNECTIVITY:</span>
          <button
            onClick={() => setAiSimulateFailure(!aiSimulateFailure)}
            className={`text-[9px] font-bold px-1 rounded-[1px] transition-colors ${
              aiSimulateFailure
                ? 'bg-[#BB0A1E] text-[#FFFFFF]'
                : 'bg-[#216E4E] text-[#FFFFFF]'
            }`}
            title="Toggle simulated AI API connectivity failure for demonstration"
          >
            {aiSimulateFailure ? 'FAIL MODE' : 'LIVE'}
          </button>
        </div>
      </div>
    </div>
  );
};
