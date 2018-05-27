import hyperHTML from 'hyperhtml/esm';



/**
 * Abstract component
 */
export abstract class AbstractWebComponent extends HTMLElement {
  private html: any;
  protected wire = hyperHTML.wire;
  protected props: { [x: string]: string } = {};

  protected _template: (html, scope) => any;
  protected _style: string;


  constructor(
    templateFunction: (html, scope) => any,
    staticStyle: string = '',
    shadow = false,
    mode: 'open' | 'closed' = 'open'
  ) {
    super();
    try {
      this._template = templateFunction;
      this._style = staticStyle;
    } catch (error) {
      console.warn('Can not find a template!');
    }

    if (shadow) {
      this.html = hyperHTML.bind(this.attachShadow({ mode }));
    } else {
      this.html = hyperHTML.bind(this);
    }

    if (this._style && this._style !== '') {
      this._style = hyperHTML.wire() `<style>${this._style}</style>`;
    }
  }


  /**
   * LIFECYCLE
   * Invoked when the custom element is first connected to the document's DOM.
   */
  connectedCallback(initialPropsList: string[] = []): void {
    this._initialProps(initialPropsList);
    this.render();
  }


  /**
   * LIFECYCLE
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.props[name] !== newValue) {
      this.props[name] = newValue;
      this.render();
    }
  }


  /**
   * Initialization
   * @param props - attribute for initialization
   */
  _initialProps(props: string[]): void {
    if (typeof props !== 'undefined')
      props.forEach(prop => {
        const propAttr = this.getAttribute(prop);
        if (typeof propAttr !== 'undefined' && propAttr !== null) {
          this.props[prop] = propAttr;
        }
      });
  }


  /**
   * Render function
   * 
   * @param scope - scope in the template ('this' by default)
   */
  render(scope: any = this): void {
    this.html`${this._style}${this._template(hyperHTML.wire(this), scope)}`;
  }

}


/**
 * Directive for define Custom Element
 */
export function Define(nameTag: string) {
  return (originalConstructor: new (...args) => any) => {
    try {
      customElements.define(nameTag, originalConstructor);
    } catch (error) {
      console.warn(error)
    }

  };
}
