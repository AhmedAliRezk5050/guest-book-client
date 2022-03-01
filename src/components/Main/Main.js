import styles from './Main.module.css';

import { useAuthContext } from '../../context/auth/AuthProvider';
import Auth from '../Auth/Auth';
import Banner from '../Banner/Banner';

const Main = () => {
  const { state, dispatch } = useAuthContext();
  console.log('context ---', state);
  return (
    <main className={styles.main}>
      <Banner />
      <Auth />
    </main>
  );
};

export default Main;
