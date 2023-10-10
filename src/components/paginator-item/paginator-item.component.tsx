import React from 'react';
import { PaginationGap, PaginationItemType, PaginationPage } from '@common';
import ArrowIcon from '@assets/arrow.svg';
import DoubleArrowIcon from '@assets/double-arrow.svg';
import { VisuallyHidden } from '@components/visually-hidden/visually-hidden.component';
import styles from './paginator-item.module.scss';

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

/**
 * Component for rendering single pagination item
 *
 * @param props
 * @returns Element
 *
 * @example
 *
 * <Paginator ... renderItem={(item) => <PaginatorItem Link={() => ...} item={item} />}
 */
export function PaginatorItem<P>(props: PaginatorItemProps<P>) {
  const {
    Link,
    item: { type, value, isCurrent },
    ...rest
  } = props;
  const linkProps = rest as P;

  if (type === PaginationItemType.Page) {
    return (
      <Link
        className={styles.item}
        aria-current={isCurrent && 'page'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...linkProps}
      >
        <span className={styles.page}>
          <VisuallyHidden>page</VisuallyHidden> {value}
        </span>
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
    <Link
      className={styles.item}
      data-type={type}
      aria-label={type}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...linkProps}
    >
      {icons[type]}
    </Link>
  );
}
