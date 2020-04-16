import { Define, AbstractElement, state } from 'abstract-element';
import hyperRender from 'abstract-element/render/hyper'
import litRender from 'abstract-element/render/lit';

import * as litHtml from 'lit-html';
import hyperHTML from 'hyperhtml/esm';



/**
 * The demo web component with hyperHTML render engine
 */
@Define('demo-hyper-waiter')
export class DemoHyperWaiter extends AbstractElement {
  html = hyperHTML.wire();

  _fiveSecondsLater = 'Wait Hyper five seconds, please 👨‍🍳'
  @state()
  set fiveSecondsLater(val) { this._fiveSecondsLater = val; }
  get fiveSecondsLater() { return this._fiveSecondsLater; }

  @state()
  threeSecondsLater = 'Wait Hyper three seconds, please 👨‍🍳';


  constructor() {
    super(hyperRender, true);

    setTimeout(() => {
      this.threeSecondsLater = 'Your Hyper taco 🌮';
    }, 3000);

    setTimeout(() => {
      this.fiveSecondsLater = 'Your Hyper coffee ☕';
    }, 5000);

  }


  render() {
    return this.html`
    <section>
      <div>${this.threeSecondsLater}</div>
      <div>${this.fiveSecondsLater}</div>
    </section>`;
  }
}



/**
 * The demo web component with lit-html render engine
 */
@Define('demo-lit-waiter')
export class DemoLitWaiter extends AbstractElement {
  html = litHtml.html;

  @state()
  threeSecondsLater = 'Wait Lit three seconds, please 👨‍🍳';

  _fiveSecondsLater = 'Wait Lit five seconds, please 👨‍🍳'
  @state()
  set fiveSecondsLater(val) { this._fiveSecondsLater = val; }
  get fiveSecondsLater() { return this._fiveSecondsLater; }


  constructor() {
    super(litRender, true);

    setTimeout(() => {
      this.threeSecondsLater = 'Your Lit taco 🌮';
    }, 3000);

    setTimeout(() => {
      this.fiveSecondsLater = 'Your Lit coffee ☕';
    }, 5000);
  }


  render() {
    return this.html`
    <section>
      <div>${this.threeSecondsLater}</div>
      <div>${this.fiveSecondsLater}</div>
    </section>`;
  }
}
