import {
  BloodComponent,
  BloodGroup,
  DemandDataPoint,
  DemandMetrics,
  HospitalId,
  ScenarioId,
  BloodRequest,
} from '../types';

/**
 * Calculates dynamic demand metrics and 24h/48h consumption projections
 * consuming 7-day demand history, pending request pressure, and scenario modifiers.
 */
export function calculateDemandMetrics(
  hospitalId: HospitalId,
  bloodGroup: BloodGroup,
  component: BloodComponent,
  demandHistory: DemandDataPoint[],
  activeRequests: BloodRequest[],
  scenario: ScenarioId
): DemandMetrics {
  // Filter relevant history
  const relevantHistory = demandHistory.filter(
    (d) =>
      d.hospitalId === hospitalId &&
      d.bloodGroup === bloodGroup &&
      d.component === component
  );

  const totalHistoricalUnits = relevantHistory.reduce(
    (sum, d) => sum + d.unitsRequested,
    0
  );
  const sampleCount = Math.max(1, relevantHistory.length);
  const baselineHourlyDemand = Number((totalHistoricalUnits / sampleCount).toFixed(2));

  // Determine scenario-based surge multiplier
  let surgeMultiplier = 1.0;
  if (scenario === 'emergency_surge') {
    if (hospitalId === 'HOSP-A' && bloodGroup === 'O-' && component === 'PRBC') {
      surgeMultiplier = 2.8; // Primary red-zone MVA trauma surge!
    } else if (hospitalId === 'HOSP-A') {
      surgeMultiplier = 1.5;
    } else {
      surgeMultiplier = 1.2;
    }
  } else if (scenario === 'supply_disruption') {
    surgeMultiplier = hospitalId === 'HOSP-A' ? 1.4 : 1.1;
  } else if (scenario === 'expiry_cluster') {
    surgeMultiplier = 1.1;
  }

  // Calculate pending request pressure (unallocated units on active requests)
  const pendingRequests = activeRequests.filter(
    (r) =>
      r.hospitalId === hospitalId &&
      r.bloodGroup === bloodGroup &&
      r.component === component &&
      r.status !== 'FULFILLED' &&
      r.status !== 'CANCELLED'
  );

  const pendingRequestPressureUnits = pendingRequests.reduce(
    (sum, r) => sum + (r.unitsRequested - r.unitsAllocated),
    0
  );

  // Recent demand trend & acceleration
  const recentHistory = relevantHistory.slice(-3);
  const recentAvg =
    recentHistory.reduce((sum, d) => sum + d.unitsRequested, 0) /
    Math.max(1, recentHistory.length);
  const accelerationFactor = Number(
    (recentAvg / Math.max(0.1, baselineHourlyDemand)).toFixed(2)
  );

  let recentTrend: 'ACCELERATING' | 'STABLE' | 'DECELERATING' = 'STABLE';
  if (accelerationFactor > 1.2 || surgeMultiplier > 1.5) {
    recentTrend = 'ACCELERATING';
  } else if (accelerationFactor < 0.8) {
    recentTrend = 'DECELERATING';
  }

  // Projected 24h & 48h demand
  const effectiveHourlyRate = baselineHourlyDemand * surgeMultiplier;
  const projected24hDemand = Math.round(
    effectiveHourlyRate * 24 + pendingRequestPressureUnits * 0.8
  );
  const projected48hDemand = Math.round(
    effectiveHourlyRate * 48 + pendingRequestPressureUnits
  );

  // 24-hour hourly distribution pattern
  const hourlyPattern = Array.from({ length: 24 }, (_, hour) => {
    // Peak daytime surge (08:00 to 18:00)
    const isPeak = hour >= 8 && hour <= 18;
    const factor = isPeak ? 1.4 : 0.6;
    return Number((effectiveHourlyRate * factor).toFixed(2));
  });

  return {
    hospitalId,
    bloodGroup,
    component,
    baselineHourlyDemand,
    recentTrend,
    hourlyPattern,
    surgeMultiplier,
    accelerationFactor,
    pendingRequestPressureUnits,
    projected24hDemand: Math.max(1, projected24hDemand),
    projected48hDemand: Math.max(2, projected48hDemand),
  };
}
