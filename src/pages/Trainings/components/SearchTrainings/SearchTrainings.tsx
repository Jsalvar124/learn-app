import styles from './SearchTrainings.module.css';
import { Input } from '../../../../components/common/Input';
import { Button } from '../../../../components/common/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SearchTrainings = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Trainings</h2>
      <div className={styles.fields}>
        <Input
          label="Trainer name"
          placeholder="First name"
        />
        <Input
          label="Specialization"
          placeholder="First name"
        />
        <div className={styles.dateField}>
          <label className={styles.dateLabel}>From</label>
          <DatePicker
            slotProps={{ textField: { className: styles.datePickerInput } }}
          />
        </div>
        <div className={styles.dateField}>
          <label className={styles.dateLabel}>To</label>
          <DatePicker
            slotProps={{ textField: { className: styles.datePickerInput } }}
          />
        </div>
      </div>
      <Button text="Search" variant="prime" size='sm'/>
    </div>
  );
};

export default SearchTrainings;