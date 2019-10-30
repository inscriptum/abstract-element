export { AbstractElement } from './abstract-element';

/**
 * Decorator for define Custom Element
 */
export function Define(nameTag: string) {
  return (originalConstructor: new (...args) => any) => {
    try {
      customElements.define(nameTag, originalConstructor);
    } catch (error) {
      console.warn(error);
    }
  };
}

/**
 * Decorator for state properties inside AbstractElement
 */
export function state<T>(mapper?: (state: T, key: string, value: any) => T | void) {
  if (typeof mapper !== 'function') {
    mapper = (state: T, key: string, value: any) => ({ ...state, [key]: value });
  }

  return function(target: any, key: string, descriptor?: PropertyDescriptor) {
    makePropertyMapper(target, key, mapper!, descriptor);
  };
}

/**
 * Decorator for attribute properties inside AbstractElement
 */
export function attr(name: string) {
  return function(target: any, key: string, descriptor?: PropertyDescriptor) {
    const attributes = Reflect.get(target.constructor, 'attributes');

    Reflect.defineProperty(target.constructor, 'attributes', {
      value: {
        ...attributes,
        [key]: name
      },
      enumerable: true,
      writable: true
    });
  };
}

/**
 * Mapper function for @state decorator
 *
 * @param prototype - a web component class prototype
 * @param key - property key
 * @param mapper - a mapper function
 */
function makePropertyMapper<T>(
  prototype: any,
  key: string,
  mapper: (state: T, key: string, value: any) => T | void,
  descriptor?: PropertyDescriptor
) {
  if (descriptor) {
    const setter = descriptor.set || function() {};
    descriptor.set = function(val) {
      setter.apply(this, [val]);
      this._attach();
    };
  } else {
    Reflect.defineProperty(prototype, key, {
      set(firstValue: any) {
        Reflect.defineProperty(this, key, {
          get() {
            return this.state[key];
          },
          set(value: any) {
            this.state = mapper.call(this, this.state, key, value);
          },
          enumerable: true
        });
        this.state[key] = firstValue;
      },
      enumerable: true,
      configurable: true
    });
  }
}
