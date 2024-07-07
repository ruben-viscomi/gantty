import { DateDelta } from "../../../date";

export type TimeUnitDateDeltaGenerator = (nth: number) => DateDelta

const DEFAULT_UNITS: Record<string, TimeUnitDateDeltaGenerator> = {
    "millisecond": (nth) => ({ "milliseconds": nth }),
    "second": (nth) => ({ "seconds": nth }),
    "minute": (nth) => ({ "minutes": nth }),
    "hour": (nth) => ({ "hours": nth }),
    "day": (nth) => ({ "days": nth }),
    "week": (nth) => ({ "days": 7 * nth }),
    "fortnight": (nth) => ({ "days": 14 * nth }),
    "month": (nth) => ({ "months": nth }),
    "quarter": (nth) => ({ "months": 3 * nth }),
    "semester": (nth) => ({ "months": 6 * nth }),
    "year": (nth) => ({ "years": nth }),
    "decade": (nth) => ({ "years": 10 * nth }),
    "jubilee": (nth) => ({ "years": 50 * nth }),
    "century": (nth) => ({ "years": 100 * nth }),
    "millennium": (nth) => ({ "years": 1000 * nth }),
}

export class TimeUnitModule {
    private static _instance: TimeUnitModule;
    
    private _units: Record<string, TimeUnitDateDeltaGenerator>

    constructor() {
        if (TimeUnitModule.hasInstance()) {
            throw ReferenceError(`An instance of this singleton already exists. Please call getInstance`);
        }
        this._units = DEFAULT_UNITS;
        TimeUnitModule._instance = this;
    }

    static hasInstance(): boolean { return !!TimeUnitModule._instance }

    static getInstance(): TimeUnitModule {
        if (!TimeUnitModule.hasInstance()) {
            throw ReferenceError(`The singleton hasn't been instanced yet. Please call the convetional constructor.`);
        }
        return TimeUnitModule._instance;
    }

    registerGenerators(config: Record<string, TimeUnitDateDeltaGenerator>) {
        for (const [key, value]  of Object.entries(config)) {
            this.registerGenerator(key, value);
        }
    }

    registerGenerator(unit: string, generator: TimeUnitDateDeltaGenerator) {
        // TODO : warn about the override, if a generator with the same name exists.
        this._units[unit] = generator;
    }

    getGenerator(unit: string): TimeUnitDateDeltaGenerator {
        const found = this._units[unit];
        if (!found) {
            throw RangeError(`No generator registered for unit "${unit}". Please register a generator for it.`);
        }
        return found;
    }
}

export function timeUnitModule(): TimeUnitModule {
    return TimeUnitModule.hasInstance()
        ? TimeUnitModule.getInstance()
        : new TimeUnitModule();
}