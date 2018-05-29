import { AbstractElement, Define } from '../dist/abstract-element';



@Define('demo-component')
export class DemoComponent extends AbstractElement {
  static attrNames = { dataDemo: 'data-demo' };
  state = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super();

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