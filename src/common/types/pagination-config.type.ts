import {
  UsePaginationPropsWithCount,
  UsePaginationPropsWithTotal,
} from '@common/interfaces';

export type PaginationConfig =
  | UsePaginationPropsWithTotal
  | UsePaginationPropsWithCount;
