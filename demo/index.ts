import { Define, AbstractLitElement, AbstractHyperElement } from '../lib/esm5';
import { TemplateResult } from 'lit-html';



@Define('demo-hyper-component')
export class DemoHyperComponent extends AbstractHyperElement {
  static attrNames = { dataDemo: 'data-demo' };
  state = {
    time: new Date().toLocaleTimeString()
  };

  
  constructor() {
    super('', true);

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
      <p>${this.attr[DemoComponent.attrNames.dataDemo]}</p>
      <div>${this.state.time}</div>
    </section>
    `;
  }
}



@Define('demo-lit-component')
export class DemoComponent extends AbstractLitElement {
  static attrNames = { dataDemo: 'data-demo' };
  state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super('', true);

    // update the time each second
    setInterval(() => {
      this.state = {
        time: new Date().toLocaleTimeString()
      };
    }, 1000);
  }


  render(): TemplateResult {
    return this.html`
    <section>
      <p>${this.attr[DemoComponent.attrNames.dataDemo]}</p>
      <div>${this.state.time}</div>
    </section>
    `;
  }
}