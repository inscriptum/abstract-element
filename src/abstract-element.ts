import { AbstractHyperElement } from "./abstract-hyper.element";
import { AbstractLitElement } from "./abstract-lit.element";



export { AbstractHyperElement, AbstractLitElement }



/**
 * Directive for define Custom Element
 */
export function Define(nameTag: string) {
  return (originalConstructor: new (...args) => any) => {
    try {
      customElements.define(nameTag, originalConstructor);
    } catch (error) {
      console.warn(error)
    }
  };
}