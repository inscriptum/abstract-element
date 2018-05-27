import { AbstractWebComponent, Define } from '../dist/abstract-element';


const template = (html, scope) => html`
<section>
  <p>Current time:</p>
  <div>${scope.time}</div>
</section>
`;



@Define('demo-component')
export class DemoComponent extends AbstractWebComponent {

  constructor() {
    super(template);

    // update the time each second
    setInterval(() => {
      this.render({
        time: new Date().toLocaleTimeString()
      });
    }, 1000);
  }
}