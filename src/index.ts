export { AbstractElement } from './abstract-element';

/**
 * Decorator for define Custom Element
 *
 * TODO:
 * - rename to `define` (it's a function and lower case uses everywhere in the official document https://www.typescriptlang.org/docs/handbook/decorators.html);
 * - property `nameTag` must be optional. If it was not sent create Custom Element with a tag from a class name converted to kebab-case.
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
export function state<T>(mapper?: (state: T, key: string, value: any) => T | void): PropertyDecorator {
  if (typeof mapper !== 'function') {
    mapper = (state: T, key: string, value: any) => (value !== state[key] ? { ...state, [key]: value } : undefined);
  }

  return function(target: any, key: string, descriptor?: PropertyDescriptor) {
    makePropertyMapper(target, key, mapper!, descriptor);
  };
}

/**
 * Decorator for attribute properties inside AbstractElement
 *
 * @param options - addition parameters to setting an attribute
 */
export function attr(options?: string | { name?: string; converter?: (val: any) => any }): PropertyDecorator {
  return function(target: any, key: string, descriptor?: PropertyDescriptor) {
    // apply converter if it was send here
    if (typeof options === 'object' && typeof options.converter === 'function') {
      // inject converter to existing descriptor or create new one
      if (descriptor) {
        const setter = descriptor.set || function() {};
        descriptor.set = function(value) {
          value = options!.converter!(value);
          setter.call(target, value);
        };
      } else {
        const _key = Symbol(key);
        Reflect.defineProperty(target, key, {
          set(value: any) {
            target[_key] = options!.converter!(value);
          },
          get() {
            return target[_key];
          },
          enumerable: true,
          configurable: true
        });
      }
    }

    const attributes = Reflect.get(target.constructor, 'attributes');

    Reflect.defineProperty(target.constructor, 'attributes', {
      value: {
        ...attributes,
        [key]: (typeof options === 'object' ? options.name : options) || key
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
 *
 * TODO:
 *  - need to change this function to more universal kind. The `state` property has to be a variable;
 *  - the code `if (descriptor) {...` the same as a code in the attr function.
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
