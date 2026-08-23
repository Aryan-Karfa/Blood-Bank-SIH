export interface AiConfiguration {
  model: string;
  timeoutMs: number;
  maxRetries: number;
  cacheTtlMs: number;
  rateLimit: {
    perMinute: number;
    perHour: number;
    perDay: number;
  };
  cooldownMs: number;
  fallbackEnabled: boolean;
  contextLimits: {
    hospitals: number;
    inventory: number;
    requests: number;
    candidates: number;
    demandPoints: number;
  };
}

// Safe environment variable accessor for Vite
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env || {};

export const AI_CONFIG: AiConfiguration = {
  model: env.VITE_GEMINI_MODEL || 'gemini-3.7-flash',
  timeoutMs: Number(env.VITE_AI_TIMEOUT_MS) || 10000,
  maxRetries: 1,
  cacheTtlMs: Number(env.VITE_AI_CACHE_TTL_MS) || 300000, // 5 minutes
  rateLimit: {
    perMinute: Number(env.VITE_AI_RATE_LIMIT_PER_MINUTE) || 10,
    perHour: Number(env.VITE_AI_RATE_LIMIT_PER_HOUR) || 30,
    perDay: Number(env.VITE_AI_RATE_LIMIT_PER_DAY) || 100,
  },
  cooldownMs: 30000, // 30 seconds
  fallbackEnabled: true,
  contextLimits: {
    hospitals: 5,
    inventory: 20,
    requests: 20,
    candidates: 10,
    demandPoints: 48,
  },
};
