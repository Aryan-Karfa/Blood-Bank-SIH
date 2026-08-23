import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui';
import { APP_CONFIG } from '../../config/appConfig';
import { SCENARIOS } from '../../lib/constants';
import { HospitalId, ScenarioId } from '../../types';
import { ScenarioComparisonModal, AiDiagnosticsModal } from '../operational';

export const Header: React.FC = () => {
  const {
    activeHospitalId,
    setHospital,
    activeScenario,
    setScenario,
    resetDemoState,
    toggleSidebar,
    advanceSimulationTime,
    simulationRunning,
    toggleSimulationRunning,
    scenarioComparisonOpen,
    closeScenarioComparison,
    aiDiagnosticsOpen,
    closeAiDiagnostics,
  } = useAppStore();

  // Auto-advance ticker when simulationRunning is true (every 3.5 seconds advances 1 hour)
  useEffect(() => {
    if (!simulationRunning) return;
    const interval = setInterval(() => {
      advanceSimulationTime(1);
    }, 3500);
    return () => clearInterval(interval);
  }, [simulationRunning, advanceSimulationTime]);

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#C9C8C2] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
      {/* Brand & Left Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle navigation sidebar"
          className="md:hidden p-1.5 border border-[#C9C8C2] rounded-[2px] text-[#171817] hover:bg-[#EAE9E4]"
        >
          ☰
        </button>

        <Link to="/" className="flex items-center gap-2.5 focus:outline-none">
          <div className="w-7 h-7 rounded-[4px] bg-[#171817] flex items-center justify-center font-mono font-bold text-xs text-[#FFFFFF]">
            TF
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-sm tracking-wider uppercase text-[#171817]">
                {APP_CONFIG.name}
              </span>
              <span className="text-[9px] font-mono uppercase bg-[#EAE9E4] text-[#3D3E3A] px-1 py-0.5 rounded-[2px] font-semibold">
                DEMO
              </span>
            </div>
            <span className="text-[10px] text-[#3D3E3A] hidden sm:block tracking-tight mt-0.5">
              {APP_CONFIG.networkName}
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Operational Context & Scenario Dropdown */}
      <div className="flex items-center gap-2 text-xs">
        {/* Hospital Switcher */}
        <div className="flex items-center gap-1.5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[4px] px-2.5 py-1">
          <span className="text-[10px] font-bold uppercase text-[#3D3E3A] hidden lg:inline">
            Node:
          </span>
          <select
            value={activeHospitalId}
            onChange={(e) => setHospital(e.target.value as 'ALL' | HospitalId)}
            className="bg-transparent font-semibold font-mono text-xs text-[#171817] focus:outline-none cursor-pointer"
          >
            <option value="ALL">ALL NODES</option>
            <option value="HOSP-A">CCGH (Central City)</option>
            <option value="HOSP-B">MMC (Metropolitan)</option>
          </select>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-1.5 bg-[#F4F3EF] border border-[#C9C8C2] rounded-[4px] px-2.5 py-1">
          <span className="text-[10px] font-bold uppercase text-[#3D3E3A] hidden xl:inline">
            Scenario:
          </span>
          <select
            value={activeScenario}
            onChange={(e) => setScenario(e.target.value as ScenarioId)}
            className="bg-transparent font-medium text-xs text-[#171817] focus:outline-none cursor-pointer"
          >
            {SCENARIOS.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Simulation Clock Controls & Replay */}
      <div className="flex items-center gap-1.5 font-mono text-xs">
        {/* Advance +1h, +6h, +12h, +24h buttons */}
        <div className="flex items-center border border-[#C9C8C2] rounded-[3px] overflow-hidden bg-[#F4F3EF]">
          <button
            onClick={() => advanceSimulationTime(1)}
            className="px-2 py-1 text-[10px] font-bold text-[#171817] hover:bg-[#EAE9E4] border-r border-[#C9C8C2]"
            title="Advance clock by 1 hour"
          >
            +1H
          </button>
          <button
            onClick={() => advanceSimulationTime(6)}
            className="px-2 py-1 text-[10px] font-bold text-[#171817] hover:bg-[#EAE9E4] border-r border-[#C9C8C2]"
            title="Advance clock by 6 hours"
          >
            +6H
          </button>
          <button
            onClick={() => advanceSimulationTime(12)}
            className="px-2 py-1 text-[10px] font-bold text-[#171817] hover:bg-[#EAE9E4] border-r border-[#C9C8C2]"
            title="Advance clock by 12 hours"
          >
            +12H
          </button>
          <button
            onClick={() => advanceSimulationTime(24)}
            className="px-2 py-1 text-[10px] font-bold text-[#171817] hover:bg-[#EAE9E4]"
            title="Advance clock by 24 hours"
          >
            +24H
          </button>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={toggleSimulationRunning}
          className={`px-2.5 py-1 rounded-[3px] font-bold text-[10px] transition-colors ${
            simulationRunning
              ? 'bg-[#BB0A1E] text-[#FFFFFF]'
              : 'bg-[#171817] text-[#FFFFFF] hover:bg-[#2E302E]'
          }`}
          title={simulationRunning ? 'Pause simulation tick' : 'Start automatic simulation playback'}
        >
          {simulationRunning ? '⏸ PAUSE' : '▶ PLAY'}
        </button>

        {/* Reset State Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetDemoState}
          title="Reset simulated environment to baseline T+0"
          className="text-[10px] font-mono ml-1"
        >
          RESET
        </Button>
      </div>

      {/* Scenario Comparison Modal */}
      <ScenarioComparisonModal
        isOpen={scenarioComparisonOpen}
        onClose={closeScenarioComparison}
      />

      {/* AI Telemetry Diagnostics Modal */}
      <AiDiagnosticsModal
        isOpen={aiDiagnosticsOpen}
        onClose={closeAiDiagnostics}
      />
    </header>
  );
};
