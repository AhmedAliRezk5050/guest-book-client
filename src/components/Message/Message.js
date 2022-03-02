import { useRef, useState } from 'react';
import guestBookApi from '../../api/guest-book';
import { useAuthContext } from '../../context/auth/AuthProvider';
import { useMessagesContext } from '../../context/auth/MessagesProvider';
import { protectedTrimString } from '../../helpers/validation';
import styles from './Message.module.css';

const Message = ({ messageInfo }) => {
  const { username, content, creationDate, id } = messageInfo;

  const [editingMessage, setEditingMessage] = useState();

  const { state, dispatch } = useMessagesContext();

  const { state: userInfo } = useAuthContext();

  const messageRef = useRef();

  const dateFormated =
    new Date(creationDate).toDateString() +
    '  ' +
    new Date(creationDate).toLocaleTimeString();

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

  const deleteMessage = async (messageId, username) => {
    try {
      const { deletedMessageId, errors } = await guestBookApi.deleteMessage(
        messageId,
        username,
      );

      console.log(deletedMessageId, errors);
    } catch (error) {
      console.log('error -------------- ', error);
    }
  };

  const updateMessage = async (messageId, username, content) => {
    try {
      const { updatedMessageId, errors } = await guestBookApi.updateMessage(
        messageId,
        username,
        content,
      );

      return { updatedMessageId, errors };
    } catch (error) {
      console.log('error -------------- ', error);
    }
  };

  const removeMessageHandler = async () => {
    await deleteMessage(id, username);
    await fetchMessages();
  };

  const handleEditMessage = async (e) => {
    e.preventDefault();

    const editMessage = messageRef.current.value;

    if (!protectedTrimString) {
      return;
    }

    const { updatedMessageId, errors } = await updateMessage(
      id,
      username,
      editMessage,
    );

    if (!errors) {
      await fetchMessages();
    }

    console.log(updatedMessageId);
  };

  return (
    <div className={styles.Message}>
      <div className={styles.header}>
        <h4 className={styles.title}>{username}</h4>
        <h5 className={styles.date}>{dateFormated}</h5>
      </div>
      <div className={styles.body}>
        <p className={styles.content}>{content}</p>
      </div>
      <div className={styles.footer}>
        <button className={styles.btn}>reply</button>

        {userInfo.userData.username === username && (
          <>
            <button
              className={styles.btn}
              onClick={() => setEditingMessage((prevState) => !prevState)}
            >
              edit
            </button>
            <button className={styles.btn} onClick={removeMessageHandler}>
              delete
            </button>
          </>
        )}
      </div>
      <div>
        {editingMessage && (
          <form className={styles.form} onSubmit={handleEditMessage}>
            <div className={styles.formGroup}>
              <label htmlFor='text'>Message</label>
              <input
                type='text'
                placeholder='Edit Message'
                id='text'
                className={styles.formInput}
                ref={messageRef}
              />
            </div>
            <div className={styles.btnWrapper}>
              <button className={styles.btn}>Edit Message</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Message;
