import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SectionHeader, Badge, Button, Metric } from '../../components/ui';
import { ForecastSummary } from '../../components/operational';

export const ForecastPage: React.FC = () => {
  const { forecasts, activeHospitalId, openDrawer } = useAppStore();

  const filteredForecasts =
    activeHospitalId === 'ALL'
      ? forecasts
      : forecasts.filter((f) => f.hospitalId === activeHospitalId);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="24h / 48h Predictive Demand Intelligence"
        subtitle="Algorithmic demand projections, historical consumption regression, and stock depletion trajectory"
        badge={<Badge variant="outline">DETERMINISTIC MODEL v0.2</Badge>}
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              openDrawer('Forecasting Model Specification', 'INFO', {
                modelFramework: 'Multi-Variable Exponential Smoothing + Surge Factor',
                temporalResolution: 'Hourly (T+0 to T+48)',
                confidenceInterval: '95% Standard Normal (High / Medium / Low Bands)',
                inputSources:
                  'Emergency Ward Triage, Scheduled Surgical Bookings, Historical Hourly Influx',
                isSynthetic: true,
              })
            }
          >
            MODEL PARAMETERS
          </Button>
        }
      />

      {/* FORECAST METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Metric
          label="Projected 24h Regional Consumption"
          value="42"
          unit="Total Units"
          subtext="O- and Platelets represent 68% of demand pressure"
        />
        <Metric
          label="High-Risk Depletion Horizons"
          value="01"
          unit="Trajectory Event"
          subtext="CCGH O- PRBC breaches zero buffer at +18h"
          highlight="critical"
          statusBadge={<Badge variant="critical">CRITICAL</Badge>}
        />
        <Metric
          label="Surplus Redistribution Capacity"
          value="32"
          unit="Transferable Units"
          subtext="MMC reserves able to cover regional deficits without local risk"
          highlight="success"
          statusBadge={<Badge variant="success">AVAILABLE</Badge>}
        />
      </div>

      {/* FORECAST SUMMARIES */}
      <div className="space-y-6">
        {filteredForecasts.map((forecast) => (
          <ForecastSummary key={forecast.id} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};
