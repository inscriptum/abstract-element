import { TemplateResult, html } from 'lit-html';
import { Define, AbstractElement, attr, state } from 'abstract-element';
import litRender from 'abstract-element/render/lit';

/**
 * The demo web component with lit-html render engine
 */
@Define('demo-lit-converter')
export class DemoLitComponentConverter extends AbstractElement {
  @state()
  loading: boolean = true;

  constructor() {
    super(litRender, true);

    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  render(): TemplateResult {
    return html`
      ⌛<demo-lit-loader ?loading=${this.loading}></demo-lit-loader>
    `;
  }
}

function boolAttr(val: string) {
  return typeof val === 'string';
}

/**
 * The demo loader component
 */
@Define('demo-lit-loader')
export class DemoLitComponentLoader extends AbstractElement {
  @attr({ converter: boolAttr })
  loading: boolean;

  constructor() {
    super(litRender, true);
  }

  render() {
    return this.loading
      ? html`
          <span>Loading 3 seconds, please...</span>
        `
      : html`
          <span>That's a loaded content!</span>
        `;
  }
}
