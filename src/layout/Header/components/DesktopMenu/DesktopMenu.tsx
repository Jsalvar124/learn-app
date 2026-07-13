import styles from './DesktopMenu.module.css';
import { IconUser3Outline24, IconArrowDoorOut2Outline24, IconToggleOutline24 } from 'nucleo-core-essential-outline-24';
import { Link } from 'react-router-dom';
import { getDefaultAvatarSelector, getUserNameSelector, getUserProfileSelector } from '../../../../store/selectors';
import { useSelector } from 'react-redux';

interface DesktopMenuProps {
  onSignOut?: () => void;
  onClose?: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const DesktopMenu = ({ onSignOut, onClose, isDark, toggleTheme }: DesktopMenuProps) => {
  const avatar = useSelector(getDefaultAvatarSelector);
  const username = useSelector(getUserNameSelector);
  const profile = useSelector(getUserProfileSelector);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.menu}>

        <div className={styles.userSection}>
          <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{username}</span>
            <span className={styles.userEmail}>{profile?.email}</span>
          </div>
        </div>

        <div className={styles.divider} />

        <nav className={styles.nav}>
          <Link to="/my-account" className={styles.navItem}>
            <IconUser3Outline24 />
            <span>My Account</span>
          </Link>
          <div className={styles.navItem}>
            <IconToggleOutline24 />
            <span>Night mode</span>
            <button
              className={`${styles.toggle} ${isDark ? styles.toggleOn : styles.toggleOff}`}
              onClick={toggleTheme}
            >
              <span className={styles.toggleCircle} />
            </button>
          </div>
        </nav>

        <div className={styles.divider} />

        <button className={styles.signOut} onClick={onSignOut}>
          <IconArrowDoorOut2Outline24 />
          <span>Sign out</span>
        </button>

      </div>
    </>
  );
};

export default DesktopMenu;