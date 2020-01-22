import './waiter';
import './attributer/attributer';
import './immer-timer';
import './converter';

import { TemplateResult } from 'lit-html';
import { Define, AbstractElement } from 'abstract-element';
import hyperRender from 'abstract-element/render/hyper'
import litRender from 'abstract-element/render/lit';

import * as litHtml from 'lit-html';
import hyperHTML from 'hyperhtml/esm';



/**
 * The demo web component with hyperHTML render engine
 */
@Define('demo-hyper-component')
export class DemoHyperComponent extends AbstractElement {
  static attributes = { dataDemo: 'data-demo' };
  html = hyperHTML.wire();
  
  state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super(hyperRender, true);

    // update the time each second
    setInterval(() => {
      this.state = {
        time: new Date().toLocaleTimeString()
      };
    }, 1000);
  }


  render() {
    return this.html`
    <section>
      <p>${this.attr[DemoHyperComponent.attributes.dataDemo]}</p>
      <div>${this.state.time}</div>
    </section>
    `;
  }
}



/**
 * The demo web component with lit-html render engine
 */
@Define('demo-lit-component')
export class DemoLitComponent extends AbstractElement<TemplateResult> {
  static attributes = { dataDemo: 'data-demo' };
  html = litHtml.html;

  state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super(litRender, true);

    // update the time each second
    setInterval(() => {
      this.state = {
        time: new Date().toLocaleTimeString()
      };
    }, 1000);
  }


  render() {
    return this.html`
    <section>
      <p>${this.attr[DemoLitComponent.attributes.dataDemo]}</p>
      <div>${this.state.time}</div>
    </section>
    `;
  }
}
