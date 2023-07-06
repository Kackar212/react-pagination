import { Range } from '@common';
import { isNumber } from './is-number';

/**
 * Returns {@link Range} if `count` is a number, otherwise just returns `count`.
 *
 * @param count - Pagination item count, e.g. PaginationConfig.boundaryCount
 * @returns Returns normalized count
 *
 * @example
 *
 * getNormalizedCount(4);
 * // => { start: 4, end: 4 }
 *
 * getNormalizedCount({ start: 1, end: 1 });
 * // => { start: 1, end: 1 }
 *
 * getNormalizedCount(undefined);
 * // => undefined
 */
export function getNormalizedCount(count?: Range | number) {
  if (isNumber(count)) {
    return {
      start: count,
      end: count,
    };
  }

  return count;
}
