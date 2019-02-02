export interface IList {
  items: IListItem[];
}

export interface IListItem {
  title: string;
  link: string;
}

export interface INav {
  classNames: string[];
  items: INavItem[];
}