/**
 * Determine if a `value` is of type `number`.
 *
 * @param value - The value to check.
 *
 * @returns Returns `true` if `value` is of type `number`, otherwise `false`.
 *
 * @example
 *
 * isNumber(1);
 * // => true
 *
 * isNumber(NaN);
 * // => true
 *
 * isNumber(Infinity)
 * // => true
 *
 * isNumber('1');
 * // => false
 */
export function isNumber(value: unknown) {
  return typeof value === 'number';
}
