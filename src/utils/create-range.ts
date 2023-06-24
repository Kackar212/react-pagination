/**
 * Creates an array of numbers progressing from `start` up to `end`. Empty array is returned if `end` is lower than `start`.
 *
 * @param start - Start of the range
 * @param end - End of the range
 *
 * @returns Returns the range of numbers.
 *
 * @example
 *
 * createRange(0, 2);
 * // => [0, 1, 2]
 *
 * createRange(2, 5);
 * // => [2, 3, 4, 5]
 *
 * createRange(0, -10);
 * // => []
 *
 * createRange(-5, 0);
 * // => [-5, -4, -3, -2, -1, 0]
 */
export function createRange(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => start + index);
}
