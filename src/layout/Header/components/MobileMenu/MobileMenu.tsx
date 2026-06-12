import styles from './MobileMenu.module.css';
import { IconXmarkOutline24, IconArrowDoorOut2Outline24 } from 'nucleo-core-essential-outline-24';


interface User {
  userName: string;
  email: string;
  avatar: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  user?: User;
  onClose: () => void;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const MobileMenu = ({ isOpen, isLoggedIn, user, onClose, onSignIn, onSignOut }: MobileMenuProps) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>

        {isLoggedIn && user ? (
          <div className={styles.userSection}>
            <div className={styles.avatar}>
              <img src={user.avatar} alt="avatar" />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.userName}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
            <button className={styles.closeButton} onClick={onClose}>
              <IconXmarkOutline24 />
            </button>
          </div>
        ) : (
          <div className={styles.closeRow}>
            <button className={styles.closeButton} onClick={onClose}>
              <IconXmarkOutline24 />
            </button>
          </div>
        )}

        <nav className={styles.nav}>
          <a href="#" className={`${styles.navLink} ${styles.active}`}>Blog</a>
          <a href="#" className={styles.navLink}>Pricing</a>
          <a href="#" className={styles.navLink}>About Us</a>
          {isLoggedIn && (
            <a href="#" className={styles.navLink}>My Account</a>
          )}
        </nav>

        {isLoggedIn ? (
          <>
            <div className={styles.divider} />
            <button className={styles.signOut} onClick={onSignOut}>
              <IconArrowDoorOut2Outline24 />
              Sign out
            </button>
          </>
        ) : (
          <>
            <div className={styles.divider} />
            <div className={styles.authLinks}>
              <a href="#" className={styles.navLink} onClick={onSignIn}>Sign in</a>
              <a href="#" className={`${styles.navLink} ${styles.joinUs}`} >Join us</a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MobileMenu;