import { PaginationItemType } from '@common/enums';
import { PaginationItem } from './pagination-item.interface';

export interface PaginationPage extends PaginationItem {
  type: PaginationItemType.Page;
  isPage: true;
  isGap: false;
  value: number;
}
