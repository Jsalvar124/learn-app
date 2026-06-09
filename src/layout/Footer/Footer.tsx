import styles from './Footer.module.css';
import Logo from '../../assets/Logo';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { LanguageMenu } from './components/LanguageMenu';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>

        <div className={styles.logoSection}>
          <Logo />
        </div>

        <div className={styles.navColumns}>
          <div className={styles.navColumn}>
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
          </div>
          <div className={styles.navColumn}>
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">User guides</a>
            <a href="#">Webinars</a>
          </div>
          <div className={styles.navColumn}>
            <h4>Company</h4>
            <a href="#">About us</a>
            <a href="#">Contacts us</a>
          </div>
        </div>

        <div className={styles.newsletter}>
          <h4>Subscribe to our newsletter</h4>
          <p>For product announcements and exclusive insights</p>
          <div className={styles.subscribeForm}>
            <input
              type="email"
              placeholder="Input your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.subscribeInput}
            />
            <button className={styles.subscribeButton}>Subscribe</button>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.languageSection}>
          <LanguageMenu />
        </div>

        <p className={styles.copyright}>
          © 2023 Learn, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a>
        </p>

        <div className={styles.socialIcons}>
          <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
          <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
          <FontAwesomeIcon icon={faYoutube} className={styles.socialIcon} />
        </div>

      </div>
    </footer>
  );
};

export default Footer;