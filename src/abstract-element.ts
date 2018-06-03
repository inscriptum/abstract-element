import hyperHTML from 'hyperhtml/esm';



/**
 * Abstract element to create web component with hyperHTML render function
 */
export abstract class AbstractElement extends HTMLElement {
  static attrNames: { [x: string]: string } = {};
  private connected: boolean = false;
  private bind: any;
  protected html = hyperHTML.wire(this);
  protected wire = hyperHTML.wire;
  protected attr: { [x: string]: string } = {};
  protected _style: string;

  private _scope: any;
  protected set state(newState: any) {
    this._scope = newState || this.state;
    this.realRender();
  }
  protected get state() {
    return this._scope;
  }

  static get observedAttributes() {
    return Object.keys(this.attrNames).map(key => this.attrNames[key]);
  }


  constructor(
    staticStyle: string = '',
    shadow = false,
    mode: 'open' | 'closed' = 'open'
  ) {
    super();
    try {
      this._style = staticStyle;
    } catch (error) {
      console.warn('Can not find a static style!');
    }

    if (shadow) {
      this.bind = hyperHTML.bind(this.attachShadow({ mode }));
    } else {
      this.bind = hyperHTML.bind(this);
    }

    if (this._style && this._style !== '') {
      this._style = hyperHTML.wire() `<style>${this._style}</style>`;
    }
  }



  /**
   * LIFECYCLE
   * Invoked when the custom element is first connected to the document's DOM.
   */
  connectedCallback(): void {
    this.connected = true;
    this.realRender();
  }


  /**
   * LIFECYCLE
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.attr[name] !== newValue) {
      this.attr[name] = newValue;
      this.realRender();
    }
  }


  /**
   * Render function
   */
  realRender(): void {
    if (this.connected) {
      this.bind`${this._style}${this.render()}`;
    }
  }


  abstract render(): () => void;

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
