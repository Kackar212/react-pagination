import { isNumber } from './is-number';

describe('utils', () => {
  describe('isNumber', () => {
    it('should return true if specified value is of type number', () => {
      expect(isNumber(1)).toBe(true);
      expect(isNumber('1')).toBe(false);
    });
  });
});
