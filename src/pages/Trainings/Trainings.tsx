import styles from './Trainings.module.css';
import { Button } from '../../components/common/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SearchTrainings } from './components/SearchTrainings';
import { PassedTrainings } from './components/PassedTrainings';
import type { Training } from '../../types';

const PASSED_TRAININGS: Training[] = [
  { date: '12.03.2023', name: 'JavaScript Course 1', type: 'Webinar', trainerName: 'Matthew Martinez', duration: '15 d' },
  { date: '12.03.2023', name: 'JS Course 2', type: 'Webinar', trainerName: 'Matthew Martinez', duration: '10 d' },
  { date: '12.03.2023', name: 'Java', type: 'Webinar', trainerName: 'Maria White', duration: '2 d' },
];

const Trainings = () => {
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

      <Button text="Add training" variant="secondary" />

      <SearchTrainings />

      <div className={styles.passedSection}>
        <h2 className={styles.passedTitle}>My passed trainings</h2>
        <PassedTrainings trainings={PASSED_TRAININGS} />
      </div>
    </div>
  );
};

export default Trainings;