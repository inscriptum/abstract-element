import * as litHtml from 'lit-html';
export class AbstractLitElement extends HTMLElement {
    constructor(staticStyle = '', shadow = false, mode = 'open') {
        super();
        this.connected = false;
        this.html = litHtml.html;
        this.attr = {};
        try {
            this._style = staticStyle;
        }
        catch (error) {
            console.warn('Can not find a static style!');
        }
        if (shadow) {
            this.attach = ((a, b) => { litHtml.render(b, a); }).bind(null, this.attachShadow({ mode }));
        }
        else {
            this.attach = ((a, b) => { litHtml.render(b, a); }).bind(null, this);
        }
        if (this._style && this._style !== '') {
            this._style = this.html `<style>${this._style}</style>`;
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
            this.attach(this.html `${this._style}${this.render()}`);
        }
    }
}
AbstractLitElement.attrNames = {};
//# sourceMappingURL=abstract-lit.element.js.map