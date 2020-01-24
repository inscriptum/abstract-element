import { Define, AbstractElement, prop } from 'abstract-element';
import hyperRender from 'abstract-element/render/hyper'
import litRender from 'abstract-element/render/lit';

import * as litHtml from 'lit-html';
import hyperHTML from 'hyperhtml/esm';

import './finder';


/**
 * The demo web component with hyperHTML render engine
 */
@Define('demo-hyper-attributer')
export class DemoHyperComponent extends AbstractElement {
  html = hyperHTML.wire();

  @prop()
  searchText = '';

  constructor() {
    super(hyperRender, true);
  }


  render() {
    return this.html`
    <section>
      <p>Finder is rendering with hyperHTML:</p>
      <label>Type text to the field</label>
      <input oninput=${(e) => { this.searchText = (e.target || { value: '' }).value }}>
      <demo-hyper-finder search-text=${this.searchText}></demo-hyper-finder>
    </section>
    `;
  }
}



/**
 * The demo web component with lit-html render engine
 */
@Define('demo-lit-attributer')
export class DemoLitComponent extends AbstractElement {
  html = litHtml.html;

  @prop()
  searchText = '';


  constructor() {
    super(litRender, true);
  }


  render() {
    return this.html`
    <section>
      <p>Finder is rendering with lit-html:</p>
      <label>Type text to the field</label>
      <input @input=${(e) => { this.searchText = (e.target || { value: '' }).value }}>
      <demo-lit-finder search-text=${this.searchText}></demo-hyper-finder>
    </section>
    `;
  }
}
