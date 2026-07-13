import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { IconChevronDownOutline24 } from 'nucleo-core-essential-outline-24';
import styles from './AddTraining.module.css';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { getAllTraineesSelector, getTraineesLastFetchedSelector, getUserNameSelector } from '../../store/selectors';
import { getAllTraineesThunk } from '../../store/thunks/traineeThunk';
import { createTraining } from '../../services/trainingService';
import type { AppDispatch } from '../../store';
import { IconTriangleWarningOutline24 } from 'nucleo-core-essential-outline-24';
import { getUserProfileSelector } from '../../store/selectors';


const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const AddTraining = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const lastFetched = useSelector(getTraineesLastFetchedSelector);
  const trainees = useSelector(getAllTraineesSelector);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTraineeUsername, setSelectedTraineeUsername] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false); // used to disable button during submision.
  const profile = useSelector(getUserProfileSelector);
  const username = useSelector(getUserNameSelector);

  useEffect(() => {
    const isStale = !lastFetched || Date.now() - lastFetched > CACHE_DURATION;
    if (isStale) {
      dispatch(getAllTraineesThunk());
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Training name is required';
    if (!date) newErrors.date = 'Training date is required';
    if (!duration) newErrors.duration = 'Duration is required';
    if (!selectedTraineeUsername) newErrors.trainee = 'Please select a trainee';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if(!username) return;

    setIsSubmitting(true);
    try {
      await createTraining({
        trainingName: name,
        trainingDate: date,
        trainerUsername: username,
        trainingDuration: Number(duration),
        traineeUsername: selectedTraineeUsername,
      });
      toast.success('Training added successfully!');
      navigate('/trainings');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add training.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'My Account', to: '/my-account' },
          { label: 'Trainings', to: '/trainings' },
          { label: 'Add training' },
        ]}
      />

      <h1 className={styles.title}>Add training</h1>

      <div className={styles.grid}>
        <div className={styles.fields}>
          <h2 className={styles.sectionTitle}>Training</h2>

          <Input
            label="Name"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            state={errors.name ? 'error' : 'default'}
            errorMessage={errors.name}
          />

          <Input
            label="Training start date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            state={errors.date ? 'error' : 'default'}
            errorMessage={errors.date}
          />

          <Input
            label="Duration"
            type="number"
            placeholder="Enter duration in minutes"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            state={errors.duration ? 'error' : 'default'}
            errorMessage={errors.duration}
          />

          <div>
            <label className={styles.label}>Type</label>
            <p className={styles.readOnlyValue}>{profile && 'specialization' in profile ? profile.specialization : ''}</p>
          </div>

          <div>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              placeholder="Enter item description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>Select trainee</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={selectedTraineeUsername}
              onChange={(e) => setSelectedTraineeUsername(e.target.value)}
            >
              <option value="">Please select</option>
              {trainees.map((trainee) => (
                <option key={trainee.username} value={trainee.username}>
                  {trainee.firstName} {trainee.lastName} - ({trainee.username})
                </option>
              ))}
            </select>
            <span className={styles.selectArrow}>
              <IconChevronDownOutline24 />
            </span>
          </div>
            {errors.trainee && 
            <p className={styles.errorMessage}>
                <IconTriangleWarningOutline24 />
                {errors.trainee}
            </p>}
        </div>
      </div>

      <div className={styles.actions}>
        <Button text="Cancel" variant="secondary" onClick={() => navigate('/trainings')} />
        <Button text="Add" variant="prime" onClick={handleSubmit} disabled={isSubmitting} type="button" />
      </div>
    </div>
  );
};

export default AddTraining;