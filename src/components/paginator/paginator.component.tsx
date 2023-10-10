import React, { CSSProperties, JSX, useMemo } from 'react';
import { usePagination } from '@hooks/use-pagination/use-pagination.hook';
import { PaginatorProps } from './paginator.props';
import styles from './paginator.module.scss';

const defaultStyle = {
  colors: {
    primary: '#000',
    secondary: '#bbb',
  } as Record<string, string>,
  variants: {
    outlined: '1px solid #000',
    text: 'none',
  },
  shapes: {
    circular: '50%',
    rounded: '0.15rem',
    square: '0',
  },
  sizes: {
    small: '0.875rem',
    medium: '0.95rem',
    large: '1.15rem',
  },
  spacing: '0.15rem',
} as const;

/**
 * Main component, displays pagination.
 *
 * @param props
 *
 * @returns React.JSX.Element
 *
 * @example
 *
 * <Paginator pageCount={100} page={2} renderItem={(item: PaginationPage | PaginationGap) => <PaginatorItem .../>}/>
 *
 * <Paginator total={1000} perPage={10} page={2} renderItem={(item: PaginationPage | PaginationGap) => <PaginatorItem .../>}/>
 */
export function Paginator(props: PaginatorProps): JSX.Element {
  const {
    showNext = true,
    renderItem,
    showFirst = true,
    showPrevious = true,
    showLast = true,
    label = 'pagination',
    shape = 'circular',
    variant = 'text',
    size = 'small',
    spacing = 3,
    color = 'primary',
    classNames,
    ...usePaginationConfig
  } = props;
  const pagination = usePagination(usePaginationConfig);
  const { items, firstPage, previousPage, nextPage, lastPage } = pagination;

  const vars = useMemo(
    () =>
      ({
        '--item-color': defaultStyle.colors[color] || color,
        '--item-variant': defaultStyle.variants[variant],
        '--item-size': defaultStyle.sizes[size],
        '--item-shape': defaultStyle.shapes[shape],
        '--item-spacing': `calc(${defaultStyle.spacing} * ${spacing})`,
      } as CSSProperties),
    [color, variant, size, shape, spacing]
  );

  return (
    <nav
      className={classNames?.paginator || styles.paginator}
      aria-label={label}
      style={vars}
    >
      <ul className={classNames?.paginatorList || styles.list}>
        {showFirst && (
          <li className={classNames?.controls}>{renderItem(firstPage)}</li>
        )}
        {showPrevious && (
          <li className={classNames?.controls}>{renderItem(previousPage)}</li>
        )}
        {items.map((item) => (
          <li
            key={item.value as number}
            className={item.isCurrent ? classNames?.current : ''}
          >
            {renderItem(item)}
          </li>
        ))}
        {showNext && (
          <li className={classNames?.controls}>{renderItem(nextPage)}</li>
        )}
        {showLast && (
          <li className={classNames?.controls}>{renderItem(lastPage)}</li>
        )}
      </ul>
    </nav>
  );
}
