import { addToDate } from "../core/date";
import { TimeUnitDateDeltaGenerator, timeUnitModule } from "../core/modules";
import { BoardColumnsConfiguration, BoardColumnsConfigurationPropagated } from "../types";
import { BoardColumn } from "./board-column";

const unitHelper = timeUnitModule();

export class BoardColumns {
    private _startDate: Date;
    private _endDate: Date;
    private _columns: BoardColumn[];
    private _element: HTMLElement;
    private _config: BoardColumnsConfiguration;
    private _deltaGenerator: TimeUnitDateDeltaGenerator;

    constructor(
        config: BoardColumnsConfiguration,
        propagatedConfig: BoardColumnsConfigurationPropagated,
    ) {
        this._config = config;
        this._startDate = propagatedConfig.startDate;
        this._endDate = propagatedConfig.endDate;
        this._columns = [];
        this._element = document.createElement("div");
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

    get element(): HTMLElement {
        return this._element;
    }

    private computeDates(): Date[] {
        const dates = [new Date(this._startDate)];
        while (dates[dates.length - 1] < this._endDate) {
            dates.push(addToDate(this._startDate, this._deltaGenerator(dates.length)));
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
    }

    private computeBaseStyle() {
        this._element.style.display = "flex";
    }
}