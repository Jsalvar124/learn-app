import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  variant?: 'prime' | 'secondary' | 'important';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ text, variant = 'prime', size = 'md', fullWidth = false, disabled = false, onClick }: ButtonProps) => (
  <button
    className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${disabled ? styles.disabled : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;