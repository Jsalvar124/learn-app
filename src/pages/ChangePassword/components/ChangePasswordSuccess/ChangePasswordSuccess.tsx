import { Link } from 'react-router-dom';
import { Button } from '../../../../components/common/Button';
import styles from './ChangePasswordSuccess.module.css';
import { IconCircleCheckOutline24 } from 'nucleo-core-essential-outline-24';

const ChangePasswordSuccess = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Password changed</h1>
    <div className={styles.icon}>
      <IconCircleCheckOutline24 />
    </div>
    <p className={styles.text}>Please proceed sign in with new password</p>
    <Link to="/login" className={styles.link}>
      <Button text="Sign In" variant="prime" />
    </Link>
  </div>
);

export default ChangePasswordSuccess;