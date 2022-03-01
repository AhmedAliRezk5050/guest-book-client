import { useRef, useState } from 'react';
import { validateUser } from '../../helpers/validation';
import styles from './Auth.module.css';

import guestBookApi from '../../api/guest-book';
import { useAuthContext } from '../../context/auth/AuthProvider';

const Auth = () => {
  const usernameRef = useRef();
  const { state, dispatch } = useAuthContext();
  const emailRef = useRef();

  const passwordRef = useRef();

  const [formErrors, setFormErrors] = useState([]);

  const [registerMode, setRegisterMode] = useState(true);

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);

  const register = async (username, email, password) => {
    try {
      const { userId, errors } = await guestBookApi.register(
        username,
        email,
        password,
      );
      if (errors) {
        setFormErrors((prevState) => [...prevState, ...errors]);
      }
    } catch (error) {
      console.log(error);
      setFormErrors((prevState) => [...prevState, 'Failed to register']);
    }
  };

  const login = async (username, email, password) => {
    try {
      const { userData, errors } = await guestBookApi.login(
        username,
        email,
        password,
      );

      console.log(userData, errors);
      if (errors) {
        setFormErrors((prevState) => [...prevState, ...errors]);
      } else {
        dispatch({ type: 'SET_USER', payload: userData });
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('localStorage', localStorage.getItem('userData'));
      }
    } catch (error) {
      console.log('error -------------- ', error);
      setFormErrors((prevState) => [...prevState, 'Failed to login']);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setLoading(true);

    const username = usernameRef.current.value;

    const email = emailRef.current.value;

    const password = passwordRef.current.value;

    const errors = validateUser({ username, email, password });

    if (errors.length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    } else {
      setFormErrors([]);
    }

    if (registerMode) {
      await register(username, email, password);
      setLoading(false);
      if (formErrors.length === 0) {
        setSuccessMessage('Registered successfully, please login');
      }
    } else {
      await login(username, email, password);
      setLoading(false);
    }
  };

  const renderFormErrors = () => {
    return (
      formErrors.length > 0 && (
        <div className={styles.formErrors}>
          {formErrors.map((e, index) => (
            <span key={index}>* {e}</span>
          ))}
        </div>
      )
    );
  };

  const renderOperationsStatus = () => loading && <p>loading</p>;
  const renderSuccessMessage = () =>
    successMessage && <p className={styles.success}>{successMessage}</p>;

  return (
    <div className={styles.auth}>
      <h2 className={styles.title}>
        <b className={styles.subtitle}>Register</b>{' '}
        <span>to leave a message</span>
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {renderSuccessMessage()}
        {renderOperationsStatus()}
        {renderFormErrors()}
        <div className={styles.formGroup}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            placeholder='Username'
            id='username'
            className={styles.formInput}
            ref={usernameRef}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            placeholder='Email Address'
            id='email'
            className={styles.formInput}
            ref={emailRef}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Password'
            id='password'
            className={styles.formInput}
            ref={passwordRef}
          />
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} type='submit'>
            {registerMode ? 'Register' : 'Login'}
          </button>
          <button
            className={styles.switchBtn}
            type='button'
            onClick={() => setRegisterMode((prevState) => !prevState)}
          >
            Switch to {registerMode ? 'Login' : 'Register'}
          </button>
        </div>
        <div className={styles.formGroup}></div>
      </form>
    </div>
  );
};

export default Auth;