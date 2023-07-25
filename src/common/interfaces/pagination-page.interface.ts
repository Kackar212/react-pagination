import { PaginationItemType } from '@common/enums';
import { PaginationItem } from './pagination-item.interface';

export interface PaginationPage extends PaginationItem {
  type: Exclude<
    PaginationItemType,
    PaginationItemType.StartGap | PaginationItemType.EndGap
  >;
  isPage: true;
  isGap: false;
  value: number;
}
