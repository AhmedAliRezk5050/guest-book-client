import './App.css';
import { useEffect } from 'react';
import guestBookApi from './api/guest-book';
import Main from './components/Main/Main';
import AuthProvider from './context/auth/AuthProvider';
import MessagesProvider from './context/auth/MessagesProvider';

function App() {
  useEffect(() => {
    // fetchMessages();
    // s
    const fetchMessage = async (id) => {
      try {
        const { message, errors } = await guestBookApi.fetchMessage(id);

        console.log(message, errors);
      } catch (error) {
        console.log('error -------------- ', error);
      }
    };
    // s
    // s

    // s
    // s
    const updateMessage = async (messageId, username, content) => {
      try {
        const { updatedMessageId, errors } = await guestBookApi.updateMessage(
          messageId,
          username,
          content,
        );

        console.log(updatedMessageId, errors);
      } catch (error) {
        console.log('error -------------- ', error);
      }
    };
    // updateMessage(
    //   '621e04292a6360fc08afad7a',
    //   'chandler',
    //   'updated from chrome2',
    // );
    // s
    // s

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
  }, []);

  return (
    <AuthProvider>
      <MessagesProvider>
        <Main />
      </MessagesProvider>
    </AuthProvider>
  );
}

export default App;
