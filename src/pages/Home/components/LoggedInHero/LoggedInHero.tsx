import { useSelector } from 'react-redux';
import styles from './LoggedInHero.module.css';
import { getUserProfileSelector } from '../../../../store/selectors';

const LoggedInHero = () =>{
    const profile = useSelector(getUserProfileSelector);
    return (
        <section className={styles.hero}>
            <h1 className={styles.heroTitle}>Hi, {profile?.firstName}!</h1>
            <p className={styles.heroText}>
                Welcome to Learn Platform - where every day is a day to learn. Dive into the
                vast ocean of knowledge and empower yourself with the tools for a
                successful tomorrow. Happy learning!
            </p>
        </section>
  );
}


export default LoggedInHero;