// index.ts
export { default as Input } from './Input';
import styles from './Input.module.css';
import type { ReactNode } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconRightTooltip?: string;
  onIconRightClick?: () => void;
  disabled?: boolean;
  state?: 'default' | 'error' | 'valid';
}

const Input = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  iconLeft,
  iconRight,
  iconRightTooltip,
  onIconRightClick,
  disabled = false,
  state = 'default'
}: InputProps) => (
  <div className={styles.wrapper}>
    {label && <label className={styles.label}>{label}</label>}
    <div className={styles.inputWrapper}>
      {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
            ${styles.input} 
            ${iconLeft ? styles.withLeftIcon : ''} 
            ${iconRight ? styles.withRightIcon : ''} 
            ${state === 'error' ? styles.error : ''} 
            ${state === 'valid' ? styles.valid : ''}
        `}      
      />
      {iconRight && (
        <button className={styles.iconRight} onClick={onIconRightClick} title={iconRightTooltip}>
          {iconRight}
        </button>
      )}
    </div>
  </div>
);

export default Input;