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
    <nav className={styles.paginator} aria-label={label} style={vars}>
      <ul className={styles.list}>
        {showFirst && <li>{renderItem(firstPage)}</li>}
        {showPrevious && <li>{renderItem(previousPage)}</li>}
        {items.map((item) => (
          <li>{renderItem(item)}</li>
        ))}
        {showNext && <li>{renderItem(nextPage)}</li>}
        {showLast && <li>{renderItem(lastPage)}</li>}
      </ul>
    </nav>
  );
}
