import './App.css';
import { useEffect } from 'react';
import guestBookApi from './api/guest-book';
import Main from './components/Main/Main';
import AuthProvider from './context/auth/AuthProvider';
import MessagesProvider from './context/auth/MessagesProvider';

function App() {
  return (
    <AuthProvider>
      <MessagesProvider>
        <Main />
      </MessagesProvider>
    </AuthProvider>
  );
}

export default App;
