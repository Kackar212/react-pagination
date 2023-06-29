import { PaginationItemType } from '@common/enums/pagination-item-type.enum';
import { ReactNode } from 'react';

export interface PaginationItem {
  /**
   * Pagination item type
   */
  type: PaginationItemType;
  /**
   * True if it is current page, otherwise false
   */
  isCurrent: boolean;
  /**
   * True if type is page, otherwise false
   */
  isPage: boolean;
  /**
   * True if type is different than page, otherwise false
   */
  isGap: boolean;
  /**
   * Page number if item is of type page, otherwise label specified by user for gap
   */
  value: ReactNode;
}
