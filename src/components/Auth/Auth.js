import { useRef, useState } from 'react';
import { validateUser } from '../../helpers/validation';
import styles from './Auth.module.css';

const Auth = () => {
  const usernameRef = useRef();

  const emailRef = useRef();

  const passwordRef = useRef();

  const [formErrors, setFormErrors] = useState([]);

  const [registerMode, setRegisterMode] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const errors = validateUser({ username, email, password });
    console.log(errors);
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors([]);
    }

    // s
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

  return (
    <div className={styles.auth}>
      <h2 className={styles.title}>
        <b className={styles.subtitle}>Register</b>{' '}
        <span>to leave a message</span>
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <div className={styles.formGroup}>
          <button className={styles.btn}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
