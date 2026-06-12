import { useState } from 'react';
import styles from './DesktopMenu.module.css';
import { IconUser3Outline24, IconArrowDoorOut2Outline24 } from 'nucleo-core-essential-outline-24';

// moon/night icon
import { IconToggleOutline24 } from 'nucleo-core-essential-outline-24';

interface User {
  userName: string;
  email: string;
  avatar: string;
}

interface DesktopMenuProps {
  user: User;
  onSignOut?: () => void;
  onClose?: () => void;
}

const DesktopMenu = ({ user, onSignOut, onClose }: DesktopMenuProps) => {
  const [nightMode, setNightMode] = useState(false);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.menu}>

        <div className={styles.userSection}>
          <div className={styles.avatar}>
            <img src={user.avatar} alt="avatar" />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.userName}</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
        </div>

        <div className={styles.divider} />

        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            <IconUser3Outline24 />
            <span>My Account</span>
          </a>
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