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
  /** @deprecated */
  protected attr: { [x: string]: string } = {};

  private _state: { [x: string]: any } = {};
  protected set state(newState: any) {
    if(newState !== undefined && this.state !== newState) {
      this._state = newState;
      this._attach();
    }
  }
  protected get state() {
    return this._state;
  }

  static get observedAttributes() {
    return Object.values(this.attributes);
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
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      /** @deprecated */
      if (this.attr[name] !== newValue) {
        this.attr[name] = newValue;
      }

      for (const [attrKey, attrName] of Object.entries(this.constructor['attributes'])) {
        if (attrName === name && this[attrKey] !== newValue) {
          this[attrKey] = newValue;
          const isNotState = this.state[attrKey] === undefined;
          if(isNotState) {
            this._attach();
          }
          break;
        }
      }
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
