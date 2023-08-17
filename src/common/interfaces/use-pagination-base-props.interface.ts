import { ReactNode } from 'react';
import { Range } from './range.interface';

/**
 *
 * @see {@link DefaultConfig} for default values.
 *
 */
export interface UsePaginationBaseProps {
  /**
   *
   * Number of items, will be used to calculate pageCount if pageCount is undefined
   *
   */
  total?: number;

  /**
   *
   * Items per page, will be used to calculate pageCount if pageCount is undefined
   *
   */
  perPage?: number;

  /**
   *
   * Number of pages
   *
   */
  pageCount?: number;

  /**
   *
   * Current page
   *
   */
  page: number;

  /**
   *
   * Number of items on the left and right side of current page
   * You can also specify different count for both sides with object literal
   *
   */
  siblingCount?: number | Range;

  /**
   *
   * Number of items at the start and end, if undefined or 0 then only current page and it siblings are returned!
   * You can also specify different count for both sides with object literal
   *
   */
  boundaryCount?: number | Range;

  /**
   *
   * Gap label
   *
   */
  gap?: ReactNode;
}
