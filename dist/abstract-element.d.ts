export declare abstract class AbstractElement extends HTMLElement {
    static attrNames: {
        [x: string]: string;
    };
    protected connected: boolean;
    protected attach: any;
    protected html: any;
    protected attr: {
        [x: string]: string;
    };
    protected _style: any;
    protected _scope: any;
    protected state: any;
    static readonly observedAttributes: string[];
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    abstract renderElement(): any;
    abstract render(): any;
}
