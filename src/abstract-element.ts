import hyperHTML from 'hyperhtml/esm';



/**
 * Abstract component
 */
export abstract class AbstractWebComponent extends HTMLElement {
  private connected: boolean = false;
  private bind: any;
  protected html = hyperHTML.wire(this);
  protected wire = hyperHTML.wire;
  protected attr: { [x: string]: string } = {};
  protected _style: string;

  private _scope: any;
  protected set scope(states: any) {
    this._scope = states || this.scope;
    this.realRender();
  }
  protected get scope(){
    return this._scope;
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
  connectedCallback(initialPropsList: string[] = []): void {
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
    if(this.connected){
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
