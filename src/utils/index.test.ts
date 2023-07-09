import { PaginationItemType, defaults } from '@common';
import { createPaginationItem } from './create-pagination-item';
import { createRange } from './create-range';
import { getPageCount } from './get-page-count';
import { isNumber } from './is-number';

describe('utils', () => {
  describe('isNumber', () => {
    it('should return true if specified value is of type number', () => {
      expect(isNumber(1)).toBe(true);
      expect(isNumber('1')).toBe(false);
    });
  });

  describe('getPageCount', () => {
    it('should return page count based on total and perPage arguments', () => {
      expect(getPageCount(100, 25)).toBe(4);
      expect(getPageCount(50, 6)).toBe(9);
      expect(getPageCount(0, 25)).toBe(1);
      expect(getPageCount(0, 0)).toBe(1);
    });
  });

  describe('createRange', () => {
    it('should return array of numbers starting from start increasing by 1 up to end', () => {
      expect(createRange(1, 3)).toEqual<number[]>([1, 2, 3]);
      expect(createRange(-5, 0)).toEqual([-5, -4, -3, -2, -1, 0]);
    });

    it('should return empty array if start is higher than end', () => {
      expect(createRange(10, 5)).toEqual([]);
      expect(createRange(-10, -20)).toEqual([]);
    });
  });

  describe('createPaginationItem', () => {
    it('should return PaginationPage if item is a number', () => {
      expect(createPaginationItem(10, { ...defaults })).toEqual({
        type: PaginationItemType.Page,
        value: 10,
        isCurrent: false,
        isPage: true,
        isGap: false,
      });
    });

    it('should return PaginationGap if item is not a number', () => {
      expect(
        createPaginationItem(PaginationItemType.StartGap, { ...defaults })
      ).toEqual({
        type: PaginationItemType.StartGap,
        value: '...',
        isCurrent: false,
        isPage: false,
        isGap: true,
      });
    });
  });
});
