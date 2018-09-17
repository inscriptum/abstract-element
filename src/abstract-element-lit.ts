import * as litHtml from 'lit-html';
import { TemplateResult } from 'lit-html';
import { AbstractElement } from './abstract-element';



/**
 * Abstract element to create web component with lit-html render function
 */
export abstract class AbstractLitElement extends AbstractElement {
  static attrNames: { [x: string]: string } = {};
  protected html = litHtml.html;


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
   * Render function
   */
  renderElement(): void {
    if (this.connected) {
      this.attach(this.html`${this._style}${this.render()}`);
    }
  }


  abstract render(): TemplateResult;

}
