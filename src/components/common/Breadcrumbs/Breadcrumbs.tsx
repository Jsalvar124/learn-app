import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => (
  <nav className={`${styles.breadcrumb} ${className ?? ''}`}>
    {items.map((item, index) => {
      const isLast = index === items.length - 1;
      return (
        <span key={`${item.label}-${index}`} className={styles.item}>
          {item.to && !isLast ? (
            <Link to={item.to} className={styles.link}>{item.label}</Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
          {!isLast && <span className={styles.separator}>{'>'}</span>}
        </span>
      );
    })}
  </nav>
);

export default Breadcrumbs;