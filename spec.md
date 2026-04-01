# MusicVault — Simple Music Album Project Specification

## 1. Project Overview
**MusicVault** is a streamlined, aesthetically premium music album management application built with Next.js. It allows users to organize their private music collections by creating albums and uploading MP3 tracks without the need for authentication.

The primary focus is on **Visual Excellence** and **Seamless User Experience**, delivering a high-end feel through modern design patterns.

---

## 2. Core Features

### 2.1 Album Management
- **Dashboard View**: A grid of album covers with titles and artist names.
- **Create Album**: Form to specify Album Title, Artist, Genre, and upload a Cover Image (PNG/JPG).
- **Edit/Delete**: Options to update album metadata or remove an entire album (including its tracks).

### 2.2 Track Management
- **MP3 Upload**: Drag-and-drop or file picker to upload multiple tracks to a specific album.
- **Track List**: View all songs in an album with duration and playback status.
- **Manage Tracks**: Option to rename or delete individual tracks.

### 2.3 Integrated Audio Player
- **Persistent Player Bar**: A bottom-docked player that stays active during navigation.
- **Controls**: Play/Pause, Skip (Next/Previous), Seek Bar, Volume, and Mute.
- **Visuals**: Displays the current track's album art, title, and artist.

---

## 3. Design & Aesthetics

### 3.1 Design Principles
- **Dark Mode First**: Deep charcoal and navy backgrounds with vibrant accent colors.
- **Glassmorphism**: UI elements use backdrop blurs and semi-transparent borders for depth.
- **Premium Typography**: Use of clean, modern sans-serif fonts (e.g., Inter or Outfit).
- **Micro-animations**: Smooth hover transitions for album cards and buttons.

### 3.2 Component Library (Vanilla CSS)
- **Album Card**: Pulsing shadow on hover, high-resolution cover preview.
- **Glass Modal**: Frosted-glass effect for forms and track lists.
- **Animated Player**: Progress bar with a glowing "active" state.

---

## 4. Technical Architecture

### 4.1 Frontend
- **Framework**: Next.js (App Router).
- **Logic**: React Hooks for state management (track queue, playback state).
- **Styling**: Vanilla CSS (Global variables, CSS Modules).

### 4.2 Backend & Data
- **Database**: SQLite with Prisma ORM for metadata storage.
- **File Storage**: Local directory (`/public/uploads` or `/storage`) for MP3s and images.
- **API**: Next.js Server Actions for file uploads and database operations.

---

## 5. User Workflow
1. **Landing**: User sees their album collection.
2. **Creation**: User clicks "New Album" -> Enters title/artist -> Uploads cover -> "Save".
3. **Upload**: User clicks into the album -> Drags 5 MP3 files into the upload zone.
4. **Playback**: User clicks a track or "Play Album" -> Bottom player activates.

---

## 6. Success Metrics
- Fully functional local music playback.
- Zero "plain" or "browser-default" UI elements.
- Intuitive drag-and-drop file management.
