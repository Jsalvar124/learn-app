import { useNavigate } from "react-router-dom";
import styles from './Home.module.css';
import { Button } from "../../components/common/Button";
import videoImg from "../../assets/video-photo.avif"

const Home = () => {
    const navigate = useNavigate();
      return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Let's start learning</h1>
        <p className={styles.heroText}>
          Welcome to Learn Platform - where every day is a day to learn. Dive into the
          vast ocean of knowledge and empower yourself with the tools for a
          successful tomorrow. Happy learning!
        </p>

        <video controls poster={videoImg} className={styles.video}>
          <source src="/path/to/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className={styles.joinSection}>
        <span className={styles.joinOval} aria-hidden="true" />
        <div className={styles.joinContent}>
          <h2 className={styles.joinTitle}>Join us</h2>
          <p className={styles.joinText}>
            Qui ut exercitation officia proident enim non tempor
            tempor ipsum ex nulla ea adipisicing sit consequat enim
            elit cupidatat o
          </p>
          <Button
            text="Join us"
            variant="prime"
            onClick={() => navigate('/join-us')}
          />
        </div>
      </section>
    </div>
  );
}

export default Home;