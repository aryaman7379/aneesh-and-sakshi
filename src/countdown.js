import { WEDDING_DATE } from './content';

const TARGET = new Date(WEDDING_DATE.iso).getTime();

/**
 * Shared wedding countdown. Clamped at zero so the day of (and after) never
 * renders negative numbers. Returns null once the wedding has begun.
 */
export function getRemaining(now = Date.now()) {
  const diff = TARGET - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export const pad = (n) => String(n).padStart(2, '0');
