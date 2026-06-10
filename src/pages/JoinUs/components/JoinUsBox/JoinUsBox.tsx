
import { Button } from "../../../../components/common/Button";
import type { Role } from "../../../../types";
import styles from './JoinUsBox.module.css';

interface JoinUsBoxProps {
    role: Role
    image: string;
    onClick: () => void;
}
const JoinUsBox = ({role, image, onClick}: JoinUsBoxProps) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <h2 className={styles.title}>Register as {role === 'trainer' ? 'Trainer' : 'Student'}</h2>
      <p className={styles.description}>
        Do consectetur proident proident id eiusmod deserunt consequat pariatur ad ex velit do Lorem reprehenderit.
      </p>
      <Button text="Join us" variant="prime" size="lg" onClick={onClick} />
    </div>
    <img src={image} alt={role} className={styles.image} />
  </div>
)

export default JoinUsBox;