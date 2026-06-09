import styles from './LanguageMenu.module.css'
import { IconChevronDownOutline24 } from 'nucleo-core-essential-outline-24';

const LanguageMenu = () => (
    <div className={styles.languageWrapper}>
        <select className={styles.language}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
        </select>            
        <span className={styles.languageArrow}>
            <IconChevronDownOutline24 />
        </span>
    </div>
);

export default LanguageMenu;