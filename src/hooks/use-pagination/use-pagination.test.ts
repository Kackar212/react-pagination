import { renderHook } from '@testing-library/react';
import { PaginationConfig, PaginationItemType, defaults } from '@common';
import { createRange } from '@utils';
import { useConfig } from '@hooks/use-config/use-config.hook';
import { createPaginationItem } from '@utils/create-pagination-item';
import { usePagination } from './use-pagination.hook';

describe('usePagination', () => {
  let testConfig = { ...defaults, pageCount: 100, page: 10 };
  let firstPage = createPaginationItem(1, testConfig);
  let lastPage = createPaginationItem(100, testConfig);
  let previousPage = createPaginationItem(9, testConfig);
  let nextPage = createPaginationItem(11, testConfig);
  let defaultResult = {
    firstPage,
    lastPage,
    previousPage,
    nextPage,
    page: 10,
    pageCount: 100,
  };

  beforeEach(() => {
    testConfig = { ...defaults, pageCount: 100, page: 10 };
    firstPage = createPaginationItem(
      { type: PaginationItemType.FirstPage, value: 1 },
      testConfig
    );
    lastPage = createPaginationItem(
      { type: PaginationItemType.LastPage, value: 100 },
      testConfig
    );
    previousPage = createPaginationItem(
      { type: PaginationItemType.PreviousPage, value: 9 },
      testConfig
    );
    nextPage = createPaginationItem(
      { type: PaginationItemType.NextPage, value: 11 },
      testConfig
    );
    defaultResult = {
      firstPage,
      lastPage,
      previousPage,
      nextPage,
      page: 10,
      pageCount: 100,
    };
  });

  it('should return items and both gaps if siblings and boundaries are apart by more than two items', () => {
    const { result: config } = renderHook(() =>
      useConfig({ ...testConfig, boundaryCount: 3 })
    );

    const { result } = renderHook(() =>
      usePagination(config.current as PaginationConfig)
    );

    const items = [
      ...createRange(1, 3),
      PaginationItemType.StartGap as const,
      ...createRange(7, 13),
      PaginationItemType.EndGap as const,
      ...createRange(98, 100),
    ];

    expect(result.current).toEqual({
      ...defaultResult,
      items: items.map((item) => createPaginationItem(item, config.current)),
    });
  });

  it('should calculate page count if page count is falsy or is set to 1 and total and perPage are truthy', () => {
    const { result: config } = renderHook(() =>
      useConfig({ total: 3300, perPage: 33, page: 10 })
    );

    const { result } = renderHook(() =>
      usePagination(config.current as PaginationConfig)
    );

    expect(result.current).toEqual({
      ...defaultResult,
      items: [...createRange(7, 13)].map((item) =>
        createPaginationItem(item, config.current)
      ),
    });
  });

  it('should return items without gaps and boundaries if boundaryCount is set to 0', () => {
    const { result: config } = renderHook(() =>
      useConfig({ total: 800, perPage: 8, page: 10, siblingCount: 10 })
    );

    const { result } = renderHook(() =>
      usePagination(config.current as PaginationConfig)
    );

    expect(result.current).toEqual({
      ...defaultResult,
      items: createRange(1, 20).map((item) =>
        createPaginationItem(item, config.current)
      ),
    });
  });

  it('should return last page as current page if current page is higher than last page', () => {
    const { result } = renderHook(() =>
      usePagination({ pageCount: 100, page: 200 })
    );

    expect(result.current.page).toEqual(100);
  });

  it('should return 1 as current page if current page is lower than 1', () => {
    const { result } = renderHook(() =>
      usePagination({ pageCount: 100, page: -1 })
    );

    expect(result.current.page).toEqual(1);
  });

  it('should insert page instead of gap if boundary item is separated only by one item with siblings, e.g. [..., 3, 5, ...] => [..., 3, 4, 5, ...]', () => {
    const { result: config } = renderHook(() =>
      useConfig({ ...testConfig, page: 8, boundaryCount: 3 })
    );

    const { result } = renderHook(() =>
      usePagination(config.current as PaginationConfig)
    );

    defaultResult.previousPage.value = config.current.page - 1;
    defaultResult.nextPage.value = config.current.page + 1;
    defaultResult.page = config.current.page;

    expect(result.current).toEqual({
      ...defaultResult,
      items: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        PaginationItemType.EndGap as const,
        98,
        99,
        100,
      ].map((item) => createPaginationItem(item, config.current)),
    });
  });

  it('should return page count equal to 1 when total or perPage is not a number', () => {
    const { result: config } = renderHook(() =>
      useConfig({
        total: 'foo' as any,
        perPage: 'bar' as any,
        page: 10,
        boundaryCount: 3,
      })
    );

    const { result } = renderHook(() =>
      usePagination(config.current as PaginationConfig)
    );

    expect(result.current.pageCount).toBe(1);
  });

  it('should return page count equal to 1 when total or perPage is less than 1', () => {
    const { result: config } = renderHook(() =>
      useConfig({
        total: -1,
        perPage: 0,
        page: 10,
        boundaryCount: 3,
      })
    );

    const { result } = renderHook(() =>
      usePagination(config.current as PaginationConfig)
    );

    expect(result.current.pageCount).toBe(1);
  });
});
