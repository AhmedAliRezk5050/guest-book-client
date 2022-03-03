import styles from './Banner.module.css';

const Banner = () => {
  return (
    <header className={styles.header}>
      <img
        src='https://www.tvinsider.com/wp-content/uploads/2018/01/18-06-5334-1014x570.jpg'
        alt='proposal'
        className={styles.img}
      />
      <h1 className={styles.title}>
        <span>Chandler & Monica</span>
        <span className={styles.subtitle}>wedding</span>
      </h1>
    </header>
  );
};

export default Banner;
