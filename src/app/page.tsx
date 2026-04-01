import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Album } from '@prisma/client';
import prisma from '@/lib/prisma';
import AlbumCard from '@/components/AlbumCard';
import styles from './page.module.css';

export default async function Home() {
  const albums = await prisma.album.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container">
      <header className={styles.header}>
        <div>
          <h1 className="text-gradient">Your Collection</h1>
          <p className={styles.subtitle}>Organize and play your favorite music.</p>
        </div>
        <Link href="/create" className={styles.createButton}>
          <Plus size={20} />
          <span>Create Album</span>
        </Link>
      </header>

      {albums.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Plus size={48} />
          </div>
          <h3>No albums yet</h3>
          <p>Create your first album to start building your collection.</p>
          <Link href="/create" className={styles.emptyButton}>
            Get Started
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {albums.map((album: Album) => (
            <AlbumCard 
              key={album.id}
              id={album.id}
              title={album.title}
              artist={album.artist}
              coverUrl={album.coverUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
