import styles from './JoinUs.module.css';
import { JoinUsBox } from './components/JoinUsBox';
import trainerImg from '../../assets/trainer-join-us.png';
import studentImg from '../../assets/student-join-us.png';
import { useNavigate } from 'react-router-dom';

const JoinUs = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Join Us</h1>
      <div className={styles.boxes}>
        <JoinUsBox
          role="trainer"
          image={trainerImg}
          onClick={() => navigate('/registration?role=trainer')}
        />
        <JoinUsBox
          role="student"
          image={studentImg}
          onClick={() => navigate('/registration?role=student')}
        />
      </div>
    </div>
  );
};

export default JoinUs;