import { ColumnLabelTransformer, columnLabelModule } from "../core/modules";
import { BoardColumnProps } from "../types";

const labelTransformer = columnLabelModule();

export class BoardColumn {
    private _element: HTMLElement;
    private _value: Date;
    private _position: number;
    private _transformer: ColumnLabelTransformer;

    // TODO : accept configuration, we might not always want a colum to represent a day, but rather a week or hour.
    constructor(props: BoardColumnProps) {
        const {unit, value, position} = props;
        this._element = document.createElement("div");
        this._value = value;
        this._position = position;
        this._transformer = labelTransformer.getTransformer(unit);
        this.computeBaseStyle();
        this.updateElement();
    }

    set value(value: Date) {
        this._value = value;
        this.updateElement();
    }

    get element(): HTMLElement {
        return this._element;
    }

    private updateElement() {
        this._element.innerHTML = this._transformer(this._value, this._position);
    }

    private computeBaseStyle() {
        // TODO : debug styles go down this comment
        this._element.style.border = "1px dashed red";
        this._element.style.padding = "0.25em";
    }
}