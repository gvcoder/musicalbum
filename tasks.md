# MusicVault Project Tasks

This document tracks the implementation progress of the **MusicVault** application, as defined in the `spec.md` and `design.md`.

## 🟢 1. Project Initialization & Infrastructure
- [x] Initialize Next.js project (App Router, Tailwind/Vanilla choice).
- [x] Install essential dependencies (`prisma`, `@prisma/client`, `lucide-react`, `clsx`, `tailwind-merge`).
- [x] Initialize Prisma with SQLite.
- [x] Set up basic folder structure (`/src/components`, `/src/lib`, `/public/uploads`).

## 🟢 2. Design System & Foundation (Vanilla CSS)
- [x] Define global CSS variables (colors, spacing, glassmorphism tokens).
- [x] Implement `RootLayout` with Glassmorphism navigation.
- [x] Create basic button and input UI components in a "premium" style.

## 🟢 3. Database & Metadata Layer
- [x] Design Prisma Schema (`Album` and `Track` model).
- [x] Run initial migration and generate Prisma Client.
- [x] Create seed script for sample albums (optional).

## 🟢 4. Album Management (CRUD)
- [x] Build **Dashboard** (Album Grid view).
- [x] Implement **Create Album** modal/form (Title, Artist, Cover Upload).
- [x] Implement **Album Cover** image processing/storage logic.
- [x] Add **Edit/Delete Album** functionality.

## 🟢 5. Track Management & File Uploads
- [x] Build **Album Details** page.
- [x] Implement MP3 **File Uploader** (Drag-and-drop or picker).
- [x] Write Server Actions for MP3 storage and metadata tracking.
- [x] Implement **Track List** component (List tracks, delete option).

## 🟢 6. Integrated Audio Player
- [x] Set up `AudioContext` React Provider for global playback state.
- [x] Build **Persistent Player Bar** component (visual controls).
- [x] Implement HTML5 Audio logic (Play, Pause, Progress, Volume).
- [x] Implement **Playlist/Queue** logic (play album, skip tracks).

## 🟢 7. Polishing & Aesthetics
- [ ] Add smooth transitions and micro-animations.
- [ ] Optimize "Glass" effects and background gradients.
- [ ] Responsive design check (Mobile/Desktop views).

## 🟢 8. Final Testing & Validation
- [^] Perform integration testing for file uploads.
- [ ] Verify Audio Player persistence during navigation.
- [ ] Check accessibility (ARIA labels, keyboard navigation).
