import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import styles from './AlbumCard.module.css';

interface AlbumCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl: string | null;
}

export default function AlbumCard({ id, title, artist, coverUrl }: AlbumCardProps) {
  return (
    <Link href={`/album/${id}`} className={styles.card}>
      <div className={styles.coverWrapper}>
        {coverUrl ? (
          <Image 
            src={coverUrl} 
            alt={title} 
            fill 
            className={styles.cover}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.placeholder}>
            <span>No Cover Art</span>
          </div>
        )}
        <div className={styles.overlay}>
          <div className={styles.playButton}>
            <Play fill="currentColor" size={24} />
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artist}>{artist}</p>
      </div>
    </Link>
  );
}
