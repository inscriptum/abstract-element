export declare abstract class AbstractWebComponent extends HTMLElement {
    private html;
    protected wire: {
        (identity?: object | null | undefined, type?: "html" | "svg" | undefined): (template: TemplateStringsArray, ...values: any[]) => any;
        (identity?: object | null | undefined, type_id?: string | undefined): (template: TemplateStringsArray, ...values: any[]) => any;
    };
    protected props: {
        [x: string]: string;
    };
    protected _template: (html, scope) => any;
    protected _style: string;
    constructor(templateFunction: (html, scope) => any, staticStyle?: string, shadow?: boolean, mode?: 'open' | 'closed');
    connectedCallback(initialPropsList?: string[]): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    _initialProps(props: string[]): void;
    render(scope?: any): void;
}
export declare function Define(nameTag: string): (originalConstructor: new (...args: any[]) => any) => void;
