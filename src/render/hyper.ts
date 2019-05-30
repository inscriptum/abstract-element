import { bind } from "hyperhtml/esm";
import { IRenderFunction } from "abstract-element";

const renderFunc: IRenderFunction = (container: Element | ShadowRoot, template) => {
  bind(container)`${template}`;
};

export default renderFunc;
