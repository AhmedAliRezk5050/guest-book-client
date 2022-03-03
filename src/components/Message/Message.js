import { useRef, useState } from 'react';
import guestBookApi from '../../api/guest-book';
import { useAuthContext } from '../../context/auth/AuthProvider';
import { useMessagesContext } from '../../context/auth/MessagesProvider';
import { protectedTrimString } from '../../helpers/validation';
import styles from './Message.module.css';

const Message = ({ messageInfo }) => {
  const { username, content, creationDate, id, replies } = messageInfo;

  const [editingMessage, setEditingMessage] = useState(false);

  const [replyingMessage, setReplyingMessage] = useState(false);

  const [showReplies, setShowReplies] = useState(false);

  const { dispatch } = useMessagesContext();

  const { state: userInfo } = useAuthContext();

  const messageRef = useRef();
  const replyRef = useRef();

  const formatDate = (date) =>
    new Date(date).toDateString() + '  ' + new Date(date).toLocaleTimeString();

  const dateFormated = formatDate(creationDate);

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

  const updateMessage = async (messageId, username, content, reply) => {
    try {
      const { updatedMessageId, errors } = await guestBookApi.updateMessage(
        messageId,
        username,
        content,
        reply,
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

    if (!protectedTrimString(editMessage)) {
      return;
    }

    const { errors } = await updateMessage(id, username, editMessage);

    if (!errors) {
      await fetchMessages();
      setEditingMessage(false);
    }
  };

  const handleReplyMessage = async (e) => {
    e.preventDefault();

    const replyMessage = replyRef.current.value;
    const reply = {
      username: userInfo.userData.username,
      content: replyMessage,
    };
    if (!protectedTrimString(replyMessage)) {
      return;
    }

    const { updatedMessageId, errors } = await updateMessage(
      id,
      username,
      content,
      reply,
    );

    if (!errors) {
      await fetchMessages();
      setReplyingMessage(false);
    }

    console.log(updatedMessageId);
  };

  const renderCancelEditBtn = () => {
    return (
      <button className={styles.btn} onClick={() => setEditingMessage(false)}>
        Cancel
      </button>
    );
  };

  const renderCancelReplyBtn = () => {
    return (
      <button className={styles.btn} onClick={() => setReplyingMessage(false)}>
        Cancel
      </button>
    );
  };

  const renderReplies = () => {
    if (!showReplies) {
      return null;
    }
    if (replies && replies.length > 0) {
      return replies.map(({ id, username, content, creationDate }) => (
        <div key={id} className={styles.reply}>
          <div className={styles.replyHeader}>
            <h4 className={styles.replyTitle}>{username}</h4>
            <h5 className={styles.replySubTitle}>{formatDate(creationDate)}</h5>
          </div>
          <div>
            <p className={styles.replyContent}>{content}</p>
          </div>
        </div>
      ));
    }
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
        <button
          className={styles.btn}
          onClick={() => setReplyingMessage((prevState) => !prevState)}
        >
          reply
        </button>

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
          <>
            <form className={styles.form} onSubmit={handleEditMessage}>
              <div className={styles.formGroup}>
                <label htmlFor='text'>Message</label>
                <input
                  type='edit_text'
                  placeholder='Edit Message'
                  id='edit_text'
                  className={styles.formInput}
                  ref={messageRef}
                  defaultValue={content}
                />
              </div>
              <div className={styles.btnWrapper}>
                <button className={styles.btn}>Edit Message</button>
              </div>
            </form>
            {renderCancelEditBtn()}
          </>
        )}
        {replyingMessage && (
          <>
            <form className={styles.form} onSubmit={handleReplyMessage}>
              <div className={styles.formGroup}>
                <label htmlFor='text'>Reply</label>
                <input
                  type='reply_text'
                  placeholder='Reply'
                  id='reply_text'
                  className={styles.formInput}
                  ref={replyRef}
                />
              </div>
              <div className={styles.btnWrapper}>
                <button className={styles.btn}>Reply</button>
              </div>
            </form>
            {renderCancelReplyBtn()}
          </>
        )}
      </div>
      <div className={styles.repliesContainer}>
        <button
          className={styles.btn}
          onClick={() => setShowReplies((prevState) => !prevState)}
        >
          View replies
        </button>
        <div className={styles.replies}>{renderReplies()}</div>
      </div>
    </div>
  );
};

export default Message;
