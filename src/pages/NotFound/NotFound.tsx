import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import { Button } from '../../components/common/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.subtitle}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Button text="Back to Home" variant="prime" onClick={() => navigate('/home')} />
    </div>
  );
};

export default NotFound;