import { TemplateResult, html } from 'lit-html';
import { Define, AbstractElement, prop } from 'abstract-element';
import litRender from 'abstract-element/render/lit';

/**
 * The demo web component with lit-html render engine
 */
@Define('demo-lit-converter')
export class DemoLitComponentConverter extends AbstractElement {
  @prop()
  loading: boolean = true;

  constructor() {
    super(litRender, true);

    setInterval(() => {
      this.loading = !this.loading;
    }, 3000);
  }

  render(): TemplateResult {
    return html`
      ⌛<demo-lit-html-loader ?loading=${this.loading}></demo-lit-html-loader>
    `;
  }
}


function boolAttr(state, key: string, value: any) {
  value = typeof value === 'string' ? true : Boolean(value);

  return value !== state[key] ? { ...state, [key]: value } : undefined;
}

/**
 * The demo loader component
 */
@Define('demo-lit-html-loader')
export class DemoLitComponentLoader extends AbstractElement {
  @prop({ mapper: boolAttr, attribute: 'loading' })
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
