import { useRef } from 'react';
import guestBookApi from '../../api/guest-book';
import { useAuthContext } from '../../context/auth/AuthProvider';
import { protectedTrimString } from '../../helpers/validation';
import styles from './AddMessageSection.module.css';

const AddMessageSection = () => {
  const messageRef = useRef();

  const { state } = useAuthContext();

  const createMessage = async (username, content) => {
    try {
      const { newMessageId, errors } = await guestBookApi.createMessage(
        username,
        content,
      );

      console.log(newMessageId, errors);
    } catch (error) {
      console.log('error -------------- ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = messageRef.current.value;

    if (!protectedTrimString(message)) {
      return;
    }

    const userData = state.userData;

    if (!userData) {
      return;
    }

    await createMessage(state.userData.username, message);
    messageRef.current.value = '';
  };

  return (
    <section className={styles.AddMessageSection}>
      <h3 className={styles.title}>Add Message</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor='message'>Message</label>
          <textarea
            type='message'
            placeholder='Message'
            id='text'
            className={styles.formInput}
            ref={messageRef}
          ></textarea>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.btn}>Add Message</button>
        </div>
      </form>
    </section>
  );
};

export default AddMessageSection;
