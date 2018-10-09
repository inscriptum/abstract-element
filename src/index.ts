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
    const setter = descriptor.set;
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
