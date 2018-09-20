/**
 * The template object interface for a render engine
 */
interface TemplateResult {
  strings: TemplateStringsArray;
  values: any[];
}



/**
 * Abstract render to create web component
 */
export abstract class AbstractElement extends HTMLElement {
  static attributes: { [x: string]: string } = {};
  private connected: boolean = false;
  private attach: any;
  protected attr: { [x: string]: string } = {};

  private _scope: any;
  
  protected set state(newState: any) {
    this._scope = newState || this.state;
    this.attach();
  }

  protected get state() {
    return this._scope;
  }

  static get observedAttributes() {
    return Object.keys(this.attributes).map(key => this.attributes[key]);
  }


  constructor(
    renderFunc: (content: Element, template: TemplateResult) => any,
    shadow = false,
    mode: 'open' | 'closed' = 'open'
  ) {
    super();

    this.attach = (container) => {
      if (this.connected) {
        renderFunc(container, this.render())
      }
    };

    if (shadow) {
      this.attach = this.attach.bind(null, this.attachShadow({ mode }));
    } else {
      this.attach = this.attach.bind(null, this);
    }
  }


  /**
   * LIFECYCLE
   * Invoked when the custom element is first connected to the document's DOM.
   */
  connectedCallback(): void {
    this.connected = true;
    this.attach();
  }


  /**
   * LIFECYCLE
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.attr[name] !== newValue) {
      this.attr[name] = newValue;
      this.attach();
    }
  }


  /**
   * Render function
   */
  abstract render(): TemplateResult;
}
