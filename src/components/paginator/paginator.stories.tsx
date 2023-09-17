import { type Meta, type StoryObj } from '@storybook/react';
import { PaginatorItem } from '@components/paginator-item/paginator-item.component';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PaginationGap, PaginationPage } from '@common';
import { Paginator } from './paginator.component';

const meta = {
  title: 'Paginator',
  component: Paginator,
} satisfies Meta<typeof Paginator>;

export default meta;

type Story = StoryObj<typeof Paginator>;

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

const argTypes = {
  gap: {
    control: 'select',
    options: ['empty', 'string(default)', 'element'],
    defaultValue: 'string(default)',
    mapping: {
      empty: '',
      default: '...',
      element: <span style={{ fontSize: '20px' }}>...</span>,
    },
  },
};

export const Default: Story = {
  args: {
    page: 10,
    pageCount: 100,
    renderItem,
  },
};

export const Playground: Story = {
  args: {
    page: 10,
    boundaryCount: { start: 3, end: 1 },
    siblingCount: { start: 1, end: 3 },
    pageCount: 100,
    renderItem,
  },
  argTypes,
};
