import React from 'react';
import { ComponentForecast } from '../../types';
import { Badge } from '../ui';
import { cn } from '../../lib/utils';

export interface ForecastSummaryProps {
  forecast: ComponentForecast;
  className?: string;
}

export const ForecastSummary: React.FC<ForecastSummaryProps> = ({
  forecast,
  className = '',
}) => {
  const isShortageProjected = forecast.hoursUntilDepletion !== null && forecast.hoursUntilDepletion <= 24;

  return (
    <div className={cn('p-4 bg-[#FFFFFF] border border-[#C9C8C2] rounded-[4px] space-y-4', className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-[#BB0A1E]">{forecast.bloodGroup}</span>
            <span className="text-xs font-semibold text-[#171817]">{forecast.component}</span>
            <Badge variant="outline" size="sm">
              {forecast.hospitalId}
            </Badge>
          </div>
          <p className="text-xs text-[#3D3E3A] mt-0.5">24h / 48h Algorithmic Demand Trajectory</p>
        </div>

        {isShortageProjected ? (
          <Badge variant="critical">
            Depletion in {forecast.hoursUntilDepletion}h
          </Badge>
        ) : (
          <Badge variant="success">Trajectory Stable</Badge>
        )}
      </div>

      {/* Numerical Forecast Metrics */}
      <div className="grid grid-cols-3 gap-2 bg-[#F4F3EF] p-2.5 border border-[#C9C8C2] rounded-[2px] text-xs">
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">Current Stock</span>
          <span className="font-mono font-bold text-sm text-[#171817]">{forecast.currentStock} Units</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">24h Demand</span>
          <span className="font-mono font-bold text-sm text-[#BB0A1E]">{forecast.projected24hDemand} Units</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#3D3E3A] block">48h Demand</span>
          <span className="font-mono font-bold text-sm text-[#171817]">{forecast.projected48hDemand} Units</span>
        </div>
      </div>

      {/* Trajectory Timeline Table */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D3E3A] block mb-1.5">
          Hourly Trajectory Points
        </span>
        <div className="border border-[#C9C8C2] rounded-[2px] overflow-hidden text-xs">
          <div className="grid grid-cols-4 bg-[#EAE9E4] px-2.5 py-1 font-bold text-[10px] uppercase tracking-wider text-[#171817]">
            <span>Time</span>
            <span className="text-center">Demand</span>
            <span className="text-center">Est. Stock</span>
            <span className="text-right">Risk Index</span>
          </div>
          <div className="divide-y divide-[#C9C8C2]">
            {forecast.trajectory.map((pt, idx) => (
              <div key={idx} className="grid grid-cols-4 px-2.5 py-1.5 font-mono text-[11px] items-center">
                <span className="text-[#171817] font-semibold">+{pt.hourOffset}h</span>
                <span className="text-center text-[#3D3E3A]">{pt.projectedDemandUnits} u</span>
                <span
                  className={cn(
                    'text-center font-bold',
                    pt.projectedStockUnits <= 0
                      ? 'text-[#BB0A1E]'
                      : pt.projectedStockUnits < pt.safetyThreshold
                      ? 'text-[#A15C00]'
                      : 'text-[#216E4E]'
                  )}
                >
                  {pt.projectedStockUnits} u
                </span>
                <span className="text-right font-sans">
                  {pt.isShortageRisk ? (
                    <span className="text-[#BB0A1E] text-[10px] font-bold uppercase">Critical</span>
                  ) : (
                    <span className="text-[#216E4E] text-[10px] font-bold uppercase">Stable</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
