import { FC } from 'react';

import styles from './index.module.css';

export const Block: FC = ({ children }) => (
  <div className={ styles.container }>{children}</div>
);
