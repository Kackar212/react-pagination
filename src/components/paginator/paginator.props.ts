import {
  PaginationConfig,
  PaginationGap,
  PaginationPage,
  Shape,
  Size,
  Variant,
} from '@common';

export interface PaginatorPropsBase {
  /**
   * If `true` then previous page link is rendered
   */
  showPrevious?: boolean;
  /**
   * If `true` then first page link is rendered
   */
  showFirst?: boolean;
  /**
   * If `true` then next page link is rendered
   */
  showNext?: boolean;
  /**
   * If `true` then last page link is rendered
   */
  showLast?: boolean;
  /**
   * What is returned by this function will be rendered as pagination item
   */
  renderItem: (item: PaginationPage | PaginationGap) => JSX.Element;
  /**
   * Aria-label for `nav`
   */
  label?: string;
  /**
   * Variant of the items
   */
  variant?: Variant;
  /**
   * Shape of the items
   */
  shape?: Shape;
  /**
   * Size of the items
   */
  size?: Size;
  /**
   * Spacing between items
   */
  spacing?: number;
  /**
   * Color of the items
   */
  color?: string;
  classNames?: {
    /**
     * Class name for paginator container
     */
    paginator: string;
    /**
     * Class name for paginator list
     */
    paginatorList: string;
    /**
     * Class name used for first/previous/next/last page
     */
    controls: string;
    /**
     * Class name used for current page
     */
    current: string;
  };
}

export type PaginatorProps = PaginationConfig & PaginatorPropsBase;
