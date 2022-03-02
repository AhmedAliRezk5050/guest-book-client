import styles from './Banner.module.css';
import proposalImg from './proposal.jpg';

const Banner = () => {
  return (
    <header className={styles.header}>
      <img src={proposalImg} alt='proposal' className={styles.img} />
      <h1 className={styles.title}>
        <span>Chandler & Monica</span>
        <span className={styles.subtitle}>wedding</span>
      </h1>
    </header>
  );
};

export default Banner;
