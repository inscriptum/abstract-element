import { AbstractElement } from 'abstract-element';
export { AbstractElement } from './abstract-element';

export function define<T, G = undefined>(
  name: string,
  constructor?: G extends CustomElementConstructor ? G : any,
  options?: ElementDefinitionOptions
) {
  if (constructor !== undefined) {
    try {
      customElements.define(name, constructor, options);
    } catch (error) {
      console.warn(error);
    }
  }

  type PropsType = G extends undefined ? T : InstanceType<typeof constructor & {}> extends AbstractElement<infer U3> ? U3 : never;

  return async (properties?: PropsType & Partial<HTMLElement>) => {
    const elClass = await customElements.whenDefined(name).then(() => customElements.get(name));
    if (typeof properties === 'object') {
      for (const key in properties) {
        elClass[key] = properties[key];
      }
    }
  };
}

/**
 * Decorator for define Custom Element
 *
 * TODO:
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
 *
 * @param options - addition parameters to setup a property
 */
export function prop<T = string>(options?: {
  attribute?: string;
  reflect?: boolean;
  mapper?: (state: T, key: string, value: any) => {} | void;
}): PropertyDecorator {
  let _mapper =
    typeof options?.mapper === 'function'
      ? options.mapper
      : function(state: T, key: string, value: any) {
          if (state === undefined || value !== state[key]) {
            return { ...state, [key]: value };
          }
        };

  return function(target: any, key: string, descriptor?: PropertyDescriptor) {
    const reflectAttr = options?.reflect ? options?.attribute ?? key : undefined;
    makePropertyMapper(target, key, _mapper, reflectAttr, descriptor);

    if (options?.attribute) {
      const attrKey = 'attributes';
      const attributes = Reflect.get(target.constructor, attrKey);

      Reflect.defineProperty(target.constructor, attrKey, {
        value: {
          ...attributes,
          [key]: options.attribute
        },
        enumerable: true,
        writable: true
      });
    }
  };
}

/**
 * Decorator for state properties inside AbstractElement
 * @deprecated use `prop` decorator
 */
export function state<T>(mapper?: (state: T, key: string, value: any) => T | void): PropertyDecorator {
  if (typeof mapper !== 'function') {
    mapper = (state: T, key: string, value: any) => (state === undefined || value !== state[key] ? { ...state, [key]: value } : undefined);
  }

  return function(target: any, key: string, descriptor?: PropertyDescriptor) {
    makePropertyMapper(target, key, mapper!, undefined, descriptor);
  };
}

/**
 * Decorator for attribute properties inside AbstractElement
 *
 * @param options - addition parameters to setting an attribute
 * @deprecated use `prop` decorator with `attribute` option
 */
export function attr(options?: string | { name?: string; converter?: (val: string) => any }): PropertyDecorator {
  return function(target: any, key: string, descriptor?: PropertyDescriptor) {
    // apply converter if it was send here
    if (typeof options === 'object' && typeof options.converter === 'function') {
      // inject converter to existing descriptor or create new one
      if (descriptor) {
        const setter = descriptor.set || function() {};
        descriptor.set = function(value) {
          value = options!.converter!.call(target, value);
          setter.call(target, value);
        };
      } else {
        const _key = Symbol(key);
        Reflect.defineProperty(target, key, {
          set(value: string) {
            target[_key] = options!.converter!.call(target, value);
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
  reflectAttr: string | undefined,
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
            if (reflectAttr !== undefined) {
              reflectAttrFromProp(this, reflectAttr, this.state[key]);
            }
          },
          enumerable: true
        });
        this.state = mapper.call(this, this.state, key, firstValue);
      },
      enumerable: true,
      configurable: true
    });
  }
}

function reflectAttrFromProp(el: Element, attrName: string, value: any) {
  if (el instanceof Element) {
    switch (typeof value) {
      case 'boolean':
        if (value) {
          el.setAttribute(attrName, '');
        } else {
          el.removeAttribute(attrName);
        }
        break;
      default:
        el.setAttribute(attrName, String(value));
        break;
    }
  }
}
