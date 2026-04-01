import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Play, Trash2, Music, Upload } from 'lucide-react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { deleteAlbum } from '@/app/actions/album';
import { uploadTrack } from '@/app/actions/track';
import TrackList from '@/components/TrackList';
import styles from './page.module.css';

interface AlbumPageProps {
  params: Promise<{ id: string }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { id } = await params;
  
  const album = await prisma.album.findUnique({
    where: { id },
    include: { tracks: { orderBy: { trackOrder: 'asc' } } }
  });

  if (!album) notFound();

  return (
    <div className="container">
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <ChevronLeft size={20} />
          Back
        </Link>
        <div className={styles.headerMain}>
          <div className={styles.coverWrapper}>
            {album.coverUrl ? (
              <Image src={album.coverUrl} alt={album.title} fill className={styles.cover} />
            ) : (
              <div className={styles.placeholder}><Music size={48} /></div>
            )}
          </div>
          <div className={styles.metadata}>
            <div className={styles.badge}>{album.genre || 'Music'}</div>
            <h1 className={styles.title}>{album.title}</h1>
            <p className={styles.artist}>{album.artist}</p>
            <div className={styles.actions}>
              <form action={deleteAlbum.bind(null, id)}>
                <button type="submit" className={styles.deleteButton}>
                  <Trash2 size={18} />
                  Delete Album
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.trackSection}>
          <div className={styles.sectionHeader}>
            <h2 className="text-gradient">Tracks</h2>
            <p>{album.tracks.length} songs</p>
          </div>

          <TrackList tracks={album.tracks} albumId={id} />
        </div>

        {/* Upload Sidebar/Section */}
        <aside className={`${styles.uploadSection} glass-effect`}>
          <h3 className={styles.uploadTitle}>
            <Upload size={18} />
            Add Track
          </h3>
          <form action={uploadTrack} className={styles.uploadForm}>
            <input type="hidden" name="albumId" value={id} />
            <div className={styles.inputGroup}>
              <label>Track Name (Optional)</label>
              <input type="text" name="title" placeholder="e.g. Moonlight Drive" />
            </div>
            <div className={styles.inputGroup}>
              <label>MP3 File</label>
              <div className={styles.smallFileUpload}>
                <input type="file" name="file" accept="audio/mpeg" required />
                <span>Select file</span>
              </div>
            </div>
            <button type="submit" className={styles.uploadButton}>
              Upload Track
            </button>
          </form>
        </aside>
      </section>
    </div>
  );
}
