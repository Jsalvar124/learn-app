import { useState } from 'react';
import styles from './Login.module.css';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { 
  IconUser3Outline24,      // user icon
  IconLockOutline24,       // lock icon
  IconEye2Outline24,       // show password
  IconEye2SlashOutline24,   // hide password
  IconCircleHalfDashedCheckOutline24 // Capcha Arrow Icon
} from 'nucleo-core-essential-outline-24';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.form}>

        <div className={styles.header}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>Welcome back</p>
        </div>

        <Input
          label="User name"
          placeholder="Enter email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          iconLeft={<IconUser3Outline24 />}
        />

        <Input
          label="Password"
          placeholder="Enter password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          iconLeft={<IconLockOutline24 />}
          iconRight={showPassword? <IconEye2SlashOutline24 /> : <IconEye2Outline24 />}
          iconRightTooltip={showPassword ? 'Hide password' : 'Show password'}
          onIconRightClick={() => setShowPassword(!showPassword)}
        />

        <Button text="Sign In" variant="prime" fullWidth />

        <p className={styles.divider}>OR</p>

        <p className={styles.signupText}>
          Don't have an account?{' '}
          <a href="#" className={styles.signupLink}>Sign up</a>
        </p>

        {/* reCAPTCHA mock */}
        <div className={styles.captcha}>
        <input type="checkbox" className={styles.captchaCheckbox} />
        <span className={styles.captchaText}>I'm not a robot</span>
        <IconCircleHalfDashedCheckOutline24 />
        </div>

      </div>
    </div>
  );
};

export default Login;