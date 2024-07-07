import { addToDate } from "../core/date";
import { TimeUnitDateDeltaGenerator, timeUnitModule } from "../core/modules";
import { BoardColumnsConfiguration, BoardColumnsConfigurationPropagated } from "../types";
import { BoardColumn } from "./board-column";

const unitHelper = timeUnitModule();

export class BoardColumns {
    private _startDate: Date;
    private _endDate: Date;
    private _columns: BoardColumn[] = [];
    private _element: HTMLElement = document.createElement("div");
    private _config: BoardColumnsConfiguration;
    private _deltaGenerator: TimeUnitDateDeltaGenerator;
    private _unitInPx: number = 0;

    constructor(
        config: BoardColumnsConfiguration,
        propagatedConfig: BoardColumnsConfigurationPropagated,
    ) {
        this._config = config;
        this._startDate = propagatedConfig.startDate;
        this._endDate = propagatedConfig.endDate;
        this._deltaGenerator = unitHelper.getGenerator(this._config.unit);

        this.computeBaseStyle();
        this.updateColumns();
    }

    set startDate(value: Date) {
        this._startDate = value;
        this.updateColumns();
    }

    set endDate(value: Date) {
        this._endDate = value;
        this.updateColumns();
    }

    get element(): HTMLElement { return this._element }
    get unitInPx(): number { return this._unitInPx }

    private computeDates(): Date[] {
        const dates = [new Date(this._startDate)];
        while (dates[dates.length - 1] < this._endDate) {
            const date = addToDate(this._startDate, this._deltaGenerator(dates.length));
            if (date > this._endDate) {
                break;
            }
            dates.push(date);
        }
        return dates;
    }

    private updateColumns() {
        const dates = this.computeDates();
        // Remove surplus columns
        while (this._columns.length > dates.length) {
            this._columns.pop()?.destroy();
        }

        for(let i = 0; i < dates.length; i++) {
            // Add missing column
            if (i > this._columns.length - 1) {
                this._columns.push(new BoardColumn({
                    value: dates[i],
                    position: i + 1,
                    unit: this._config.unit,
                }));
                this.element.appendChild(this._columns[i].element);
                continue;
            }

            this._columns[i].value = dates[i];
        }

        this.refreshColumnsStyle();
    }

    private computeBaseStyle() {
        this._element.style.boxSizing = "border-box";
        this._element.style.whiteSpace = "nowrap";
    }

    private refreshColumnsStyle() {
        this.computeUnitSizing();
        for (let i = 0; i < this._columns.length; i++) {
            this._columns[i].element.style.width = `${this._unitInPx}px`;
        }
    }

    private computeUnitSizing() {       
        if (this._columns.length < 1) {
            this._unitInPx = 0;
            return;
        }

        let longestI = 0;
        for (let i = 1; i < this._columns.length; i++) {
            if (this._columns[longestI].label.length < this._columns[i].label.length) {
                longestI = i;
            }
        }

        const clone = this._columns[longestI].element.cloneNode(true);
        if (clone instanceof HTMLElement) {
            clone.style.display = "block";
            clone.style.position = "absolute";
            clone.style.opacity = "0";
            document.body.appendChild(clone);
            const w = clone.clientWidth;
            clone.remove();
            this._unitInPx = w;
            return;
        }

        this._unitInPx = 0;
    }
}