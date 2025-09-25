/**
 * Minimal SM-2-like scheduler.
 * rating: 1..5 (1=schlecht, 5=sehr gut)
 * intervalDays: aktuelles Intervall
 * ease: Leichtigkeitsfaktor (2.5 default)
 */
export async function scheduleNext(rating: number, intervalDays = 1, ease = 2.5) {
  let newEase = Math.max(1.3, ease + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)));
  let nextInterval = 1;
  if (rating < 3) {
    nextInterval = 1;
  } else if (intervalDays < 1.5) {
    nextInterval = 2;
  } else {
    nextInterval = Math.round(intervalDays * newEase);
  }
  return { nextIntervalDays: nextInterval, newEase };
}
