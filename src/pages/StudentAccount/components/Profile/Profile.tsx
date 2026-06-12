import styles from './Profile.module.css';

interface ProfileProps {
  avatar: string;
  status: string;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth?: string;
  address?: string;
  email: string;
}

const Profile = ({avatar, status, firstName, lastName, userName, dateOfBirth, address, email}: ProfileProps) => {
    
    return(
    <div className={styles.container}>
        <h2 className={styles.title}>My profile</h2>

        <div className={styles.top}>
        <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
        </div>
        <div className={styles.status}>
            <span className={styles.statusLabel}>Status</span>
            <span className={styles.statusValue}>✓ {status}</span>
        </div>
        </div>

        <div className={styles.fields}>
        <div className={styles.field}>
            <span className={styles.fieldLabel}>First Name</span>
            <span className={styles.fieldValue}>{firstName}</span>
        </div>
        <div className={styles.field}>
            <span className={styles.fieldLabel}>Last Name</span>
            <span className={styles.fieldValue}>{lastName}</span>
        </div>
        <div className={styles.field}>
            <span className={styles.fieldLabel}>User Name</span>
            <span className={styles.fieldValue}>{userName}</span>
        </div>
        {dateOfBirth && (
            <div className={styles.field}>
            <span className={styles.fieldLabel}>Date of birth</span>
            <span className={styles.fieldValue}>{dateOfBirth}</span>
            </div>
        )}
        {address && (
            <div className={styles.field}>
            <span className={styles.fieldLabel}>Address</span>
            <span className={styles.fieldValue}>{address}</span>
            </div>
        )}
        <div className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <span className={styles.fieldValue}>{email}</span>
        </div>
        </div>
    </div>
    ); 
};

export default Profile;