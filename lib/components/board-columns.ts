import { DAY_IN_MS } from "../constants";
import { BoardColumn } from "./board-column";

export class BoardColumns {
    private _startDate: Date;
    private _count: number;
    private _columns: BoardColumn[];
    private _element: HTMLElement;

    constructor(startDate: Date = new Date(), count: number = 5) {
        this._startDate = startDate;
        this._count = count;
        this._columns = new Array(count);
        this._element = document.createElement("div");

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
            dates[i] = new Date(defaultedStartDate?.getTime() + DAY_IN_MS * i);
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