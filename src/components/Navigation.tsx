import Link from 'next/link';
import { Music2, Library, Info } from 'lucide-react';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <Music2 className={styles.logoIcon} />
          <span className="text-gradient">MusicVault</span>
        </Link>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            <Library size={18} />
            <span>Collection</span>
          </Link>
          <Link href="/about" className={styles.link}>
            <Info size={18} />
            <span>About</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
