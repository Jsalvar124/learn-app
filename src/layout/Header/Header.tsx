import { useState } from 'react';
import styles from './Header.module.css';
import Logo from '../../assets/Logo';
import { Button } from '../../components/common/Button';
import { MobileMenu } from './components/MobileMenu';
import { DesktopMenu } from './components/DesktopMenu';

interface User {
  userName: string;
  email: string;
  avatar: string;
}

interface HeaderProps {
  isLoggedIn: boolean;
  user?: User;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

const Header = ({ isLoggedIn, user, onSignIn, onSignOut }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <button className={styles.menuButton} onClick={() => setMobileMenuOpen(true)}>
              <span className={styles.dotsIcon}>•••</span>
            </button>
            <Logo />
            <nav className={styles.nav}>
              <a href="#" className={styles.navLink}>Blog</a>
              <a href="#" className={styles.navLink}>Pricing</a>
              <a href="#" className={styles.navLink}>About Us</a>
            </nav>
          </div>

          <div className={styles.actions}>
            {isLoggedIn && user ? (
              <div className={styles.userSection}>
                <span className={styles.userName}>{user.userName}</span>
                <button className={styles.avatarButton} onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}>
                  <img src={user.avatar} alt="avatar" className={styles.avatarImg} />
                </button>
                {desktopMenuOpen && (
                <DesktopMenu
                  user={user}
                  onSignOut={() => { onSignOut?.(); setDesktopMenuOpen(false); }}
                  onClose={() => setDesktopMenuOpen(false)}
                />
              )}
              </div>
            ) : (
              <>
                <a href="#" className={styles.signIn} onClick={onSignIn}>Sign in</a>
                <Button text="Join us" variant="prime" size="sm" />
              </>
            )}
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        isLoggedIn={isLoggedIn}
        user={user}
        onClose={() => setMobileMenuOpen(false)}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
    </>
  );
};

export default Header;