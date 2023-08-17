import {
  createPaginationItem,
  createRange,
  getPageCount,
  isNumber,
} from '@utils';
import {
  PaginationConfig,
  PaginationGap,
  PaginationItemType,
  PaginationPage,
} from '@common';
import { useConfig } from '@hooks/use-config/use-config.hook';
import { useMemo } from 'react';

export interface UsePaginationResult {
  pageCount: number;
  items: Array<PaginationPage | PaginationGap>;
  firstPage: PaginationPage;
  lastPage: PaginationPage;
  previousPage: PaginationPage;
  nextPage: PaginationPage;
  page: number;
}

/**
 * Creates pagination items and also returns other pagination data like page count or current page
 *
 * @param paginationOptions - usePagination options
 *
 * @returns Returns pagination items and other pagination data, @see {@link UsePaginationResult}.
 *
 * @example
 *
 * // items and returned object are simplified, usePagination returns UsePaginationResult
 *
 * usePagination({ pageCount: 100, page: 10 });
 * // => { pageCount: 100, items: [7, 8, 9, 10, 11, 12, 13] }
 *
 * usePagination({ total: 1000, perPage: 10, page: 50, boundaryCount: 3 });
 * // => { pageCount: 100, items: [1, 2, 3, "start-gap", 47, 48, 49, 50, 51, 52, 53, "end-gap", 98, 99, 100] }
 *
 * usePagination({ pageCount: 10, siblingCount: 0, boundaryCount: 0, page: 6 });
 * // => { pageCount: 10, items: [6] }
 */
export function usePagination(
  paginationOptions: PaginationConfig
): UsePaginationResult {
  const config = useConfig(paginationOptions);

  return useMemo(() => {
    let { pageCount, page, total, perPage } = config;
    const { boundaryCount, siblingCount } = config;

    const shouldCalculatePageCount =
      !pageCount || (pageCount === 1 && total && perPage);

    if (shouldCalculatePageCount) {
      if (!isNumber(total) || total <= 0) {
        total = 1;
      }

      if (!isNumber(perPage) || perPage <= 0) {
        perPage = 1;
      }

      pageCount = getPageCount(total, perPage);
    }

    if (!isNumber(page) || page <= 0) {
      page = 1;
    }

    if (page > pageCount) {
      page = pageCount;
    }

    const firstPage = createPaginationItem(
      { type: PaginationItemType.FirstPage, value: 1 },
      config
    );
    const lastPage = createPaginationItem(
      { type: PaginationItemType.LastPage, value: pageCount },
      config
    );
    const previousPage = createPaginationItem(
      { type: PaginationItemType.PreviousPage, value: Math.max(page - 1, 1) },
      config
    );
    const nextPage = createPaginationItem(
      {
        type: PaginationItemType.NextPage,
        value: Math.min(page + 1, pageCount),
      },
      config
    );

    const startBoundary = createRange(1, boundaryCount.start);
    const endBoundary = createRange(
      pageCount - boundaryCount.end + 1,
      pageCount
    );

    const prevSiblings = createRange(
      Math.max(1, page - siblingCount.start),
      page - 1
    );
    const nextSiblings = createRange(
      page + 1,
      Math.min(pageCount, page + siblingCount.end)
    );

    const rawItems = Array.from(
      new Set([
        ...startBoundary,
        ...prevSiblings,
        page,
        ...nextSiblings,
        ...endBoundary,
      ])
    );

    const items = rawItems
      .flatMap<
        PaginationItemType.StartGap | PaginationItemType.EndGap | number
      >((rawItem, index, iteratedArray) => {
        const previousItem = iteratedArray.at(index - 1);

        if (!previousItem || rawItem - previousItem === 1) {
          return rawItem;
        }

        if (previousItem + 1 === rawItem - 1) {
          return [rawItem - 1, rawItem];
        }

        if (previousItem === startBoundary.at(-1)) {
          return [PaginationItemType.StartGap as const, rawItem];
        }

        if (rawItem === endBoundary.at(0)) {
          return [PaginationItemType.EndGap as const, rawItem];
        }

        return rawItem;
      })
      .map((item) => createPaginationItem(item, config));

    return {
      pageCount,
      items,
      firstPage,
      lastPage,
      previousPage,
      nextPage,
      page,
    };
  }, [config]);
}
