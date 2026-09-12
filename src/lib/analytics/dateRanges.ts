import { AnalyticsTimeframe } from "@/types/analytics";

export interface ResolvedDateRange {
  timeframe: AnalyticsTimeframe;
  currentPeriod: {
    start: Date;
    end: Date;
    startIso: string;
    endIso: string;
    label: string;
  };
  comparisonPeriod: {
    start: Date;
    end: Date;
    startIso: string;
    endIso: string;
    label: string;
  };
  durationDays: number;
}

export interface MetricComparison {
  current: number;
  previous: number;
  difference: number;
  percentageChange: number | null;
  trend: "up" | "down" | "neutral";
  isPositive: boolean;
  formattedChange: string;
}

/**
 * Formats a date for human-readable range displays (e.g. "Feb 1, 2026").
 */
export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Resolves any timeframe preset or custom range into exact current and comparison period boundaries.
 */
export function resolveDateRange(
  timeframe: AnalyticsTimeframe = "30d",
  customStartDate?: string,
  customEndDate?: string
): ResolvedDateRange {
  const now = new Date();

  let curStart: Date;
  let curEnd: Date;
  let compStart: Date;
  let compEnd: Date;

  switch (timeframe) {
    case "today": {
      curStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      curEnd = new Date(now);
      compStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0, 0);
      compEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
      break;
    }
    case "yesterday": {
      curStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0, 0);
      curEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
      compStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 0, 0, 0, 0);
      compEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 23, 59, 59, 999);
      break;
    }
    case "7d": {
      curEnd = new Date(now);
      curStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      compEnd = new Date(curStart.getTime() - 1);
      compStart = new Date(compEnd.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    }
    case "30d": {
      curEnd = new Date(now);
      curStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      compEnd = new Date(curStart.getTime() - 1);
      compStart = new Date(compEnd.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    }
    case "90d": {
      curEnd = new Date(now);
      curStart = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      compEnd = new Date(curStart.getTime() - 1);
      compStart = new Date(compEnd.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    }
    case "this_month": {
      curStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      curEnd = new Date(now);
      const daysPassed = Math.max(1, Math.ceil((curEnd.getTime() - curStart.getTime()) / (24 * 60 * 60 * 1000)));
      compStart = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
      compEnd = new Date(compStart.getTime() + daysPassed * 24 * 60 * 60 * 1000);
      break;
    }
    case "previous_month": {
      curStart = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
      curEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      compStart = new Date(now.getFullYear(), now.getMonth() - 2, 1, 0, 0, 0, 0);
      compEnd = new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999);
      break;
    }
    case "custom": {
      if (customStartDate && customEndDate) {
        const parsedStart = new Date(customStartDate);
        const parsedEnd = new Date(customEndDate);
        if (!isNaN(parsedStart.getTime()) && !isNaN(parsedEnd.getTime()) && parsedStart <= parsedEnd) {
          curStart = new Date(parsedStart.getFullYear(), parsedStart.getMonth(), parsedStart.getDate(), 0, 0, 0, 0);
          curEnd = new Date(parsedEnd.getFullYear(), parsedEnd.getMonth(), parsedEnd.getDate(), 23, 59, 59, 999);
          const duration = curEnd.getTime() - curStart.getTime();
          compEnd = new Date(curStart.getTime() - 1);
          compStart = new Date(compEnd.getTime() - duration);
          break;
        }
      }
      // Fallback to 30d if custom dates are invalid
      curEnd = new Date(now);
      curStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      compEnd = new Date(curStart.getTime() - 1);
      compStart = new Date(compEnd.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    }
    case "all":
    default: {
      curEnd = new Date(now);
      curStart = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      compEnd = new Date(curStart.getTime() - 1);
      compStart = new Date(curStart.getFullYear() - 1, curStart.getMonth(), curStart.getDate());
      break;
    }
  }

  const durationDays = Math.max(1, Math.round((curEnd.getTime() - curStart.getTime()) / (24 * 60 * 60 * 1000)));

  return {
    timeframe,
    currentPeriod: {
      start: curStart,
      end: curEnd,
      startIso: curStart.toISOString(),
      endIso: curEnd.toISOString(),
      label: `${formatDisplayDate(curStart)} – ${formatDisplayDate(curEnd)}`,
    },
    comparisonPeriod: {
      start: compStart,
      end: compEnd,
      startIso: compStart.toISOString(),
      endIso: compEnd.toISOString(),
      label: `${formatDisplayDate(compStart)} – ${formatDisplayDate(compEnd)}`,
    },
    durationDays,
  };
}

/**
 * Calculates honest mathematical comparison between a current and previous metric value.
 * Handles 0 -> positive, positive -> 0, zero baselines safely without NaN or +/- Infinity.
 */
export function calculateMetricComparison(
  current: number,
  previous: number,
  isGoodWhenHigher = true
): MetricComparison {
  const difference = current - previous;

  // Both zero: neutral
  if (previous === 0 && current === 0) {
    return {
      current,
      previous,
      difference: 0,
      percentageChange: 0,
      trend: "neutral",
      isPositive: true,
      formattedChange: "0.0%",
    };
  }

  // Previous was 0, now positive
  if (previous === 0 && current > 0) {
    return {
      current,
      previous,
      difference,
      percentageChange: 100,
      trend: "up",
      isPositive: isGoodWhenHigher,
      formattedChange: "+New",
    };
  }

  // Previous was positive, now 0
  if (previous > 0 && current === 0) {
    return {
      current,
      previous,
      difference,
      percentageChange: -100,
      trend: "down",
      isPositive: !isGoodWhenHigher,
      formattedChange: "-100%",
    };
  }

  // Normal percentage calculation
  const rawPct = ((current - previous) / previous) * 100;
  const percentageChange = parseFloat(rawPct.toFixed(1));
  const trend: "up" | "down" | "neutral" = difference > 0 ? "up" : difference < 0 ? "down" : "neutral";
  const isPositive = trend === "neutral" ? true : trend === "up" ? isGoodWhenHigher : !isGoodWhenHigher;
  const prefix = percentageChange > 0 ? "+" : "";

  return {
    current,
    previous,
    difference,
    percentageChange,
    trend,
    isPositive,
    formattedChange: `${prefix}${percentageChange}%`,
  };
}
