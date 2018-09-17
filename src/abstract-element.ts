/**
 * Abstract render to create web component
 */
export abstract class AbstractElement extends HTMLElement {
  static attrNames: { [x: string]: string } = {};
  protected connected: boolean = false;
  protected attach: any;
  protected html: any;
  protected attr: { [x: string]: string } = {};
  protected _style: any;

  protected _scope: any;
  protected set state(newState: any) {
    this._scope = newState || this.state;
    this.renderElement();
  }
  protected get state() {
    return this._scope;
  }

  static get observedAttributes() {
    return Object.keys(this.attrNames).map(key => this.attrNames[key]);
  }



  /**
   * LIFECYCLE
   * Invoked when the custom element is first connected to the document's DOM.
   */
  connectedCallback(): void {
    this.connected = true;
    this.renderElement();
  }


  /**
   * LIFECYCLE
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.attr[name] !== newValue) {
      this.attr[name] = newValue;
      this.renderElement();
    }
  }


  /**
   * Render function
   */
  abstract renderElement()


  abstract render()

}
