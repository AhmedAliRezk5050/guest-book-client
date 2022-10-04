import { useRef, useState } from 'react';
import styles from './Auth.module.css';

import guestBookApi from '../../api/guest-book';
import { useAuthContext } from '../../context/auth/AuthProvider';
import {validateUser} from "../../helpers/validation";

const Auth = () => {
  const usernameRef = useRef();
  const { dispatch } = useAuthContext();
  const emailRef = useRef();

  const passwordRef = useRef();

  const [formErrors, setFormErrors] = useState([]);

  const [registerMode, setRegisterMode] = useState(true);

  const [loading, setLoading] = useState(false);

  const register = async (username, email, password) => {
    try {
      const { errors } = await guestBookApi.register(username, email, password);
      if (errors) {
        setFormErrors((prevState) => [...prevState, ...errors]);
      }
    } catch (error) {
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

      if (errors) {
        setFormErrors((prevState) => [...prevState, ...errors]);
      } else {
        return userData;
      }
    } catch (error) {
      setFormErrors((prevState) => [...prevState, 'Failed to login']);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } else {
      const userData = await login(username, email, password);
      setLoading(false);
      if (userData) {
        dispatch({ type: 'SET_USER', payload: userData });
        try {
          localStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
          alert('local storage is not supported on iphone');
        }
      }
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

  return (
    <div className={styles.auth}>
      <h2 className={styles.title}>
        <b className={styles.subtitle}>Register</b>{' '}
        <span>to leave a message</span>
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
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
