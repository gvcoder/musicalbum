'use client';

import { Play, Trash2 } from 'lucide-react';
import type { Track } from '@prisma/client';
import { useAudio } from '@/components/AudioContext';
import { deleteTrack } from '@/app/actions/track';
import styles from '../app/album/[id]/page.module.css';

interface TrackListProps {
  tracks: Track[];
  albumId: string;
}

export default function TrackList({ tracks, albumId }: TrackListProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track, tracks);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.trackList}>
      {tracks.length === 0 ? (
        <div className={styles.noTracks}>
          <p>No tracks added yet.</p>
        </div>
      ) : (
        tracks.map((track, index) => {
          const isActive = currentTrack?.id === track.id;
          
          return (
            <div 
              key={track.id} 
              className={`${styles.trackItem} ${isActive ? styles.activeTrack : ''}`}
            >
              <div className={styles.trackIndex}>{index + 1}</div>
              <button 
                className={styles.trackPlay}
                onClick={() => handleTrackClick(track)}
              >
                {isActive && isPlaying ? (
                  <div className={styles.playingBars}>
                    <span></span><span></span><span></span>
                  </div>
                ) : (
                  <Play size={16} fill="currentColor" />
                )}
              </button>
              <div className={styles.trackName}>
                <span>{track.title}</span>
              </div>
              <div className={styles.trackDuration}>{formatTime(track.duration)}</div>
              <form action={async () => {
                const confirmed = confirm('Delete this track?');
                if (confirmed) await deleteTrack(track.id, albumId);
              }}>
                <button type="submit" className={styles.trackDelete}>
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          );
        })
      )}
    </div>
  );
}
