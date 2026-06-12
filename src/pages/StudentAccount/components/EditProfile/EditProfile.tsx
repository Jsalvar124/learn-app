import { useState } from 'react';
import styles from './EditProfile.module.css';
import { Input } from '../../../../components/common/Input';
import { Button } from '../../../../components/common/Button';

interface EditProfileProps {
  avatar: string;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth?: string;
  address?: string;
  email: string;
  active: boolean;
  onCancel: () => void;
  onSave: (data: EditProfileData) => void;
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

const EditProfile = ({ avatar, firstName, lastName, userName, dateOfBirth, address, email, active, onCancel, onSave }: EditProfileProps) => {
  const [firstNameVal, setFirstNameVal] = useState(firstName);
  const [lastNameVal, setLastNameVal] = useState(lastName);
  const [userNameVal, setUserNameVal] = useState(userName);
  const [dateOfBirthVal, setDateOfBirthVal] = useState(dateOfBirth ?? '');
  const [addressVal, setAddressVal] = useState(address ?? '');
  const [emailVal, setEmailVal] = useState(email);
  const [activeVal, setActiveVal] = useState(active);
  const [avatarVal, setAvatarVal] = useState(avatar);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarVal(url);
    }
  };

  const handleRemove = () => setAvatarVal('');

  const handleSave = () => {
    onSave({
      firstName: firstNameVal,
      lastName: lastNameVal,
      userName: userNameVal,
      dateOfBirth: dateOfBirthVal,
      address: addressVal,
      email: emailVal,
      active: activeVal,
      avatar: avatarVal,
    });
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
        <Input label="Date of birth" type="date" placeholder="DD.MM.YYYY" value={dateOfBirthVal} onChange={e => setDateOfBirthVal(e.target.value)} />
        <Input label="Address" placeholder="Address" value={addressVal} onChange={e => setAddressVal(e.target.value)} />
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