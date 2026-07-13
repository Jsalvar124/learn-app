import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePassword.module.css';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ChangePasswordSuccess } from './components/ChangePasswordSuccess';
import {
  IconLockOutline24,
  IconEye2Outline24,
  IconEye2SlashOutline24,
} from 'nucleo-core-essential-outline-24';
import { changePassword } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNameSelector } from '../../store/selectors';
import type { AppDispatch } from '../../store';
import { removeUserData } from '../../store/slices/userSlice';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector(getUserNameSelector);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your new password';
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return; // Auth is needed

    if (!validate()) return;
    try {
      await changePassword({ username, oldPassword: currentPassword, newPassword });
      setIsSubmitted(true);
      toast.success("Password changed successfully")
      localStorage.removeItem('token');
      dispatch(removeUserData());
      navigate('/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid credentials.";
      setErrors({ form: message });
    }
  };

  const handleCancel = () => {
    navigate('/my-account');
  };

  if (isSubmitted) {
    return (
      <div className={styles.page}>
        <ChangePasswordSuccess />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Security</h1>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarItem}>
            <IconLockOutline24 />
            <span>Change Password</span>
          </div>
        </div>

        <form className={styles.card} onSubmit={handleSubmit}>
          <Input
            label="Current password"
            placeholder="Enter current password"
            type={showCurrent ? 'text' : 'password'}
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            iconRight={showCurrent ? <IconEye2SlashOutline24 /> : <IconEye2Outline24 />}
            iconRightTooltip={showCurrent ? 'Hide password' : 'Show password'}
            onIconRightClick={() => setShowCurrent(!showCurrent)}
            state={errors.currentPassword ? 'error' : 'default'}
          />

          <Input
            label="New password"
            placeholder="Enter new password"
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            iconRight={showNew ? <IconEye2SlashOutline24 /> : <IconEye2Outline24 />}
            iconRightTooltip={showNew ? 'Hide password' : 'Show password'}
            onIconRightClick={() => setShowNew(!showNew)}
            state={errors.newPassword ? 'error' : 'default'}
          />

          <Input
            label="Confirm new password"
            placeholder="Confirm new password"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            iconRight={showConfirm ? <IconEye2SlashOutline24 /> : <IconEye2Outline24 />}
            iconRightTooltip={showConfirm ? 'Hide password' : 'Show password'}
            onIconRightClick={() => setShowConfirm(!showConfirm)}
            state={errors.confirmPassword ? 'error' : 'default'}
            errorMessage={errors.confirmPassword ? errors.confirmPassword : undefined}
          />
          {errors.form && <p className={styles.errorMessage}>{errors.form}</p>}
          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            <Button text="Change password" variant="prime" type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;