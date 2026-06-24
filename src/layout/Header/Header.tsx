import { useState } from 'react';
import styles from './Header.module.css';
import Logo from '../../assets/Logo';
import { Button } from '../../components/common/Button';
import { MobileMenu } from './components/MobileMenu';
import { DesktopMenu } from './components/DesktopMenu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultAvatarSelector, getIsAuthSelector, getUserNameSelector } from '../../store/selectors';
import type { AppDispatch } from '../../store';
import { removeUserData } from '../../store/slices/userSlice';


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const isAuth = useSelector(getIsAuthSelector);
  const username = useSelector(getUserNameSelector);
  const avatar = useSelector(getDefaultAvatarSelector)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(removeUserData());
    setDesktopMenuOpen(false);
    navigate("/home")
  }

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
            {isAuth ? (
              <div className={styles.userSection}>
                <span className={styles.userName}>{username}</span>
                <button className={styles.avatarButton} onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}>
                  <img src={avatar} alt="avatar" className={styles.avatarImg} />
                </button>
                {desktopMenuOpen && (
                <DesktopMenu
                  onSignOut={handleSignOut}
                  onClose={() => setDesktopMenuOpen(false)}
                />
              )}
              </div>
            ) : (
              <>
                <Link to="/login" className={styles.signIn} >Sign in</Link>
                <Link to="/join-us" className={styles.link}>
                  <Button text="Join us" variant="prime" size="sm" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSignOut={handleSignOut}
      />
    </>
  );
};

export default Header;