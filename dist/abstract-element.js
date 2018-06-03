import hyperHTML from 'hyperhtml/esm';
export class AbstractElement extends HTMLElement {
    constructor(staticStyle = '', shadow = false, mode = 'open') {
        super();
        this.connected = false;
        this.html = hyperHTML.wire(this);
        this.wire = hyperHTML.wire;
        this.attr = {};
        try {
            this._style = staticStyle;
        }
        catch (error) {
            console.warn('Can not find a static style!');
        }
        if (shadow) {
            this.bind = hyperHTML.bind(this.attachShadow({ mode }));
        }
        else {
            this.bind = hyperHTML.bind(this);
        }
        if (this._style && this._style !== '') {
            this._style = hyperHTML.wire() `<style>${this._style}</style>`;
        }
    }
    set state(newState) {
        this._scope = newState || this.state;
        this.realRender();
    }
    get state() {
        return this._scope;
    }
    static get observedAttributes() {
        return Object.keys(this.attrNames).map(key => this.attrNames[key]);
    }
    connectedCallback() {
        this.connected = true;
        this.realRender();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.attr[name] !== newValue) {
            this.attr[name] = newValue;
            this.realRender();
        }
    }
    realRender() {
        if (this.connected) {
            this.bind `${this._style}${this.render()}`;
        }
    }
}
AbstractElement.attrNames = {};
export function Define(nameTag) {
    return (originalConstructor) => {
        try {
            customElements.define(nameTag, originalConstructor);
        }
        catch (error) {
            console.warn(error);
        }
    };
}
//# sourceMappingURL=abstract-element.js.map