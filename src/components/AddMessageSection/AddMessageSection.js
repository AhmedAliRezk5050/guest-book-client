import { useRef } from 'react';
import guestBookApi from '../../api/guest-book';
import { useAuthContext } from '../../context/auth/AuthProvider';
import { useMessagesContext } from '../../context/auth/MessagesProvider';
import { protectedTrimString } from '../../helpers/validation';
import styles from './AddMessageSection.module.css';

const AddMessageSection = () => {
  const messageRef = useRef();

  const { state, dispatch } = useAuthContext();
  const { dispatch: messagesDispatch } = useMessagesContext();

  const createMessage = async (username, content) => {
    try {
      const { newMessageId, errors } = await guestBookApi.createMessage(
        username,
        content,
      );
      return { newMessageId, errors };
    } catch (error) {
      console.log('error -------------- ', error);
    }
  };
  const fetchMessages = async () => {
    try {
      const { messages, errors } = await guestBookApi.fetchMessages();

      if (!errors) {
        messagesDispatch({ type: 'SET_MESSAGES', payload: messages });
      }

      console.log(messages, errors);
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

    const { errors } = await createMessage(state.userData.username, message);
    messageRef.current.value = '';
    await fetchMessages();
    if (!errors) {
      dispatch({ type: 'SET_MESSAGES', payload: [] });
    }
  };

  return (
    <section className={styles.AddMessageSection}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor='text'>Message</label>
          <textarea
            placeholder='Add Message'
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
