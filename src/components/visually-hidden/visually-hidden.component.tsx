import React, { PropsWithChildren } from 'react';
import styles from './visually-hidden.module.scss';

export function VisuallyHidden({ children }: PropsWithChildren) {
  return <span className={styles.visuallyHidden}>{children}</span>;
}
