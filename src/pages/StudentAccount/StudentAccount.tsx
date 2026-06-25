import { Profile } from './components/Profile';
import styles from './StudentAccount.module.css'
import { Trainers } from './components/Trainers';
import { Button } from '../../components/common/Button';
import { Trainings } from './components/Trainings';
import { useState } from 'react';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { EditProfile } from './components/EditProfile';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultAvatarSelector, getUserNameSelector, getUserProfileSelector, getUserRoleSelector } from '../../store/selectors';
import { Trainees } from './components/Trainees';
import { deleteTrainee } from '../../services/traineeService';
import { deactivateTrainer } from '../../services/trainerService';
import type { AppDispatch } from '../../store';
import { removeUserData } from '../../store/slices/userSlice';
import toast from 'react-hot-toast';

const StudentAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const role = useSelector(getUserRoleSelector);
    const username = useSelector(getUserNameSelector);
    const profile = useSelector(getUserProfileSelector);
    const avatar = useSelector(getDefaultAvatarSelector);


    const handleConfirmDelete = async () => {
        if (!username || !role) return;
        try{
            if(role === 'TRAINEE'){
                await deleteTrainee(username);
            } 
            else if(role === 'TRAINER') {
                await deactivateTrainer(username);
            }
            localStorage.removeItem("token");
            dispatch(removeUserData());
            navigate('/home');
            toast.success("Account deleted successfully.");

            } catch (err) {
              const message = err instanceof Error ? err.message : "Failed to delete account.";
              toast.error(message);
            } finally {
              setDeleteModalOpen(false)
            }
    }

    if (isEditing) {
        return (
        <div className={styles.page}>
            <h1 className={styles.title}>My Account</h1>
            <EditProfile 
                onCancel={() => setIsEditing(false)} 
                onSave={()=> setIsEditing(false)}
                />
        </div>
        );
    }

    if (!profile) {
    return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Account</h1>
    </div>
    );
    }

    return(
    <div className={styles.page}>
        <h1 className={styles.title}>My Account</h1>
        <div className={styles.top}>
            {/* Student Profile */}
            <Profile
                profile={profile}
                avatar={avatar}
            />
            {/* Student Trainers */}
            {profile && 'trainers' in profile && (
            <Trainers
                trainers={profile.trainers}
                onAddTrainer={() => console.log('add trainer')} //Not functional, trainers are added automatically by scheduling a training. just kept for the UI design.
            />
            )}
            {profile && 'trainees' in profile && (
            <Trainees
                trainees={profile.trainees}
            />
            )}
        </div>
        <div className={styles.actions}>
            <div className={styles.actionsLeft}>
                <Button text="Edit profile" variant="prime" onClick={() => setIsEditing(true)} />
                <Button text="Change Password" variant="secondary" onClick={() => navigate("/change-password")} />
            </div>
            <Button text="Delete profile" variant="important" onClick={() => setDeleteModalOpen(true)} />
        </div>
        <ConfirmModal
            open={deleteModalOpen}
            title="Profile Deletion Confirmation"
            description={`We're truly sorry to see you go. Before you proceed with deleting your profile, we want you to know that this action is permanent and irreversible. You'll lose access to all your account information, course progress, certificates, and any learning communities you're a part of.\n\nIf there's anything we can do to improve your experience or if you need assistance with any issues you've encountered, please reach out to our support team. We're always here to help.\n\nIf you still wish to delete your account, please click on the 'Confirm' button below.`}            confirmText="Confirm"
            cancelText="Cancel"
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteModalOpen(false)}
        />
        {/* Student Trainings */}
        <Trainings
            description="The Training Section is interactive, allowing you to engage with trainers and fellow learners, participate in quizzes, and track your progress. All our courses are flexible and adaptable to your schedule and learning speed."
            onViewTrainings={() => navigate("/trainings")}
        />
  </div>
)};

export default StudentAccount;