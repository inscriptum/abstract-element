export { AbstractHyperElement } from './abstract-element-hyper';
export { AbstractLitElement} from './abstract-element-lit';



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