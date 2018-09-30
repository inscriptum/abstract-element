# abstract-element

## AbstractElement aims for creating web components identically independent from a render function.

With AbstractElement you can use [lit-html](https://github.com/Polymer/lit-html) or [hyperHTML](https://github.com/WebReflection/hyperHTML) inside components with same manner.

AbstractElement can uses [hyperHTML](https://github.com/WebReflection/hyperHTML) or [lit-html](https://github.com/Polymer/lit-html) or even your custom render function to render component into the DOM element's. AbstractElement reacts to changes in attributes or states and renders declaratively using the render function.

## Getting started

  1. Add abstract-element to your project:

      ```npm i abstract-element```

  1. Create an element by extending AbstractElement and calling `customElements.define` with your class or use @Define directive if you use TypeScript.

  1. Install the [hyperHTML](https://github.com/WebReflection/hyperHTML) or [lit-html](https://github.com/Polymer/lit-html) or other render.

  1. Import AbstractElement and an render function. By default AbstractElement and the render function imports as esm2015 module, but you can import theyr from es5 folder for use as cjs module with ECMAScript 5.

  1. See the [demo files](https://github.com/inscriptum/abstract-element/tree/master/demo).


> ## 🛠 Documentation status: IN PROCESS
> This documentation is currently in development. It will be finish soon.