import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.css';
import { IconXmarkOutline24, IconArrowDoorOut2Outline24 } from 'nucleo-core-essential-outline-24';
import { useSelector } from 'react-redux';
import { getDefaultAvatarSelector, getIsAuthSelector, getUserNameSelector, getUserProfileSelector } from '../../../../store/selectors';


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut?: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const MobileMenu = ({ isOpen, onClose, onSignOut, isDark, toggleTheme }: MobileMenuProps) => {
  const isAuth = useSelector(getIsAuthSelector);
  const avatar = useSelector(getDefaultAvatarSelector);
  const username = useSelector(getUserNameSelector);
  const profile = useSelector(getUserProfileSelector);


  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>

        {isAuth ? (
          <div className={styles.userSection}>
            <div className={styles.avatar}>
              <img src={avatar} alt="avatar" />
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{username}</span>
              {/* FIX HARDCODED */}
              <span className={styles.userEmail}>{profile?.email}</span> 
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
          {isAuth && (
            <Link to="/my-account" className={styles.navLink}>My Account</Link>
          )}
          <div className={styles.nightModeRow}>
            <span>Night mode</span>
            <button
              className={`${styles.toggle} ${isDark ? styles.toggleOn : styles.toggleOff}`}
              onClick={toggleTheme}
            >
              <span className={styles.toggleCircle} />
            </button>
          </div>
        </nav>

        {isAuth ? (
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
              <Link to="/login" className={styles.navLink} >Sign in</Link>
              <Link to="/join-us" className={`${styles.navLink} ${styles.joinUs}`}>Join us</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MobileMenu;