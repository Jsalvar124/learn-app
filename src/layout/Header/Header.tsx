import { useState } from 'react';
import styles from './Header.module.css';
import Logo from '../../assets/Logo';
import { Button } from '../../components/common/Button';
import { IconXmarkOutline24 } from 'nucleo-core-essential-outline-24';
import heroImg from '../../assets/hero.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <button className={styles.menuButton} onClick={() => setMenuOpen(true)}>
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
            <a href="#" className={styles.signIn}>Sign in</a>
            <Button text="Join us" variant="prime" size="sm" />
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuUser}>
          <div className={styles.avatar}>
            <img src={heroImg} alt="user" />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>John_12</span>
            <span className={styles.userEmail}>John_12@gmail.com</span>
          </div>
          <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
            <IconXmarkOutline24 />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          <a href="#" className={`${styles.mobileNavLink} ${styles.active}`}>Blog</a>
          <a href="#" className={styles.mobileNavLink}>Pricing</a>
          <a href="#" className={styles.mobileNavLink}>About Us</a>
          <a href="#" className={styles.mobileNavLink}>My Account</a>
        </nav>
      </div>
    </>
  );
};

export default Header;