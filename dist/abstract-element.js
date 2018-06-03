import { AbstractHyperElement } from "./abstract-hyper.element";
import { AbstractLitElement } from "./abstract-lit.element";
export { AbstractHyperElement, AbstractLitElement };
export function Define(nameTag) {
    return (originalConstructor) => {
        try {
            customElements.define(nameTag, originalConstructor);
        }
        catch (error) {
            console.warn(error);
        }
    };
}
//# sourceMappingURL=abstract-element.js.map