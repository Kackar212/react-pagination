import { UsePaginationBaseProps } from './use-pagination-base-props.interface';

export interface UsePaginationPropsWithCount extends UsePaginationBaseProps {
  pageCount: number;
  total?: undefined;
  perPage?: undefined;
}
