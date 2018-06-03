import { AbstractHyperElement } from "./abstract-hyper.element";
import { AbstractLitElement } from "./abstract-lit.element";
export { AbstractHyperElement, AbstractLitElement };
export declare function Define(nameTag: string): (originalConstructor: new (...args: any[]) => any) => void;
