import * as litHtml from 'lit-html';
import { TemplateResult } from 'lit-html';



/**
 * Abstract element to create web component with lit-html render function
 */
export abstract class AbstractLitElement extends HTMLElement {
  static attrNames: { [x: string]: string } = {};
  private connected: boolean = false;
  private attach: any;
  protected html = litHtml.html;
  protected attr: { [x: string]: string } = {};
  protected _style: any;

  private _scope: any;
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
      this.attach = ((a, b) => { litHtml.render(b, a) }).bind(null, this.attachShadow({ mode }));
    } else {
      this.attach = ((a, b) => { litHtml.render(b, a) }).bind(null, this);
    }

    if (this._style && this._style !== '') {
      this._style = this.html`<style>${this._style}</style>`;
    }
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
  renderElement(): void {
    if (this.connected) {
      this.attach(this.html`${this._style}${this.render()}`);
    }
  }


  abstract render(): TemplateResult;

}
