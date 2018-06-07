export declare abstract class AbstractHyperElement extends HTMLElement {
    static attrNames: {
        [x: string]: string;
    };
    private connected;
    private attach;
    protected html: (template: TemplateStringsArray, ...values: any[]) => any;
    protected wire: typeof import("../node_modules/hyperhtml/index").wire;
    protected attr: {
        [x: string]: string;
    };
    protected _style: string;
    private _scope;
    protected state: any;
    static readonly observedAttributes: string[];
    constructor(staticStyle?: string, shadow?: boolean, mode?: 'open' | 'closed');
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    renderElement(): void;
    abstract render(): () => void;
}
