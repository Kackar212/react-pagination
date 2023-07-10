import { PaginationGap, PaginationItemType, PaginationPage } from '@common';
import { UseConfigResult } from '@hooks';
import { isNumber } from './is-number';

/**
 * Returns {@link PaginationPage} if `item` is of type `number`, otherwise {@link PaginationGap}.
 *
 * @param item - Raw pagination item
 * @param config - Merged and normalized config
 *
 * @returns Returns {@link PaginationPage} or {@link PaginationGap}
 *
 * @example
 *
 * createPaginationItem(1, { page: 1, ... });
 * \/*
 * {
 *   type: PaginationItemType.Page,
 *   value: 1,
 *   isPage: true,
 *   isCurrent: true,
 *   isGap: false,
 * }
 * *\/
 *
 * createPaginationItem(PaginationItemType.StartGap, { gap: '...', ... });
 * \/*
 * {
 *   type: item,
 *   value: '...',
 *   isPage: false,
 *   isCurrent: false,
 *   isGap: true,
 * };
 * *\/
 */
export function createPaginationItem(
  item: number,
  config: UseConfigResult
): PaginationPage;
export function createPaginationItem(
  item: PaginationItemType.StartGap | PaginationItemType.EndGap,
  config: UseConfigResult
): PaginationGap;
export function createPaginationItem(
  item: PaginationItemType.StartGap | PaginationItemType.EndGap | number,
  config: UseConfigResult
): PaginationPage | PaginationGap;
export function createPaginationItem(
  item: PaginationItemType.StartGap | PaginationItemType.EndGap | number,
  config: UseConfigResult
): PaginationPage | PaginationGap {
  if (isNumber(item)) {
    return {
      type: PaginationItemType.Page,
      value: item,
      isPage: true,
      isCurrent: item === config.page,
      isGap: false,
    };
  }

  return {
    type: item,
    value: config.gap,
    isPage: false,
    isCurrent: false,
    isGap: true,
  };
}
