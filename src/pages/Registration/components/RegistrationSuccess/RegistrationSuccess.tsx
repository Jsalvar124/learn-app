import { Button } from '../../../../components/common/Button';
import styles from './RegistrationSuccess.module.css';
import { IconCircleCheckOutline24 } from 'nucleo-core-essential-outline-24';

interface RegistrationSuccessProps {
  username: string;
  password: string;
}

const RegistrationSuccess = ({ username, password }: RegistrationSuccessProps) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Registration</h1>
    <div className={styles.icon}>
      <IconCircleCheckOutline24 />
    </div>
    <p className={styles.text}>
      Congratulations, you have successfully registered with Learn Platform!
      Here are your credentials that you can change in your account.
    </p>
    <div className={styles.credentials}>
      <div>
        <label className={styles.label}>User name</label>
        <p className={styles.value}>{username}</p>
      </div>
      <div>
        <label className={styles.label}>Password</label>
        <p className={styles.value}>{password}</p>
      </div>
    </div>
    <Button text="My account" variant="prime" />
  </div>
);

export default RegistrationSuccess;