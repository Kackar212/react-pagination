import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { render, screen } from '@testing-library/react';
import { PaginatorItem } from '@components/paginator-item/paginator-item.component';
import { PaginationGap, PaginationPage } from '@common';
import { Paginator } from './paginator.component';
import '@testing-library/jest-dom';

function Link({
  to,
  children,
  ...attrs
}: { to: string; children?: string } & DetailedHTMLProps<
  HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a href={to} {...attrs}>
      {children}
    </a>
  );
}

const renderItem = (item: PaginationPage | PaginationGap) => (
  <PaginatorItem Link={Link} item={item} to={`/abcd/${item.value}`}>
    asdasd
  </PaginatorItem>
);

describe('Paginator', () => {
  it('should render without errors', () => {
    render(<Paginator renderItem={renderItem} pageCount={100} page={1} />);
  });

  it('should not render first/previous/next/last page link if corresponding prop is set to false', async () => {
    render(
      <Paginator
        renderItem={renderItem}
        pageCount={100}
        page={1}
        showPrevious={false}
        showNext={false}
        showFirst={false}
        showLast={false}
      />
    );

    const previousPage = screen.queryByRole('link', { name: 'previous page' });
    const nextPage = screen.queryByRole('link', { name: 'next page' });
    const firstPage = screen.queryByRole('link', { name: 'first page' });
    const lastPage = screen.queryByRole('link', { name: 'last page' });

    expect(previousPage).not.toBeInTheDocument();
    expect(nextPage).not.toBeInTheDocument();
    expect(firstPage).not.toBeInTheDocument();
    expect(lastPage).not.toBeInTheDocument();
  });

  it('should render first/previous/next/last page link if corresponding prop is set to true. True is default value', () => {
    render(<Paginator renderItem={renderItem} pageCount={100} page={1} />);

    const previousPage = screen.queryByRole('link', { name: /previous page/ });
    const nextPage = screen.queryByRole('link', { name: 'next page' });
    const firstPage = screen.queryByRole('link', { name: 'first page' });
    const lastPage = screen.queryByRole('link', { name: 'last page' });

    expect(previousPage).toBeInTheDocument();
    expect(nextPage).toBeInTheDocument();
    expect(firstPage).toBeInTheDocument();
    expect(lastPage).toBeInTheDocument();
  });

  it('should render nav with specified aria-label', () => {
    render(<Paginator renderItem={renderItem} pageCount={100} page={1} />);
    render(
      <Paginator renderItem={renderItem} pageCount={100} page={1} label="Foo" />
    );

    const nav = screen.queryByRole('navigation', { name: 'pagination' });
    expect(nav).toBeInTheDocument();

    expect(
      screen.queryByRole('navigation', { name: 'Foo' })
    ).toBeInTheDocument();
  });

  it('should use classNames specified by user', () => {
    render(
      <Paginator
        renderItem={renderItem}
        pageCount={100}
        page={1}
        classNames={{
          paginator: 'a',
          paginatorList: 'b',
          controls: 'c',
          current: 'd',
        }}
      />
    );

    const nav = screen.queryByRole('navigation', { name: 'pagination' });
    const list = nav?.querySelector('ul');
    const controls = list?.querySelector('li:last-of-type');
    const current = list?.querySelector('li:nth-child(3)');

    expect(nav?.className).toBe('a');
    expect(list?.className).toBe('b');
    expect(controls?.className).toBe('c');
    expect(current?.className).toBe('d');
  });

  it('should let user pass any valid css color', () => {
    render(
      <Paginator
        renderItem={renderItem}
        pageCount={100}
        page={1}
        color="#421422"
      />
    );

    const nav = screen.queryByRole('navigation', { name: 'pagination' });

    expect(nav?.style.getPropertyValue('--item-color')).toBe('#421422');
  });
});
