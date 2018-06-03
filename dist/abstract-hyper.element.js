import hyperHTML from 'hyperhtml/esm';
export class AbstractHyperElement extends HTMLElement {
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
            this.attach = hyperHTML.bind(this.attachShadow({ mode }));
        }
        else {
            this.attach = hyperHTML.bind(this);
        }
        if (this._style && this._style !== '') {
            this._style = hyperHTML.wire() `<style>${this._style}</style>`;
        }
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
    renderElement() {
        if (this.connected) {
            this.attach `${this._style}${this.render()}`;
        }
    }
}
AbstractHyperElement.attrNames = {};
//# sourceMappingURL=abstract-hyper.element.js.map