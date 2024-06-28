import { DateDelta } from ".";

/**
 * Mutates a date by setting the specified property as the provided value.
 * 
 * @param date the date to mutate.
 * @param prop the property to change.
 * @param value the value to set.
 * 
 * @returns the new timestamp of the date.
 */
export function setDateProp(date: Date, prop: keyof DateDelta, value: number): number {
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
export function getDateProp(date: Date, prop: keyof DateDelta): number {
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