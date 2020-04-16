import { AbstractElement } from 'abstract-element';
import hyperRender from 'abstract-element/render/hyper';
import hyperHTML from 'hyperhtml/esm';

/**
 * The base class with hyperHTML render engine
 */
export abstract class BaseEl<T = { [x: string]: {} }> extends AbstractElement<T> {
  html = hyperHTML.wire();
  
  constructor(shadow?: boolean | undefined, mode?: 'open' | 'closed' | undefined) {
    super(hyperRender, shadow, mode);
  }
}
