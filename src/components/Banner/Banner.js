import styles from './Banner.module.css';
import proposalImg from './proposal.jpg';

const Banner = () => {
  return (
    <header className={styles.header}>
      <div className={styles.imgWrapper}>
        <img src={proposalImg} alt='proposal' className={styles.img} />
      </div>
      <h1 className={styles.title}>
        <span>Chandler & Monica</span>
        <span className={styles.subtitle}>wedding</span>
      </h1>
    </header>
  );
};

export default Banner;
