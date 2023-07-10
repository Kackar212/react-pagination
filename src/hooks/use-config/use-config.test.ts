import { renderHook } from '@testing-library/react';
import { defaults } from '@common';
import { useConfig } from './use-config.hook';

describe('useConfig', () => {
  it('should return normalized and merged config', () => {
    const { result: config } = renderHook(() =>
      useConfig({
        pageCount: 10,
        boundaryCount: 2,
        siblingCount: { start: 1, end: 2 },
        page: 1,
      })
    );

    const { result } = renderHook(() =>
      useConfig({ total: 10, perPage: 5, page: 1 })
    );

    expect(config.current).toEqual({
      ...defaults,
      pageCount: 10,
      page: 1,
      boundaryCount: { start: 2, end: 2 },
      siblingCount: { start: 1, end: 2 },
    });

    expect(result.current).toEqual({
      ...defaults,
      total: 10,
      perPage: 5,
      page: 1,
    });
  });
});
