import { BoardRowsConfiguration } from "../types";
import { BoardRow } from "./board-row";

export class BoardRows<T> {
    private _element: HTMLElement = document.createElement("div");
    private _unitInPx: number;
    private _unit: string;
    private _rows: BoardRow<T>[] = [];
    private _boundaries: [Date, Date];

    constructor(config: BoardRowsConfiguration<T>) {
        this._unit = config.unit;
        this._unitInPx = config.unitInPx;
        this._boundaries = [config.startDate, config.endDate];
        if (config.dataset) {
            this._rows = new Array(config.dataset.length);
            for (let i = 0; i < this._rows.length; i++) {
                this._rows[i] = new BoardRow(
                    config.dataset[i],
                    this._unitInPx,
                    this._unit,
                    this._boundaries,
                );
                this.element.appendChild(this._rows[i].element);
            }
        }
    }

    get element() { return this._element }
}