import { DefaultConfig } from '@common/interfaces';

export const defaults: DefaultConfig = {
  pageCount: 0,
  page: 1,
  boundaryCount: { start: 0, end: 0 },
  siblingCount: { start: 3, end: 3 },
  gap: '...',
} as const;
