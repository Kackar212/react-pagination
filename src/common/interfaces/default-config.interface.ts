/**
 *
 * @see {@link UsePaginationBaseProps} for property descriptions.
 *
 */
export interface DefaultConfig {
  pageCount: 1;
  boundaryCount: {
    start: 0;
    end: 0;
  };
  siblingCount: {
    start: 3;
    end: 3;
  };
  gap: '...';
}
