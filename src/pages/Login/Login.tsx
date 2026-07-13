import { useState } from 'react';
import styles from './Login.module.css';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { 
  IconUser3Outline24,      // user icon
  IconLockOutline24,       // lock icon
  IconEye2Outline24,       // show password
  IconEye2SlashOutline24,   // hide password
  IconCircleHalfDashedCheckOutline24 // Captcha Arrow Icon
} from 'nucleo-core-essential-outline-24';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/userService';
import toast from 'react-hot-toast';
import type { AppDispatch } from '../../store';
import { decodeToken } from '../../helpers/decodeToken';
import { setUserData } from '../../store/slices/userSlice';
import { useDispatch} from 'react-redux';
import { getUserProfileThunk } from '../../store/thunks/userThunk';


const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'password is required';
    if (!captcha) newErrors.captcha = 'Please confirm you are not a robot';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(!validate()) return;
    
    const loginData = {
      username,
      password
    }
    try {
      const response = await login(loginData);
      localStorage.setItem("token", response.token);
      const decodedToken = decodeToken(response.token);

      //dispatch call for saving token data in store
      dispatch(setUserData({
        username: decodedToken.sub,
        role: decodedToken.userType,
        token: response.token
      }))

      // dispatch call for complete user data
      dispatch(getUserProfileThunk({
        username: decodedToken.sub,
        role: decodedToken.userType
      }))

      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid username or password.";
      setErrors({ form: message });
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.header}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>Welcome back</p>
        </div>

        <Input
          label="User name"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          iconLeft={<IconUser3Outline24 />}
          state={errors.username ? 'error' : 'default'}
          errorMessage={errors.username}
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
          state={errors.password ? 'error' : 'default'}
          errorMessage={errors.password}
        />
        {errors.form && <p className={styles.errorMessage}>{errors.form}</p>}
        {errors.captcha && <p className={styles.errorMessage}>{errors.captcha}</p>}

        <Button text="Sign In" variant="prime" fullWidth type = 'submit' />

        <p className={styles.divider}>OR</p>

        <p className={styles.signupText}>
          Don't have an account?{' '}
          <Link to="/join-us" className={styles.signupLink}>Sign up</Link>
        </p>

        {/* reCAPTCHA mock */}
        <div className={styles.captcha}>
          <input type="checkbox" className={styles.captchaCheckbox} onChange={e => setCaptcha(e.target.checked)}  />
          <span className={styles.captchaText}>I'm not a robot</span>
          <IconCircleHalfDashedCheckOutline24 />
        </div>

      </form>
    </div>
  );
};

export default Login;