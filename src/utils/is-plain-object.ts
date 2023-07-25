/**
 * Determines if a `value` is a plain object.
 *
 * @param value - Value to check
 * @returns Returns `true` if `value` is a plain object and its `prototype` is not null, otherwise `false`.
 *
 * @example
 *
 * isPlainObject({ foo: 'bar' });
 * // => true
 *
 * isPlainObject(new Object({}));
 * // => true
 *
 * isPlainObject(Object.create({}));
 * // => true
 *
 * isPlainObject('foo');
 * // => false
 *
 *  class Foo {
 *    bar: string;
 *
 *    constructor() {
 *      this.bar = 'baz';
 *    }
 *  }
 *
 * isPlainObject(new Foo());
 * // => false
 *
 * isPlainObject(Object.create(null));
 * // => false
 */
export function isPlainObject<PlainObject extends Record<PropertyKey, unknown>>(
  value: unknown
): value is PlainObject {
  if (value === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return false;
  }

  if (
    proto === Object.prototype &&
    toString.call(value) === '[object Object]'
  ) {
    return true;
  }

  const stringifyFunction = Function.toString;
  const objectConstructor = stringifyFunction.call(Object);

  return stringifyFunction.call(proto.constructor) === objectConstructor;
}
