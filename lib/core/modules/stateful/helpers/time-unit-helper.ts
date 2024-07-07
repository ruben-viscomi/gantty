import { addToDate } from "../../../date";
import { TimeUnitDateDeltaGenerator, timeUnitModule } from "../../singletons";

export class TimeUnitHelper {
    private _generator: TimeUnitDateDeltaGenerator;
    constructor(
        private readonly unit: string
    ) {
        this._generator = timeUnitModule().getGenerator(this.unit);
    }

    getUnitFitting(start: Date, end: Date): number {
        const unitMillis = addToDate(new Date(0), this._generator(1)).getTime();
        const providedMillis = end.getTime() - start.getTime();
        return providedMillis / unitMillis;
    }
}