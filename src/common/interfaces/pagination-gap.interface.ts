import { ReactNode } from 'react';
import { PaginationItemType } from '@common/enums';
import { PaginationItem } from './pagination-item.interface';

export interface PaginationGap extends PaginationItem {
  type: PaginationItemType.StartGap | PaginationItemType.EndGap;
  isPage: false;
  isGap: true;
  isCurrent: false;
  value: ReactNode;
}
