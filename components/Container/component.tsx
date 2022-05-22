
import styles from './index.module.css';

export function Container({ children }: any) {
  return (
    <div className={ styles.container }>{children}</div>
  );
}
