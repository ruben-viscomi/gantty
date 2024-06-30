export type ColumnLabelTransformer = (date: Date, position: number) => string;

const DEFAULT_TRANSFORMERS: Record<string, ColumnLabelTransformer> = {
    "millisecond": (date) => date.getMilliseconds().toString(),
    "second": (date) => date.getSeconds().toString(),
    "minute": (date) => date.getMinutes().toString(),
    "hour": (date) => date.getHours().toString(),
    "day": (date) => date.getDay().toString(),
    "week": (_, position) => `W${position}`,
    "fortnight": (_, position) => `W${2 * position}`,
    "month": (date) => (date.getMonth() + 1).toString(),
    "quarter": (_, position) => `Q${position}`,
    "semester": (_, position) => `S${position}`,
    "year": (date) => date.getFullYear().toString(),
    "decade": (date) => date.getFullYear().toString(),
    "jubilee": (date) => date.getFullYear().toString(),
    "century": (date) => date.getFullYear().toString(),
    "millennium": (date) => date.getFullYear().toString(),
}

export class ColumnLabelModule {
    private static _instance: ColumnLabelModule;
    
    private _transformers: Record<string, ColumnLabelTransformer>

    constructor() {
        if (ColumnLabelModule.hasInstance()) {
            throw ReferenceError(`An instance of this singleton already exists. Please call getInstance`);
        }
        this._transformers = DEFAULT_TRANSFORMERS;
        ColumnLabelModule._instance = this;
    }

    static hasInstance(): boolean { return !!ColumnLabelModule._instance }

    static getInstance(): ColumnLabelModule {
        if (!ColumnLabelModule.hasInstance()) {
            throw ReferenceError(`The singleton hasn't been instanced yet. Please call the convetional constructor.`);
        }
        return ColumnLabelModule._instance;
    }

    registerTransformers(config: Record<string, ColumnLabelTransformer>) {
        for (const [key, value]  of Object.entries(config)) {
            this.registerTransformer(key, value);
        }
    }

    registerTransformer(name: string, transformer: ColumnLabelTransformer) {
        // TODO : warn about the override, if a generator with the same name exists.
        this._transformers[name] = transformer;
    }

    getTransformer(name: string): ColumnLabelTransformer {
        const found = this._transformers[name];
        if (!found) {
            throw RangeError(`No generator registered for unit "${name}". Please register a generator for it.`);
        }
        return found;
    }
}

export function columnLabelModule(): ColumnLabelModule {
    return ColumnLabelModule.hasInstance()
        ? ColumnLabelModule.getInstance()
        : new ColumnLabelModule();
}