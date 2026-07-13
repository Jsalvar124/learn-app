import styles from './SearchTrainings.module.css';
import { Input } from '../../../../components/common/Input';
import { Button } from '../../../../components/common/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
import { getUserRoleSelector } from '../../../../store/selectors';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

interface SearchTrainingsProps {
  onSearch: (filters: { fromDate?: string; toDate?: string; partnerUsername?: string; specialization?: string }) => void;
}


const SearchTrainings = ({onSearch}: SearchTrainingsProps) => {
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [partnerUsername, setPartnerUsername] = useState('');
  const [specialization, setSpecialization] = useState('');


  const handleSearch = () => {
    onSearch({
      fromDate: fromDate ? fromDate.format('YYYY-MM-DD') : undefined,
      toDate: toDate ? toDate.format('YYYY-MM-DD') : undefined,
      partnerUsername: partnerUsername || undefined,
      specialization: specialization || undefined,
  })
  }

  const role = useSelector(getUserRoleSelector);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Trainings</h2>
      <div className={styles.fields}>
        <Input
          label={role === 'TRAINER'? "Student name" : "Trainer name"}
          placeholder="First name"
          onChange={(e)=> setPartnerUsername(e.target.value)}
        />
        { role === "TRAINEE" &&  // Displayed only for trainees, trainers only have one specialization.      
        <Input
          label="Specialization"
          placeholder="Specialization"
          onChange={(e)=> setSpecialization(e.target.value)}
        />
        }
        <div className={styles.dateField}>
          <label className={styles.dateLabel}>From</label>
          <DatePicker
            slotProps={{ textField: { className: styles.datePickerInput } }}
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
          />
        </div>
        <div className={styles.dateField}>
          <label className={styles.dateLabel}>To</label>
          <DatePicker
            slotProps={{ textField: { className: styles.datePickerInput } }}
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
          />
        </div>
      </div>
      <Button text="Search" variant="prime" size='sm' onClick={handleSearch}/>
    </div>
  );
};

export default SearchTrainings;