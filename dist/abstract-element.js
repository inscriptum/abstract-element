import hyperHTML from 'hyperhtml/esm';
export class AbstractWebComponent extends HTMLElement {
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
    set scope(states) {
        this._scope = states || this.scope;
        this.realRender();
    }
    get scope() {
        return this._scope;
    }
    connectedCallback(initialPropsList = []) {
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