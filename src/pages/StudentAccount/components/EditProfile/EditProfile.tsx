import { useState } from 'react';
import styles from './EditProfile.module.css';
import { Input } from '../../../../components/common/Input';
import { Button } from '../../../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultAvatarSelector, getUserProfileSelector, getUserRoleSelector } from '../../../../store/selectors';
import type { Trainer } from '../../../../types/user';
import { updateUserThunk } from '../../../../store/thunks/userThunk';
import type { AppDispatch } from '../../../../store';

interface EditProfileProps {
  onCancel: () => void;
  onSave: () => void;
}

export interface EditProfileData {
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth?: string;
  address?: string;
  email: string;
  active: boolean;
  avatar: string;
}

const EditProfile = ({ onCancel, onSave }: EditProfileProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(getUserProfileSelector); // Trainer | Trainee | null — no cast
  const role = useSelector(getUserRoleSelector);
  const isTrainee = role === 'TRAINEE';

  const [firstNameVal, setFirstNameVal] = useState(profile?.firstName ?? '');
  const [lastNameVal, setLastNameVal] = useState(profile?.lastName ?? '');
  const [userNameVal, setUserNameVal] = useState(profile?.username ?? '');
  const [emailVal, setEmailVal] = useState(profile?.email ?? '');
  const [activeVal, setActiveVal] = useState(profile?.active ?? true);
  const [avatarVal, setAvatarVal] = useState(useSelector(getDefaultAvatarSelector));

  const [dateOfBirthVal, setDateOfBirthVal] = useState(
    profile && 'dateOfBirth' in profile ? profile.dateOfBirth : ''
  );
  const [addressVal, setAddressVal] = useState(
    profile && 'address' in profile ? profile.address : ''
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarVal(url);
    }
  };

  const handleRemove = () => setAvatarVal('');

  const handleSave = async () => {
    if (!profile || !role) return;
    const data = isTrainee
      ? {
          username: userNameVal,
          firstName: firstNameVal,
          lastName: lastNameVal,
          dateOfBirth: dateOfBirthVal,
          address: addressVal,
          isActive: activeVal,
          email: emailVal,
        }
      : {
          username: userNameVal,
          firstName: firstNameVal,
          lastName: lastNameVal,
          specialization: (profile as Trainer).specialization, // unchanged, since we're not editing it
          isActive: activeVal,
          email: emailVal,
        };
        await dispatch(updateUserThunk({ username: profile.username, role, data }));
        onSave(); // from parent, closesEditComponent
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit profile</h2>

      <div className={styles.photoSection}>
        <span className={styles.photoLabel}>Profile photo</span>
        <div className={styles.photoRow}>
          <div className={styles.avatar}>
            {avatarVal && <img src={avatarVal} alt="avatar" />}
          </div>
          <div className={styles.photoActions}>
            <p className={styles.uploadTitle}>Upload your photo</p>
            <p className={styles.uploadHint}>Your photo should be in PNG or JPG format</p>
            <div className={styles.photoButtons}>
              <label className={styles.chooseImage}>
                Choose image
                <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} hidden />
              </label>
              <button className={styles.removeButton} onClick={handleRemove}>Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fields}>
        <Input label="First name" placeholder="First name" value={firstNameVal} onChange={e => setFirstNameVal(e.target.value)} />
        <Input label="Last name" placeholder="Last name" value={lastNameVal} onChange={e => setLastNameVal(e.target.value)} />
        <Input label="User name" placeholder="User name" value={userNameVal} onChange={e => setUserNameVal(e.target.value)} />
        {isTrainee && (
          <>
            <Input label="Date of birth" type="date" placeholder="DD.MM.YYYY" value={dateOfBirthVal} onChange={e => setDateOfBirthVal(e.target.value)} />
            <Input label="Address" placeholder="Address" value={addressVal} onChange={e => setAddressVal(e.target.value)} />
          </>
        )}
        <Input label="Email" placeholder="Email" value={emailVal} onChange={e => setEmailVal(e.target.value)} />
      </div>

      <div className={styles.toggleRow}>
        <span className={styles.toggleLabel}>Active</span>
        <button
          className={`${styles.toggle} ${activeVal ? styles.toggleOn : styles.toggleOff}`}
          onClick={() => setActiveVal(!activeVal)}
        >
          <span className={styles.toggleCircle} />
        </button>
      </div>

      <div className={styles.formActions}>
        <Button text="Cancel" variant="secondary" onClick={onCancel} />
        <Button text="Save" variant="prime" onClick={handleSave} />
      </div>
    </div>
  );
};

export default EditProfile;