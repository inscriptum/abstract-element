import hyperHTML from 'hyperhtml/esm';
import { AbstractElement } from './abstract-element';



/**
 * Abstract element to create web component with hyperHTML render function
 */
export abstract class AbstractHyperElement extends AbstractElement {
  protected html = hyperHTML.wire(this);
  protected wire = hyperHTML.wire;


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
      this.attach = hyperHTML.bind(this.attachShadow({ mode }));
    } else {
      this.attach = hyperHTML.bind(this);
    }

    if (this._style && this._style !== '') {
      this._style = hyperHTML.wire() `<style>${this._style}</style>`;
    }
  }


  /**
   * Render function
   */
  renderElement(): void {
    if (this.connected) {
      this.attach`${this._style}${this.render()}`;
    }
  }


  abstract render(): () => void;

}