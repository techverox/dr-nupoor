/**
 * Smart In-Memory Cache and Circuit Breaker for Firestore Reads
 *
 * Benefits:
 * 1. Prevents exceeding Firebase Spark plan limits (50k daily free tier reads).
 * 2. Ultra-fast sub-millisecond response for repeat server hits.
 * 3. Instant cache invalidation on Admin mutations for 100% real-time accuracy.
 * 4. Circuit Breaker: when RESOURCE_EXHAUSTED (Code 8) occurs, pauses queries
 *    for 3 minutes to prevent high latency and console spam, serving seed fallbacks safely.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Global persistent cache map across Turbopack / HMR reloads
const globalForCache = globalThis as unknown as {
  __DIGIVIGEE_FIRESTORE_CACHE__?: Map<string, CacheEntry<unknown>>;
  __DIGIVIGEE_QUOTA_COOLDOWN__?: number;
};

const memoryCache =
  globalForCache.__DIGIVIGEE_FIRESTORE_CACHE__ || new Map<string, CacheEntry<unknown>>();

if (!globalForCache.__DIGIVIGEE_FIRESTORE_CACHE__) {
  globalForCache.__DIGIVIGEE_FIRESTORE_CACHE__ = memoryCache;
}

let quotaCooldownUntil = globalForCache.__DIGIVIGEE_QUOTA_COOLDOWN__ || 0;
const QUOTA_COOLDOWN_MS = 3 * 60 * 1000; // 3 minutes cooldown

export function isFirestoreQuotaExhausted(): boolean {
  if (quotaCooldownUntil === 0) return false;
  if (Date.now() > quotaCooldownUntil) {
    quotaCooldownUntil = 0;
    globalForCache.__DIGIVIGEE_QUOTA_COOLDOWN__ = 0;
    return false;
  }
  return true;
}

export function tripFirestoreQuotaBreaker(error?: unknown): void {
  const errStr = String(error || "");
  const errObj = error as { code?: number | string; message?: string; details?: string };
  const isExhausted =
    errObj?.code === 8 ||
    errObj?.code === "8" ||
    errStr.includes("RESOURCE_EXHAUSTED") ||
    errStr.includes("Quota exceeded") ||
    errObj?.message?.includes("Quota exceeded") ||
    errObj?.details?.includes("Quota exceeded");

  if (isExhausted) {
    const now = Date.now();
    if (quotaCooldownUntil === 0 || now > quotaCooldownUntil) {
      quotaCooldownUntil = now + QUOTA_COOLDOWN_MS;
      globalForCache.__DIGIVIGEE_QUOTA_COOLDOWN__ = quotaCooldownUntil;
      console.warn(
        `[Firestore CircuitBreaker] ⚠️ Free Tier daily quota reached (Code 8). Circuit open for 3m. Gracefully serving cached/seed data with 0ms downtime.`
      );
    }
  }
}

/**
 * Safely executes a Firestore read with caching and circuit breaking.
 */
export async function cachedFirestoreRead<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  const now = Date.now();
  const cached = memoryCache.get(key) as CacheEntry<T> | undefined;

  // 1. Return valid cache if within TTL
  if (cached && now - cached.timestamp < cached.ttl) {
    return cached.data;
  }

  // 2. If circuit breaker is active, avoid hitting Firestore and return cached or fallback immediately
  if (isFirestoreQuotaExhausted()) {
    return cached ? cached.data : fallback();
  }

  // 3. Fetch from Firestore with timeout protection
  try {
    let timeoutId: NodeJS.Timeout | undefined;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error(`Firestore timeout for key: ${key}`)), 2500);
    });

    const data = await Promise.race([
      fetcher().finally(() => {
        if (timeoutId) clearTimeout(timeoutId);
      }),
      timeoutPromise,
    ]);

    memoryCache.set(key, {
      data,
      timestamp: now,
      ttl: ttlMs,
    });
    return data;
  } catch (error) {
    tripFirestoreQuotaBreaker(error);
    if (cached) {
      return cached.data;
    }
    return fallback();
  }
}

/**
 * Manually invalidates cached entries matching a prefix or clears all if omitted.
 */
export function invalidateFirestoreCache(keyPrefixOrPattern?: string): void {
  if (!keyPrefixOrPattern) {
    memoryCache.clear();
    return;
  }
  for (const key of memoryCache.keys()) {
    if (key.startsWith(keyPrefixOrPattern) || key.includes(keyPrefixOrPattern)) {
      memoryCache.delete(key);
    }
  }
}
