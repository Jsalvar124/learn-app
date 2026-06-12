
import styles from './Logo.module.css';
const Logo = () => (
  <a href='/learn-app/' className={styles.container}> 
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-primary)" strokeWidth="2.5"/>
        </pattern>
        <clipPath id="leftCircle">
          <circle cx="35" cy="50" r="32"/>
        </clipPath>
      </defs>
      <circle cx="35" cy="50" r="32" stroke="var(--color-primary)" strokeWidth="3" fill="none"/>
      <circle cx="65" cy="50" r="32" stroke="var(--color-primary)" strokeWidth="3" fill="none"/>
      <circle cx="65" cy="50" r="32" fill="url(#hatch)" clipPath="url(#leftCircle)"/>
    </svg>
    <span className={styles.text}>learn</span>
  </a>
);

export default Logo;