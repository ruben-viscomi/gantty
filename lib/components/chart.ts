import { GanttChartConfiguration } from "../types/configurations";
import { BoardColumns } from "./board-columns";

export class GanttChart {
    private _element: HTMLElement;
    private _columns: BoardColumns;

    constructor(configuration?: GanttChartConfiguration) {
        this._element = document.createElement("div");
        if (configuration) {
            // TODO : configure elements
        }
        this._columns = new BoardColumns();
        this._element.appendChild(this._columns.element);
    }

    get element(): HTMLElement {
        return this._element;
    }
}