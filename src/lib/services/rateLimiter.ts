/**
 * Dr. Noopur Patel Platform — Centralized In-Memory Sliding Window Rate Limiter
 *
 * Provides high-performance, sliding-window rate limiting for authentication,
 * password resets, public form submissions, media uploads, and general API routes.
 */

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
  retryAfterSeconds: number;
}

// Predefined Rate Limit Profiles
export const RATE_LIMIT_PROFILES = {
  // 5 failed login attempts per 15 minutes per IP/account
  LOGIN_ATTEMPT: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  // 3 password reset requests per 15 minutes
  PASSWORD_RESET: { maxRequests: 3, windowMs: 15 * 60 * 1000 },
  // 5 public form submissions per 2 minutes per IP
  PUBLIC_FORM: { maxRequests: 5, windowMs: 2 * 60 * 1000 },
  // 10 newsletter signups per 5 minutes per IP
  NEWSLETTER: { maxRequests: 10, windowMs: 5 * 60 * 1000 },
  // 25 media uploads per minute per admin
  MEDIA_UPLOAD: { maxRequests: 25, windowMs: 60 * 1000 },
  // 120 general API requests per minute per IP
  GENERAL_API: { maxRequests: 120, windowMs: 60 * 1000 },
} as const;

// In-memory sliding window bucket store: key -> array of timestamp numbers
const rateLimitBuckets = new Map<string, number[]>();

// Auto-cleanup stale entries every 5 minutes to avoid memory leaks
if (typeof setInterval !== "undefined") {
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of rateLimitBuckets.entries()) {
      const active = timestamps.filter((ts) => now - ts < 30 * 60 * 1000);
      if (active.length === 0) {
        rateLimitBuckets.delete(key);
      } else {
        rateLimitBuckets.set(key, active);
      }
    }
  }, 5 * 60 * 1000);

  // Unref interval so it doesn't hold open test runners or node processes
  if (cleanupInterval && typeof cleanupInterval.unref === "function") {
    cleanupInterval.unref();
  }
}

/**
 * Checks and records a request against a sliding-window rate limit.
 *
 * @param key Unique identifier (e.g. `login:192.168.1.1` or `lead_form:user@example.com`)
 * @param config Max requests and window duration in milliseconds
 * @returns Detailed rate limit evaluation result
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const existingTimestamps = rateLimitBuckets.get(key) || [];
  // Filter out timestamps outside the sliding window
  const activeTimestamps = existingTimestamps.filter((ts) => ts > windowStart);

  const isAllowed = activeTimestamps.length < config.maxRequests;
  const oldestTimestamp = activeTimestamps.length > 0 ? activeTimestamps[0] : now;
  const resetTimeMs = oldestTimestamp + config.windowMs;
  const retryAfterSeconds = Math.max(1, Math.ceil((resetTimeMs - now) / 1000));

  if (isAllowed) {
    activeTimestamps.push(now);
    rateLimitBuckets.set(key, activeTimestamps);
    return {
      allowed: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - activeTimestamps.length,
      resetTimeMs,
      retryAfterSeconds: 0,
    };
  }

  // Rate limit exceeded
  return {
    allowed: false,
    limit: config.maxRequests,
    remaining: 0,
    resetTimeMs,
    retryAfterSeconds,
  };
}

/**
 * Resets/clears the rate limit bucket for a specific key (e.g. on successful login).
 */
export function resetRateLimit(key: string): void {
  rateLimitBuckets.delete(key);
}

/**
 * Helper to resolve client IP address accurately from Next.js request headers.
 */
export function resolveClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    if (ips.length > 0 && ips[0]) {
      return ips[0];
    }
  }

  const realIp = headers.get("x-real-ip");
  if (realIp && realIp.trim()) {
    return realIp.trim();
  }

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp && cfConnectingIp.trim()) {
    return cfConnectingIp.trim();
  }

  return "127.0.0.1";
}
