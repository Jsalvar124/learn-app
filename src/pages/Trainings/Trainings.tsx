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

const Trainings = () => {
  const username = useSelector(getUserNameSelector);
  const role = useSelector(getUserRoleSelector);

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<{ fromDate?: string; toDate?: string; partnerUsername?: string; specialization?: string }>({});

  useEffect(() => {
    if (!username || !role) return;

    const fetchTrainings = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = role === 'TRAINER'
          ? await getTrainerTrainings(username)
          : await getTraineeTrainings(username); 
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

  
  const filteredTrainings = trainings.filter((t) => {
    if (filters.fromDate && t.trainingDate < filters.fromDate) return false;
    if (filters.toDate && t.trainingDate > filters.toDate) return false;

    const partnerName = 'trainerName' in t ? t.trainerName : t.traineeName;
    if (filters.partnerUsername && !partnerName.toLowerCase().includes(filters.partnerUsername.toLowerCase())) return false;

    if (filters.specialization && t.trainingType !== filters.specialization) return false;

    return true;
  });

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

      <SearchTrainings onSearch={setFilters}/>

      <div className={styles.passedSection}>
        <h2 className={styles.passedTitle}>{role === 'TRAINER' ? "Results" : "My passed trainings"}</h2>
        <PassedTrainings trainings={filteredTrainings} />
      </div>
    </div>
  );
};

export default Trainings;