import { Link } from 'react-router-dom';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  variant?: 'prime' | 'secondary' | 'important';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  to?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({ text, variant = 'prime', size = 'md', onClick, to, type = 'button' }: ButtonProps) => {
  const className = `${styles.button} ${styles[variant]} ${styles[size]}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;