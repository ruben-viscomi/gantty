import { DAY_IN_MS } from "../constants";

/**
 * Difference `b - a` returned in days.
 * @param a {@link Date} to subtract to the {@link Date} `b`.
 * @param b {@link Date} to wich you want to subtract the {@link Date} `a`.
 * @returns the truncated difference between the two dates in days.
 */
export function dateDifferenceInDays(a: Date, b: Date): number {
    return Math.trunc((b.getTime() - a.getTime()) / DAY_IN_MS);
}