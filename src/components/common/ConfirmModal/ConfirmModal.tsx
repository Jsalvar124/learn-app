import Modal from '@mui/material/Modal';
import styles from './ConfirmModal.module.css';
import { Button } from '../Button';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ open, title, description, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }: ConfirmModalProps) => (
  <Modal open={open} onClose={onCancel}>
    <div className={styles.box}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button className={styles.close} onClick={onCancel}>✕</button>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onCancel}>{cancelText}</button>
        <Button text={confirmText} variant="important" onClick={onConfirm} />
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;