import { AbstractWebComponent, Define } from '../dist/abstract-element';



@Define('demo-component')
export class DemoComponent extends AbstractWebComponent {
  static attrNames = ['data-demo'];
  static get observedAttributes() { return this.attrNames; }

  scope = {
    time: new Date().toLocaleTimeString()
  };


  constructor() {
    super();

    // update the time each second
    setInterval(() => {
      this.scope = {
        time: new Date().toLocaleTimeString()
      };
    }, 1000);
  }


  render() {
    return this.html`
    <section>
      <p>${this.attr['data-demo']}</p>
      <div>${this.scope.time}</div>
    </section>
    `;
  }
}