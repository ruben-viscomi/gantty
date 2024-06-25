export class BoardColumn {
    private _element: HTMLElement;
    private _value: Date;

    // TODO : accept configuration, we might not always want a colum to represent a day, but rather a week or hour.
    constructor(value: Date = new Date()) {
        this._element = document.createElement("div");
        this._value = value;
        this._element.innerHTML = value.toDateString();
        this.computeBaseStyle();
    }

    set value(value: Date) {
        this._value = value;
        this.updateElement();
    }

    get element(): HTMLElement {
        return this._element;
    }

    private updateElement(value?: Date) {
        this._element.innerHTML = value?.toDateString()
            ?? this._value.toDateString();
    }

    private computeBaseStyle() {
        // TODO : debug styles go down this comment
        this._element.style.border = "1px dashed red";
        this._element.style.padding = "0.25em";
    }
}