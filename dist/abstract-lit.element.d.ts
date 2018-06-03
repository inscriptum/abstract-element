import * as litHtml from 'lit-html';
import { TemplateResult } from 'lit-html';
export declare abstract class AbstractLitElement extends HTMLElement {
    static attrNames: {
        [x: string]: string;
    };
    private connected;
    private attach;
    protected html: (strings: TemplateStringsArray, ...values: any[]) => litHtml.TemplateResult;
    protected attr: {
        [x: string]: string;
    };
    protected _style: any;
    private _scope;
    protected state: any;
    static readonly observedAttributes: string[];
    constructor(staticStyle?: string, shadow?: boolean, mode?: 'open' | 'closed');
    connectedCallback(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    renderElement(): void;
    abstract render(): TemplateResult;
}
