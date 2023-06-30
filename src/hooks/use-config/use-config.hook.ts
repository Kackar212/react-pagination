import { ReactNode, useMemo } from 'react';
import { isNumber } from '@utils';
import {
  PaginationConfig,
  Range,
  UsePaginationBaseProps,
  defaults,
} from '@common';

export interface UseConfigResult extends UsePaginationBaseProps {
  pageCount: number;
  page: number;
  gap: ReactNode;
  boundaryCount: Range;
  siblingCount: Range;
}

/**
 *
 * Merge default options with options specified by user and normalizes properties that can store different values, e.g. `PaginationConfig.boundaryCount`.
 *
 * @param config - Pagination options
 *
 * @returns Returns merged and normalized config
 *
 * @example
 *
 * useConfig({ boundaryCount: 3, siblingCount: 2 });
 * \/*
 *   {
 *     pageCount: 0,
 *     page: 1,
 *     boundaryCount: { start: 3, end: 3 },
 *     siblingCount: { start: 2, end: 2 },
 *     gap: "...",
 *   };
 * *\/
 *
 */
export function useConfig(config: PaginationConfig): UseConfigResult {
  return useMemo(() => {
    function getNormalizedCount(count: PaginationConfig['boundaryCount']) {
      if (isNumber(count)) {
        return {
          start: count,
          end: count,
        };
      }

      return count;
    }

    const boundaryCount = getNormalizedCount(config.boundaryCount);
    const siblingCount = getNormalizedCount(config.siblingCount);

    const normalizedConfig = {
      ...defaults,
      ...config,
      boundaryCount: boundaryCount || defaults.boundaryCount,
      siblingCount: siblingCount || defaults.siblingCount,
    };

    return normalizedConfig;
  }, [config]);
}
