import styles from './Trainings.module.css';
import { Button } from '../../components/common/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SearchTrainings } from './components/SearchTrainings';
import { PassedTrainings } from './components/PassedTrainings';
import type { Training } from '../../types';
import { useEffect, useState } from 'react';
import { getUserNameSelector, getUserRoleSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { getTrainerTrainings, getTraineeTrainings } from '../../services/trainingService';


// const PASSED_TRAININGS: Training[] = [
//   { date: '12.03.2023', name: 'JavaScript Course 1', type: 'Webinar', trainerName: 'Matthew Martinez', duration: '15 d' },
//   { date: '12.03.2023', name: 'JS Course 2', type: 'Webinar', trainerName: 'Matthew Martinez', duration: '10 d' },
//   { date: '12.03.2023', name: 'Java', type: 'Webinar', trainerName: 'Maria White', duration: '2 d' },
// ];

const Trainings = () => {
  const username = useSelector(getUserNameSelector);
  const role = useSelector(getUserRoleSelector);

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    if (!username || !role) return;

    const fetchTrainings = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = role === 'TRAINER'
          ? await getTrainerTrainings(username)
          : await getTraineeTrainings(username); // once confirmed
        console.log(data)
        setTrainings(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load trainings.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainings();
  }, [username, role]);

  return (
    <div className={styles.page}>
      <Breadcrumbs
        className={styles.breadcrumb}
        items={[
          { label: 'My Account', to: '/my-account' },
          { label: 'Trainings' },
        ]}
      />

      <h1 className={styles.title}>Trainings</h1>

      {role === 'TRAINEE' &&
      <Button text="Add training" variant="secondary" />
      }

      <SearchTrainings />

      <div className={styles.passedSection}>
        <h2 className={styles.passedTitle}>{role === 'TRAINER' ? "Results" : "My passed trainings"}</h2>
        <PassedTrainings trainings={trainings} />
      </div>
    </div>
  );
};

export default Trainings;