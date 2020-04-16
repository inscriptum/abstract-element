import { AbstractElement } from 'abstract-element';
import litRender from 'abstract-element/render/lit';

/**
 * The base class with lit-html render engine
 */
export abstract class BaseEl<T = { [x: string]: {} }> extends AbstractElement<T> {
  constructor(shadow?: boolean | undefined, mode?: 'open' | 'closed' | undefined) {
    super(litRender, shadow, mode);
  }
}
