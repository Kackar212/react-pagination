/**
 * Calculates page count.
 *
 * @param total - Total number of items
 * @param perPage - Items per page
 * @returns Returns page count
 *
 * @example
 *
 * getPageCount(100, 25);
 * // => 4
 *
 * getPageCount(50, 6);
 * // => 9
 *
 * getPageCount(0, 25)
 * // => 0
 */
export function getPageCount(total: number, perPage: number) {
  return Math.ceil(total / perPage);
}
