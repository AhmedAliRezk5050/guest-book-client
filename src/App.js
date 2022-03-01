import './App.css';
import { useEffect } from 'react';
import guestBookApi from './api/guest-book';
import Main from './components/Main/Main';
import AuthProvider from './context/auth/AuthProvider';

function App() {
  useEffect(() => {
    const register = async () => {
      try {
        const { userId, errors } = await guestBookApi.register(
          'zzogrdiano',
          'ahmedalirezk50@gmail.com',
          '12345678Ae@',
        );

        console.log(userId, errors);
      } catch (error) {
        console.log(error);
      }
    };
    // s
    const login = async () => {
      try {
        const { userData, errors } = await guestBookApi.login(
          'zzogrdianoss',
          'ahme0@gmail.com',
          '12345678Ae@',
        );

        console.log(userData, errors);
      } catch (error) {
        console.log('error -------------- ', error);
      }
    };
    // s
    const fetchMessages = async () => {
      try {
        const { messages, errors } = await guestBookApi.fetchMessages(
          'zzogrdianoss',
          'ahme0@gmail.com',
          '12345678Ae@',
        );

        console.log(messages, errors);
      } catch (error) {
        console.log('error -------------- ', error);
      }
    };
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
      <Main />
    </AuthProvider>
  );
}

export default App;
