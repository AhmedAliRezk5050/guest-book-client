import styles from './Main.module.css';

import { useAuthContext } from '../../context/auth/AuthProvider';
import Auth from '../Auth/Auth';
import Banner from '../Banner/Banner';
import MessagesSection from '../MessagesSection/MessagesSection';
import AddMessageSection from '../AddMessageSection/AddMessageSection';
import { useEffect } from 'react';

const Main = () => {
  const { state, dispatch } = useAuthContext();
  console.log('context ---', state);

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('userData');
    if (userDataFromStorage) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(userDataFromStorage) });
    }
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <Banner />
      {state.userData && (
        <button
          className={styles.logout}
          onClick={() => {
            dispatch({ type: 'REMOVE_USER' });
            localStorage.removeItem('userData');
          }}
        >
          Logout
        </button>
      )}

      {state.userData ? (
        <>
          <AddMessageSection />
          <MessagesSection />
        </>
      ) : (
        <Auth />
      )}
    </main>
  );
};

export default Main;
