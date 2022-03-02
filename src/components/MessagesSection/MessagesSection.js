import { useEffect } from 'react';
import guestBookApi from '../../api/guest-book';
import { useMessagesContext } from '../../context/auth/MessagesProvider';
import Message from '../Message/Message';
import styles from './MessagesSection.module.css';

const MessagesSection = () => {
  const { state, dispatch } = useMessagesContext();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { messages, errors } = await guestBookApi.fetchMessages();

        if (!errors) {
          dispatch({ type: 'SET_MESSAGES', payload: messages });
        }
      } catch (error) {
        console.log('error -------------- ', error);
      }
    };
    fetchMessages();
  }, [dispatch]);

  return (
    <section className={styles.MessagesSection}>
      <div className={styles.messagesContainer}>
        {state &&
          state.messages &&
          state.messages.map((message) => (
            <Message key={message.id} messageInfo={message} />
          ))}
      </div>
    </section>
  );
};

export default MessagesSection;
