import { useState } from 'react';
import styles from './Registration.module.css';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { IconChevronDownOutline24 } from 'nucleo-core-essential-outline-24';
import { RegistrationSuccess } from './components/RegistrationSuccess';
import type { Role } from '../../types';
import trainerImg from '../../assets/trainer-registration.png';
import studentImg from '../../assets/student-registration.png';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';


interface RegistrationProps {
  role: Role;
}

const Registration = ({ role }: RegistrationProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (role === 'trainer' && !specialization) newErrors.specialization = 'Specialization is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setCredentials({
          username: `${firstName.toLowerCase()}_${Math.floor(Math.random() * 1000)}`,
          password: Math.random().toString(36).slice(-8)
        });
        setIsLoading(false);
        setIsSubmitted(true);
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <RegistrationSuccess
            username={credentials.username}
            password={credentials.password}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <span className={styles.spinner} />
              <p>Loading...</p>
            </div>
          )}
            <h1 className={styles.title}>Registration</h1>
            <p className={styles.role}>{role === 'trainer' ? 'Trainer' : 'Student'}</p>

          <div className={styles.content}>
            <img
              src={role === 'trainer' ? trainerImg : studentImg}
              alt="registration"
              className={styles.image}
            />
            <div className={styles.form}>
              <div className={styles.fields}>
                <Input
                  label="First name"
                  placeholder="Input text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  state={errors.firstName ? 'error' : 'default'}
                />
                <Input
                  label="Last name"
                  placeholder="Input text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  state={errors.lastName ? 'error' : 'default'}
                />

                {role === 'student' && (
                  <>
                    <Input
                      label="Date of Birth"
                      placeholder="Input text"
                      type="date"
                      value={dateOfBirth}
                      onChange={e => setDateOfBirth(e.target.value)}
                    />
                    <Input
                      label="Address"
                      placeholder="Input text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </>
                )}

                {role === 'trainer' && (
                  <div>
                    <label className={styles.role}>Specialization</label>
                    <div className={styles.selectWrapper}>
                      <select
                        className={styles.select}
                        value={specialization}
                        onChange={e => setSpecialization(e.target.value)}
                      >
                        <option value="">Please select</option>
                        <option value="math">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="language">Language</option>
                        <option value="programming">Programming</option>
                      </select>
                      <span className={styles.selectArrow}>
                        <IconChevronDownOutline24 />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.submitButton}>
                <Button
                  text="Submit"
                  variant="prime"
                  fullWidth
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;