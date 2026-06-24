import { useState } from 'react';
import styles from './DesktopMenu.module.css';
import { IconUser3Outline24, IconArrowDoorOut2Outline24 } from 'nucleo-core-essential-outline-24';

// moon/night icon
import { IconToggleOutline24 } from 'nucleo-core-essential-outline-24';
import { Link } from 'react-router-dom';
import { getDefaultAvatarSelector, getUserNameSelector } from '../../../../store/selectors';
import { useSelector } from 'react-redux';

interface DesktopMenuProps {
  onSignOut?: () => void;
  onClose?: () => void;
}

const DesktopMenu = ({ onSignOut, onClose }: DesktopMenuProps) => {
  const [nightMode, setNightMode] = useState(false);
  const avatar = useSelector(getDefaultAvatarSelector);
  const username = useSelector(getUserNameSelector);

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
            <span className={styles.userEmail}>hardcoded@email.com</span>
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
              className={`${styles.toggle} ${nightMode ? styles.toggleOn : styles.toggleOff}`}
              onClick={() => setNightMode(!nightMode)}
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