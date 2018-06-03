export declare abstract class AbstractElement extends HTMLElement {
    static attrNames: {
        [x: string]: string;
    };
    private connected;
    private bind;
    protected html: (template: TemplateStringsArray, ...values: any[]) => any;
    protected wire: {
        (identity?: object | null | undefined, type?: "html" | "svg" | undefined): (template: TemplateStringsArray, ...values: any[]) => any;
        (identity?: object | null | undefined, type_id?: string | undefined): (template: TemplateStringsArray, ...values: any[]) => any;
    };
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
    realRender(): void;
    abstract render(): () => void;
}
export declare function Define(nameTag: string): (originalConstructor: new (...args: any[]) => any) => void;
