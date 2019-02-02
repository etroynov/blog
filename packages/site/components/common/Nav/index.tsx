/**
 * Vendor
 */

import React from 'react';
import map from 'ramda/es/map';

/**
 * Interfaces
 */

import { INav, IList, IListItem } from './interfaces';

/**
 * Components
 */

const List: React.FunctionComponent<IList> = ({ items }) => (
  <ul>
    {map(
      item => (
        <Item {...item} />
      ),
      items
    )}
  </ul>
);

const Item: React.FunctionComponent<IListItem> = ({ title, link }) => (
  <li>
    <a href={link}>{title}</a>
  </li>
);

/**
 * Styles
 */

import styles from './styles.scss';

/**
 * Expo
 */

export default ({ classNames, items }): React.FunctionComponent<INav> => (
  <nav className={cn([classNames, styles.container])}>
    <List items={items} />
  </nav>
);
