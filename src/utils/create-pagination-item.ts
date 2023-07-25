import { PaginationGap, PaginationItemType, PaginationPage } from '@common';
import { UseConfigResult } from '@hooks';
import { isNumber } from './is-number';
import { isPlainObject } from './is-plain-object';

export type CreatePaginationPage =
  | number
  | { type: PaginationPage['type']; value: number };
export type CreatePaginationGap =
  | PaginationItemType.StartGap
  | PaginationItemType.EndGap;

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
  item: CreatePaginationPage,
  config: UseConfigResult
): PaginationPage;
export function createPaginationItem(
  item: CreatePaginationGap,
  config: UseConfigResult
): PaginationGap;
export function createPaginationItem(
  item: CreatePaginationGap | CreatePaginationPage,
  config: UseConfigResult
): PaginationPage | PaginationGap;
export function createPaginationItem(
  item: CreatePaginationGap | CreatePaginationPage,
  config: UseConfigResult
): PaginationPage | PaginationGap {
  const isItemNumber = isNumber(item);

  if (!isItemNumber && !isPlainObject(item)) {
    return {
      type: item,
      value: config.gap,
      isPage: false,
      isCurrent: false,
      isGap: true,
    };
  }

  const type = isItemNumber ? PaginationItemType.Page : item.type;
  const value = isItemNumber ? item : item.value;

  return {
    type,
    value,
    isPage: true,
    isCurrent: item === config.page,
    isGap: false,
  };
}
