import Link from 'next/link';
import { ChevronLeft, Upload } from 'lucide-react';
import { createAlbum } from '@/app/actions/album';
import styles from './page.module.css';

export default function CreateAlbumPage() {
  return (
    <div className="container">
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <ChevronLeft size={20} />
          <span>Back to Collection</span>
        </Link>
        <h1 className="text-gradient">Create New Album</h1>
      </header>

      <div className={`${styles.formWrapper} glass-effect`}>
        <form action={createAlbum} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="title">Album Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              placeholder="e.g. Midnight Melodies" 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="artist">Artist Name</label>
            <input 
              type="text" 
              id="artist" 
              name="artist" 
              placeholder="e.g. Luna Ray" 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="genre">Genre</label>
            <input 
              type="text" 
              id="genre" 
              name="genre" 
              placeholder="e.g. Synthwave" 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cover">Album Cover Image</label>
            <div className={styles.fileInputWrapper}>
              <Upload size={24} className={styles.uploadIcon} />
              <input 
                type="file" 
                id="cover" 
                name="cover" 
                accept="image/*" 
              />
              <p>Drag & Drop or Click to upload</p>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitButton}>
              Create Album
            </button>
            <Link href="/" className={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
