import { DEFAULT_BOARD_COLUMNS_CONFIG } from "../constants";
import { addToDate } from "../core/date";
import { TimeUnitDateDeltaGenerator, unitModule } from "../core/modules";
import { BoardColumnsConfiguration } from "../types";
import { BoardColumn } from "./board-column";

const unitHelper = unitModule();

export class BoardColumns {
    private _startDate: Date;
    private _count: number;
    private _columns: BoardColumn[];
    private _element: HTMLElement;
    private _config: BoardColumnsConfiguration;
    private _deltaGenerator: TimeUnitDateDeltaGenerator;

    // TODO: remove default parameters (keep only for initial dev)
    constructor(
        config: BoardColumnsConfiguration = DEFAULT_BOARD_COLUMNS_CONFIG,
        startDate: Date = new Date("01-01-2024"),
        count: number = 5
    ) {
        this._config = config;
        this._startDate = startDate;
        this._count = count;
        this._columns = new Array(count);
        this._element = document.createElement("div");
        this._deltaGenerator = unitHelper.getUnitDeltaGenerator(this._config.unit);

        this.computeBaseStyle()

        const dates = this.computeDates(this._startDate, this._count);
        for (let i = 0; i < this._count; i++) {
            this._columns[i] = new BoardColumn(dates[i]);
            this._element.appendChild(this._columns[i].element);
        }
    }

    set startDate(value: Date) {
        this._startDate = value;
        this.updateColumns();
    }

    set count(value: number) {
        this._count = value;
        this.updateColumns();
    }

    get element(): HTMLElement {
        return this._element;
    }

    private computeDates(startDate?: Date, count?: number): Date[] {
        const defaultedStartDate = startDate ?? this._startDate;
        const defaultedCount = count ?? this._count;
        const dates = new Array(count);
        for (let i = 0; i < defaultedCount; i++) {
            dates[i] = addToDate(defaultedStartDate, this._deltaGenerator(i));
        }
        return dates;
    }

    private updateColumns(startDate?: Date, count?: number) {
        const defaultedStartDate = startDate ?? this._startDate;
        const defaultedCount = count ?? this._count;

        const dates = this.computeDates(defaultedStartDate, defaultedCount);
        for(let i = 0; i < defaultedCount; i++) {
            this._columns[i].value = dates[i];
        }
    }

    private computeBaseStyle() {
        this._element.style.display = "flex";
    }
}