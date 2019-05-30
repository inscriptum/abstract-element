import { render, TemplateResult } from "lit-html";
import { IRenderFunction } from "abstract-element";

const renderFunc: IRenderFunction<TemplateResult> = (container, template) => {
  render(template, container);
};

export default renderFunc;
