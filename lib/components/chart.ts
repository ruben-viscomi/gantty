import { getDatasetDateBoundaries } from "../core/dataset";
import { Task } from "../core/types";
import { GanttChartConfiguration } from "../types/configurations";
import { BoardColumns } from "./board-columns";
import { BoardRows } from "./board-rows";

export class GanttChart<T> {
    private _element: HTMLElement;
    private _columns: BoardColumns;
    private _rows: BoardRows<T>;
    private _dataset!: Task<T>[];
    private _startDate!: Date;
    private _endDate!: Date;

    constructor(configuration: GanttChartConfiguration<T>) {
        this._element = document.createElement("div");
        // this._element.style.overflow = "auto";
        if (configuration) {
            // TODO : configure elements
        }
        this.dataset = configuration?.dataset ?? [];
        this._columns = new BoardColumns(configuration.boardColumns, {
            startDate: this._startDate,
            endDate: this._endDate,
        });
        this._element.appendChild(this._columns.element);

        this._rows = new BoardRows<T>({
            ...configuration.boardColumns,
            unitInPx: this._columns.unitInPx,
            dataset: configuration?.dataset,
            startDate: this._startDate,
            endDate: this._endDate,
        });
        this._element.appendChild(this._rows.element);
    }

    set dataset(value: Task<T>[]) {
        this._dataset = value;
        const [startDate, endDate] = getDatasetDateBoundaries(this._dataset);
        this._startDate = startDate;
        this._endDate = endDate;
    }

    get element(): HTMLElement {
        return this._element;
    }
}