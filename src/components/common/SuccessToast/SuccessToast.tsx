import styles from './SuccessToast.module.css';
// Custom Success Toast
interface SuccessToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

const SuccessToast = ({ message, visible, onDismiss }: SuccessToastProps) => (
  <div className={`${styles.container} ${visible ? styles.visible : styles.hidden}`}>
    <span className={styles.icon}>✓</span>
    <span className={styles.message}>{message}</span>
    <button className={styles.dismiss} onClick={onDismiss}>✕</button>
  </div>
);

export default SuccessToast;