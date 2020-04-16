import { TemplateResult } from 'lit-html';
import { Define, AbstractElement, prop } from 'abstract-element';
import hyperRender from 'abstract-element/render/hyper';
import litRender from 'abstract-element/render/lit';

import * as litHtml from 'lit-html';
import hyperHTML from 'hyperhtml/esm';

/**
 * The demo web component with hyperHTML render engine
 */
@Define('demo-hyper-finder')
export class DemoHyperComponent extends AbstractElement {
  html = hyperHTML.wire();

  @prop({ attribute: 'search-text' })
  searchText: string;

  constructor() {
    super(hyperRender, true);
  }

  render() {
    return this.html`
    <section>
      <div>🕵</div>
      <p>I will find <b>${this.searchText}<b></p>
    </section>
    `;
  }
}

/**
 * The demo web component with lit-html render engine
 */
@Define('demo-lit-finder')
export class DemoLitComponent extends AbstractElement {
  html = litHtml.html;

  @prop({ attribute: 'search-text' })
  searchText: string;

  constructor() {
    super(litRender, true);
  }

  render(): TemplateResult {
    return this.html`
    <section>
      <div>🕵</div>
      <p>I will find <b>${this.searchText}<b></p>
    </section>
    `;
  }
}
