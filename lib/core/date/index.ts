export interface DateDelta {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

/**
 * Mutates a date by setting the specified property as the provided value.
 * 
 * @param date the date to mutate.
 * @param prop the property to change.
 * @param value the value to set.
 * 
 * @returns the new timestamp of the date.
 */
function setDateProp(date: Date, prop: keyof DateDelta, value: number): number {
    switch (prop) {
        case "years": return date.setFullYear(value);
        case "months": return date.setMonth(value);
        case "days": return date.setDate(value);
        case "hours": return date.setHours(value);
        case "minutes": return date.setMinutes(value);
        case "seconds": return date.setSeconds(value);
        case "milliseconds": return date.setMilliseconds(value);
    }
}

/**
 * Gets the value of the date's provided prop.
 * 
 * @param date the date for which to get the prop.
 * @param prop the property to get.
 * 
 * @returns the value of the date's provided prop.
 */
function getDateProp(date: Date, prop: keyof DateDelta): number {
    switch (prop) {
        case "years": return date.getFullYear();
        case "months": return date.getMonth();
        case "days": return date.getDate();
        case "hours": return date.getHours();
        case "minutes": return date.getMinutes();
        case "seconds": return date.getSeconds();
        case "milliseconds": return date.getMilliseconds();
    }
}

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