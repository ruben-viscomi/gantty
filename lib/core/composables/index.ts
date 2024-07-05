import { addToDate } from "../date";
import { timeUnitModule } from "../modules";

export function useTimeUnit(unit: string) {
    const generator = timeUnitModule().getGenerator(unit);

    function getUnitFitting(start: Date, end: Date): number {
        const unitMillis = addToDate(new Date(0), generator(1)).getTime();
        const providedMillis = end.getTime() - start.getTime();
        return providedMillis / unitMillis;
    }

    return {
        getUnitFitting,
    }
}