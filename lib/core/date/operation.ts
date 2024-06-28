import type { DateDelta } from ".";
import { getDateProp, setDateProp } from ".";

function operate(date: Date, delta: DateDelta, negate: boolean): Date {
    const copyDate = new Date(date);
    for (const [key, value] of Object.entries(delta)) {
        if (value === 0) continue;
        const currentValue = getDateProp(copyDate, key as keyof DateDelta);
        setDateProp(
            copyDate,
            key as keyof DateDelta,
            negate ? currentValue - value : currentValue + value,
        );
    }
    return copyDate;
}

export function addToDate(date: Date, delta: DateDelta): Date { return operate(date, delta, false) }
export function subtractToDate(date: Date, delta: DateDelta): Date { return operate(date, delta, true) }