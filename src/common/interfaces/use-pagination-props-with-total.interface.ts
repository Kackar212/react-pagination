import { UsePaginationBaseProps } from './use-pagination-base-props.interface';

export interface UsePaginationPropsWithTotal extends UsePaginationBaseProps {
  total: number;
  perPage: number;
  pageCount?: undefined;
}
