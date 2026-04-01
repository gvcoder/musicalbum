'use client';

import { AudioProvider } from './AudioContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      {children}
    </AudioProvider>
  );
}
