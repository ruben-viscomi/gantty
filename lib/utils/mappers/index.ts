import { DAY_IN_MS, HOUR_IN_MS, MINUTE_IN_MS, SECOND_IN_MS, WEEK_IN_MS, WORK_WEEK_IN_MS } from "../../constants";

export function millisecondsOfTimeUnit(timeUnit: string, referenceDate: Date = new Date()): number {
    switch (timeUnit.toLowerCase()) {
        case "millisecond": return 1;
        case "second": return SECOND_IN_MS;
        case "minute": return MINUTE_IN_MS;
        case "hour": return HOUR_IN_MS;
        case "day": return DAY_IN_MS;
        case "workweek": return WORK_WEEK_IN_MS;
        case "week": return WEEK_IN_MS;
        case "fortnight": return 2 * WEEK_IN_MS;
        case "month": return daysInMonth(referenceDate.getMonth() + 1, referenceDate.getFullYear()) * DAY_IN_MS;
        case "quarter": return daysBetweenMonths(referenceDate.getMonth() + 1, referenceDate.getMonth() + 3, referenceDate.getFullYear()) * DAY_IN_MS;
        case "semester": return daysBetweenMonths(referenceDate.getMonth() + 1, referenceDate.getMonth() + 6, referenceDate.getFullYear()) * DAY_IN_MS;
        case "year": return (isLeapYear(referenceDate.getFullYear()) ? 366 : 365) * DAY_IN_MS;
        case "decade": return daysBetweenYears(referenceDate.getFullYear(), referenceDate.getFullYear() + 10) * DAY_IN_MS;
        case "jubilee": return daysBetweenYears(referenceDate.getFullYear(), referenceDate.getFullYear() + 50) * DAY_IN_MS;
        case "century": return daysBetweenYears(referenceDate.getFullYear(), referenceDate.getFullYear() + 100) * DAY_IN_MS;
        case "millennium": return daysBetweenYears(referenceDate.getFullYear(), referenceDate.getFullYear() + 1000) * DAY_IN_MS;
        default: return 0;
    }
}

function daysInMonth(date: number, year: number): number {
    switch (date) {
        case 1:
        case 3:
        case 5: 
        case 7: 
        case 8: 
        case 10: 
        case 12: return 31;

        case 4:
        case 6:
        case 9:
        case 11: return 30;

        default: return isLeapYear(year) ? 29 : 28;
    }
}

function isLeapYear(year: number): boolean { return year / (year % 100 === 0 ? 400 : 4) === 0 }

function leapYearCountBetweenYears(startYear: number, endYear: number): number {
    return Math.trunc(startYear / 4) - Math.trunc(endYear / 4)      // how many Caesarian leap years
        - Math.trunc(startYear / 100) + Math.trunc(endYear / 100)   // Centuries
        + Math.trunc(startYear / 400) - Math.trunc(endYear / 400);
}

function daysBetweenYears(startYear: number, endYear: number): number {
    const leapYears = leapYearCountBetweenYears(startYear, endYear)
    return leapYears * 366 + (endYear - startYear - leapYears) * 365;
}

function daysBetweenMonths(startMonth: number, endMonth: number, year: number): number {
    let count = 0;
    for (; startMonth <= endMonth; startMonth++) {
        count += daysInMonth(startMonth, year);
    }
    return count;
}