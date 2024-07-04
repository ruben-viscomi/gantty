import { ColumnLabelTransformer, columnLabelModule } from "../core/modules";
import { BoardColumnProps } from "../types";

const labelTransformer = columnLabelModule();

export class BoardColumn {
    private _element: HTMLElement;
    private _value!: Date;
    private _position: number;
    private _transformer: ColumnLabelTransformer;
    private _label!: string;

    // TODO : accept configuration, we might not always want a colum to represent a day, but rather a week or hour.
    constructor(props: BoardColumnProps) {
        const {unit, value, position} = props;
        this._transformer = labelTransformer.getTransformer(unit);
        this._element = document.createElement("span");
        this._position = position;
        this.value = value;
        this.computeBaseStyle();
        this.updateElement();
    }

    destroy() { this._element.remove() }

    set value(value: Date) {
        this._value = value;
        this.updateLabel();
        this.updateElement();
    }

    get element(): HTMLElement { return this._element }

    private updateLabel() {
        this._label = this._transformer(this._value, this._position);
    }

    get label() { return this._label }

    private updateElement() {
        this._element.innerHTML = this._label;
    }

    private computeBaseStyle() {
        this._element.style.boxSizing = "border-box";
        this._element.style.display = "inline-flex";
        this._element.style.justifyContent = "center";
        this._element.style.alignItems = "center";
        this._element.style.whiteSpace = "nowrap";
        this._element.style.overflow = "hidden";
        this._element.style.textOverflow = "ellipsis";

        // TODO : debug styles go down this comment
        this._element.style.border = "1px dashed red";
        this._element.style.padding = "0.25em";
    }
}