# abstract-element

AbstractElement aims for creating Web components identically independent from a render engines. This project has an abstract class and a set of basic methods for developing Web components using various render engines.

            +---------------------------------------+
            |                                       |
            |   AbstractElement + render-function   |
            |                                       |
            +---------------------------------------+
            |                   |                   |
            |  Web components   |          Renders  |
            +---------------------------------------+
            |                   |                   |
            |  Custom Elements  |         lit-html  |
            |                   |                   |
            |  Shadow DOM       |        hyperHTML  |
            |                   |                   |
            |  ES Modules       |           ...     |
            |                   |                   |
            |  HTML Template    |                   |
            |                   |                   |
            +---------------------------------------+


## Getting started

1. Add abstract-element to your project:

   `npm i abstract-element`

2. Install a [render engine\*](#doc).

3. Create an element by extending AbstractElement and calling `customElements.define` with your class or use `@Define` directive if you use TypeScript.

```typescript
import { Define, AbstractElement, attr, state } from 'abstract-element';
import litRender from 'abstract-element/render/lit';

import { html } from 'lit-html';

/**
 * The demo web component with lit-html render engine
 */
@Define('demo-lit-component')
export class DemoLitComponent extends AbstractElement {
  @attr('data-demo')
  dataDemo;

  @state()
  time = new Date().toLocaleTimeString();

  constructor() {
    super(litRender, true);

    // update the time each second
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  }

  render() {
    return html`
      <section>
        <p>${this.attr[DemoLitComponent.attributes.dataDemo]}</p>
        <div>${this.time}</div>
      </section>
    `;
  }
}
```

4. Use the Web component.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Demo</title>
  </head>
  <body>
    <script src="index.js"></script>
    <demo-lit-component data-demo="Current time is rendering with lit-html:"></demo-lit-component>
  </body>
</html>
```

5. See the [demo files](https://github.com/inscriptum/abstract-element/tree/master/demo) for more examples.

## <a id="doc"></a>Documentation

- ### [[ru](doc/ru.md)]

  - [установка](doc/ru.md#install)
  - [использование](doc/ru.md#use)
  - [рендеры](doc/ru.md#renders)
  - [API](doc/ru.md#api)
  - [мотивация](doc/ru.md#motivation)
  - [отличия и сходства](doc/ru.md#diff_and_sim)
  - [тем, кто хочет что-то изменить](doc/ru.md#contributors)

- ### [[en](doc/en.md)] - 🛠 Documentation status: IN PROCESS
