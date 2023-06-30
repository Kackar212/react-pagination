/**
 * Calculates page count.
 *
 * @param total - Total number of items
 * @param perPage - Items per page
 * @returns Returns page count, not less than 1.
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
 * // => 1
 */
export function getPageCount(total: number, perPage: number) {
  const pageCount = Math.ceil(total / perPage);

  if (Number.isNaN(pageCount)) {
    return 1;
  }

  return Math.max(pageCount, 1);
}
