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
});
