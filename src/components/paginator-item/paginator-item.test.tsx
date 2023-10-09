import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { createPaginationItem } from '@utils';
import { PaginationItemType, defaults } from '@common';
import { UseConfigResult } from '@hooks';
import { PaginatorItem } from './paginator-item.component';
import '@testing-library/jest-dom';

interface LinkProps {
  to: string;
  children?: ReactNode;
}

function Link({ to, children }: LinkProps) {
  return <a href={to}>{children}</a>;
}

describe('PaginatorItem', () => {
  it('should render Link if pagination item is PaginationPage', () => {
    render(
      <PaginatorItem
        item={createPaginationItem(1, defaults as UseConfigResult)}
        Link={Link}
        to="foo"
      />
    );

    render(
      <PaginatorItem
        item={createPaginationItem(
          { value: 2, type: PaginationItemType.NextPage },
          defaults as UseConfigResult
        )}
        Link={Link}
        to="foo"
      />
    );

    expect(screen.queryByRole('link', { name: /page 1/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'next page' }));
  });

  it('should render gap if pagination item type is start-gap or end-gap', () => {
    render(
      <PaginatorItem
        item={createPaginationItem(
          PaginationItemType.StartGap,
          defaults as UseConfigResult
        )}
        Link={Link}
        to="foo"
      />
    );

    expect(screen.queryByText('...')).toBeInTheDocument();
  });
});
