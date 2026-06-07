import styles from './Header.module.css';
import Logo from '../../assets/Logo';
import { Button } from '../../components/common/Button';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      
      <div className={styles.left}>
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
);

export default Header;