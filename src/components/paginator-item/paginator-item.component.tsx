import React from 'react';
import { PaginationGap, PaginationItemType, PaginationPage } from '@common';
import ArrowIcon from '@assets/arrow.svg';
import DoubleArrowIcon from '@assets/double-arrow.svg';

export type PaginatorItemProps<P> = {
  Link: React.FC<P>;
  item: PaginationPage | PaginationGap;
} & P;

const icons = {
  [PaginationItemType.FirstPage]: <DoubleArrowIcon />,
  [PaginationItemType.PreviousPage]: <ArrowIcon />,
  [PaginationItemType.NextPage]: <ArrowIcon />,
  [PaginationItemType.LastPage]: <DoubleArrowIcon />,
};

export function PaginatorItem<P>(props: PaginatorItemProps<P>) {
  const {
    Link,
    item: { type, value },
    ...rest
  } = props;
  const linkProps = rest as P;

  if (type === PaginationItemType.Page) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Link {...linkProps}>
        <span>{value}</span>
      </Link>
    );
  }

  if (
    type === PaginationItemType.StartGap ||
    type === PaginationItemType.EndGap
  ) {
    return <span>{value}</span>;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...linkProps} data-type={type} aria-label={type}>
      {icons[type]}
    </Link>
  );
}
