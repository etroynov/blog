
import styles from './index.module.css';

export function Block({ children }: any) {
  return (
    <div className={ styles.container }>{children}</div>
  );
}
