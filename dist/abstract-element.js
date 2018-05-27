import hyperHTML from 'hyperhtml/esm';
export class AbstractWebComponent extends HTMLElement {
    constructor(templateFunction, staticStyle = '', shadow = false, mode = 'open') {
        super();
        this.wire = hyperHTML.wire;
        this.props = {};
        try {
            this._template = templateFunction;
            this._style = staticStyle;
        }
        catch (error) {
            console.warn('Can not find a template!');
        }
        if (shadow) {
            this.html = hyperHTML.bind(this.attachShadow({ mode }));
        }
        else {
            this.html = hyperHTML.bind(this);
        }
        if (this._style && this._style !== '') {
            this._style = hyperHTML.wire() `<style>${this._style}</style>`;
        }
    }
    connectedCallback(initialPropsList = []) {
        this._initialProps(initialPropsList);
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.props[name] !== newValue) {
            this.props[name] = newValue;
            this.render();
        }
    }
    _initialProps(props) {
        if (typeof props !== 'undefined')
            props.forEach(prop => {
                const propAttr = this.getAttribute(prop);
                if (typeof propAttr !== 'undefined' && propAttr !== null) {
                    this.props[prop] = propAttr;
                }
            });
    }
    render(scope = this) {
        this.html `${this._style}${this._template(hyperHTML.wire(this), scope)}`;
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