import { UsePaginationResult } from '@hooks';
import React, { PropsWithChildren, createContext } from 'react';

export interface PaginationProviderProps {
  pagination: UsePaginationResult;
}

export const paginationContext = createContext<UsePaginationResult | null>(
  null
);

export function PaginationProvider({
  children,
  pagination,
}: PropsWithChildren<PaginationProviderProps>) {
  return (
    <paginationContext.Provider value={pagination}>
      {children}
    </paginationContext.Provider>
  );
}
