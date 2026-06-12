import { Profile } from './components/Profile';
import styles from './StudentAccount.module.css'
import avatar from '../../assets/student-avatar-cropped.png'
import { Trainers } from './components/Trainers';
import { Button } from '../../components/common/Button';
import { Trainings } from './components/Trainings';

const StudentAccount = () => (
    <div className={styles.page}>
        <h1 className={styles.title}>My Account</h1>
        <div className={styles.top}>
            {/* Student Profile */}
            <Profile
                avatar={avatar}
                status="Active"
                firstName="Marta"
                lastName="Black"
                userName="Marta_st"
                dateOfBirth="01.01.2001"
                address="123 Main Street Boston, MA 02108"
                email="marta_12334@gmail.com"
            />
            {/* Student Trainers */}
            <Trainers
                trainers={[
                    { name: 'Elizabeth Lopez', specialization: 'PHP' },
                    { name: 'Matthew Martinez', specialization: 'JavaScript' },
                    { name: 'Elizabeth Hall', specialization: 'Algorithms' },
                    { name: 'Maria White', specialization: 'Java' },
                ]}
                onAddTrainer={() => console.log('add trainer')}
            />

        </div>
        <div className={styles.actions}>
        <div className={styles.actionsLeft}>
            <Button text="Edit profile" variant="prime" onClick={() => console.log('edit profile')} />
            <Button text="Change Password" variant="secondary" onClick={() => console.log('change password')} />
        </div>
        <Button text="Delete profile" variant="important" onClick={() => console.log('delete profile')} />
        </div>
        {/* <StudentTrainings /> */}
        <Trainings
            description="The Training Section is interactive, allowing you to engage with trainers and fellow learners, participate in quizzes, and track your progress. All our courses are flexible and adaptable to your schedule and learning speed."
            onViewTrainings={() => console.log('view trainings')}
        />
  </div>

);

export default StudentAccount;