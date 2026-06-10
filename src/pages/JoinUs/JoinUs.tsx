import { useState } from 'react';
import styles from './JoinUs.module.css';
import { JoinUsBox } from './components/JoinUsBox';
import { Registration } from '../Registration';
import type { Role } from '../../types';
import trainerImg from '../../assets/trainer-join-us.png';
import studentImg from '../../assets/student-join-us.png';

const JoinUs = () => {
  const [role, setRole] = useState<Role | null>(null);

  if (role) {
    return <Registration role={role} />;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Join Us</h1>
      <div className={styles.boxes}>
        <JoinUsBox
          role="trainer"
          image={trainerImg}
          onClick={() => setRole('trainer')}
        />
        <JoinUsBox
          role="student"
          image={studentImg}
          onClick={() => setRole('student')}
        />
      </div>
    </div>
  );
};

export default JoinUs;