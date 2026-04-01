import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className="text-gradient">About MusicVault</h1>
        <p className={styles.subtitle}>A private sanctuary for your digital music collection.</p>
      </header>

      <section className={`${styles.content} glass-effect`}>
        <p>
          MusicVault was designed with a single goal: to provide an exceptionally 
          beautiful and simple way to enjoy your own music files without the noise 
          of streaming subscriptions or social algorithms.
        </p>
        
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <h3>Local First</h3>
            <p>Your files stay on your machine. No cloud syncing or data mining.</p>
          </div>
          <div className={styles.feature}>
            <h3>Premium Design</h3>
            <p>Using modern glassmorphism and smooth animations for a state-of-the-art feel.</p>
          </div>
          <div className={styles.feature}>
            <h3>Zero Friction</h3>
            <p>No login, no profiles. Just upload your MP3s and hit play.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
