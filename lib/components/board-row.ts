import { TimeUnitHelper } from "../core/modules/stateful/helpers";
import { Task } from "../core/types";

export class BoardRow<T> {
    private _element: HTMLElement = document.createElement("div");
    private _taskBar: HTMLElement = document.createElement("div");
    private _task: Task<T>;
    private _unitHelper: TimeUnitHelper;
    private _taskWidth: number;

    constructor(
        task: Task<T>,
        private unitPx: number,
        private unit: string,
        private boundaries: [Date, Date]
    ) {
        this._task = task;
        this._unitHelper = new TimeUnitHelper(this.unit);
        this._taskWidth = this._unitHelper.getUnitFitting(this._task.startDate, this._task.endDate) * this.unitPx;
        this.computeStyle();
        this._element.appendChild(this._taskBar);
    }

    get element() { return this._element }

    get key() { return this._task.key }
    get startDate() { return this._task.startDate }
    get endDate() { return this._task.endDate }
    get data() { return this._task.data }

    private computeStyle() {
        this._element.style.boxSizing = "border-box";
        this._element.style.position = `relative`;

        this._taskBar.style.position = "absolute";
        this._taskBar.style.width = `${this._taskWidth}px`;
        // this._taskBar.style.cursor = "grab";
        const position = this._unitHelper.getUnitFitting(this.boundaries[0], this._task.startDate) * this.unitPx;
        this._taskBar.style.left = `${position}px`;

        // TODO : debug only
        const parentHeight = 16;
        const childHeight = 10;
        const heightDiff = parentHeight - childHeight;

        this._element.style.height = `${parentHeight}px`;
        this._taskBar.style.height = `${childHeight}px`;
        this._taskBar.style.top = `${heightDiff / 2}px`;

        this._taskBar.style.backgroundColor = "blue";
    }

    destroy() { this._element.remove() }
}