/**
 * The render function interface for a render engine
 */
export interface IRenderFunction<T = any> {
  (container: Element | DocumentFragment | ShadowRoot, template: T): any;
}

/**
 * Abstract render to create web component
 */
export abstract class AbstractElement<T = any> extends HTMLElement {
  static attributes: { [x: string]: string } = {};
  private connected: boolean = false;
  protected attr: { [x: string]: string } = {};

  private _state: any;
  protected set state(newState: any) {
    this._state = newState || this.state;
    this._attach();
  }
  protected get state() {
    return this._state;
  }

  static get observedAttributes() {
    return Object.keys(this.attributes).map(key => this.attributes[key]);
  }

  // prettier-ignore
  constructor(
    renderFunc: IRenderFunction<T>,
    shadow = false,
    mode: 'open' | 'closed' = 'open'
  ) {
    super();

    const attach = (container) => {
      if (this.connected) {
        renderFunc(container, this.render())
      }
    };

    if (shadow) {
      this._attach = attach.bind(null, this.attachShadow({ mode }));
    } else {
      this._attach = attach.bind(null, this);
    }
  }

  /**
   * LIFECYCLE
   * Invoked when the custom element is first connected to the document's DOM.
   */
  connectedCallback(): void {
    this.connected = true;
    this._attach();
  }

  /**
   * LIFECYCLE
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (this.attr[name] !== newValue) {
        this.attr[name] = newValue;
      }

      for (const [attrProp, attrKey] of Object.entries(this.constructor['attributes'])) {
        if (attrKey === name && this[attrProp] !== newValue) {
          this[attrProp] = newValue;
          break;
        }
      }

      this._attach();
    }
  }

  /**
   * Force update current view
   */
  forceUpdate() {
    this._attach();
  }

  /**
   * Attach the current template to DOM
   */
  private _attach() {}

  /**
   * Render function
   */
  abstract render(): T;
}
