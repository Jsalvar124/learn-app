import { Button } from '../../../../components/common/Button';
import styles from './Trainings.module.css';

interface TrainingsProps {
  description: string;
  onViewTrainings?: () => void;
}

const Trainings = ({ description, onViewTrainings }: TrainingsProps) => (
  <div className={styles.container}>
    <h2 className={styles.title}>My Trainings</h2>
    <p className={styles.description}>{description}</p>
    <Button text="View trainings" variant="prime" onClick={onViewTrainings} />
  </div>
);

export default Trainings;