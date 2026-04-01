'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useAudio } from './AudioContext';
import styles from './AudioPlayer.module.css';

export default function AudioPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration, 
    volume, 
    togglePlay, 
    nextTrack, 
    prevTrack, 
    setVolume, 
    seek 
  } = useAudio();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  };

  if (!mounted || !currentTrack) return null;

  return (
    <div className={styles.playerWrapper}>
      <div className={`${styles.playerContainer} glass-effect`}>
        {/* Track Info */}
        <div className={styles.trackInfo}>
          <div className={styles.albumArtPlaceholder} />
          <div className={styles.metadata}>
            <span className={styles.trackTitle}>{currentTrack.title}</span>
            <span className={styles.artistName}>Streaming...</span>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controlsSection}>
          <div className={styles.mainControls}>
            <button onClick={prevTrack} className={styles.controlIcon}><SkipBack size={20} fill="currentColor" /></button>
            <button onClick={togglePlay} className={styles.playButton}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
            <button onClick={nextTrack} className={styles.controlIcon}><SkipForward size={20} fill="currentColor" /></button>
          </div>
          <div className={styles.progressContainer}>
            <span className={styles.timeLabel}>{formatTime(progress)}</span>
            <div className={styles.progressBar} onClick={handleSeek}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
            <span className={styles.timeLabel}>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className={styles.extraControls}>
          <Volume2 size={20} color="var(--text-muted)" />
          <div className={styles.volumeBar}>
            <div 
              className={styles.volumeFill} 
              style={{ width: `${volume * 100}%` }}
            />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className={styles.volumeInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
