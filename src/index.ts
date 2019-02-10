export { AbstractElement } from './abstract-element';



/**
 * Decorator for define Custom Element
 */
export function Define(nameTag: string) {
  return (originalConstructor: new (...args) => any) => {
    try {
      customElements.define(nameTag, originalConstructor);
    } catch (error) {
      console.warn(error)
    }
  };
}



/**
 * Decorator for state properties inside AbstractElement
 */
export function state() {
  return function (target: any, key: string, descriptor?: PropertyDescriptor) {
    makePropertyMapper(
      target,
      key,
      (value: number) => { return value; },
      descriptor
    );
  };
}



/**
 * Decorator for attribute properties inside AbstractElement
 */
export function attr(name) {
  return function (target: any, key: string, descriptor?: PropertyDescriptor) {
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
 * Mapper function for @state decoraror
 * 
 * @param prototype - a web component class prototype
 * @param key - property key
 * @param mapper - a mapper function
 */
function makePropertyMapper<T>(
  prototype: any,
  key: string,
  mapper: (value: any) => T,
  descriptor?: PropertyDescriptor
) {
  if (descriptor) {
    const setter = descriptor.set || function () { };
    descriptor.set = function (val) {
      setter.apply(this, [val]);
      this.forceUpdate();
    }
  } else {
    const values = new Map<any, T>();
    Reflect.defineProperty(prototype, key, {
      set(firstValue: any) {
        Reflect.defineProperty(this, key, {
          get() {
            return values.get(this);
          },
          set(value: any) {
            values.set(this, mapper(value));
            this.forceUpdate();
          },
          enumerable: true,
        });
        this[key] = firstValue;
      },
      enumerable: true,
      configurable: true,
    });
  }
}
