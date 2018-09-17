export class AbstractElement extends HTMLElement {
    constructor() {
        super(...arguments);
        this.connected = false;
        this.attr = {};
    }
    set state(newState) {
        this._scope = newState || this.state;
        this.renderElement();
    }
    get state() {
        return this._scope;
    }
    static get observedAttributes() {
        return Object.keys(this.attrNames).map(key => this.attrNames[key]);
    }
    connectedCallback() {
        this.connected = true;
        this.renderElement();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.attr[name] !== newValue) {
            this.attr[name] = newValue;
            this.renderElement();
        }
    }
}
AbstractElement.attrNames = {};
//# sourceMappingURL=abstract-element.js.map