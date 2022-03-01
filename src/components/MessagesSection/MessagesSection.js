import { useEffect } from 'react';
import guestBookApi from '../../api/guest-book';
import { useMessagesContext } from '../../context/auth/MessagesProvider';
import styles from './MessagesSection.module.css';

const MessagesSection = () => {
  const { state, dispatch } = useMessagesContext();
  console.log('state', state);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { messages, errors } = await guestBookApi.fetchMessages();

        if (!errors) {
          dispatch({ type: 'SET_MESSAGES', payload: messages });
        }

        console.log(messages, errors);
      } catch (error) {
        console.log('error -------------- ', error);
      }
    };
    fetchMessages();
  }, [dispatch]);

  return (
    <section className={styles.MessagesSection}>
      <h3 className={styles.title}>Messages</h3>
    </section>
  );
};

export default MessagesSection;
