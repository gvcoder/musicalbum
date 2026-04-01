'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function uploadTrack(formData: FormData) {
  const title = formData.get('title') as string;
  const albumId = formData.get('albumId') as string;
  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    throw new Error('No track file provided');
  }

  // Create sanitized file name
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', 'tracks', fileName);
  const fileUrl = `/uploads/tracks/${fileName}`;

  // Write track to filesystem
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(filePath, buffer);

  // Auto-increment track order
  const lastTrack = await prisma.track.findFirst({
    where: { albumId },
    orderBy: { trackOrder: 'desc' }
  });
  const trackOrder = (lastTrack?.trackOrder ?? 0) + 1;

  // Add metadata to database
  await prisma.track.create({
    data: {
      title: title || file.name.replace(/\.[^/.]+$/, ""), // Fallback to filename
      albumId,
      fileUrl,
      trackOrder,
      duration: 0, // Duration will be extracted on the client or with ffprobe (local)
    },
  });

  revalidatePath(`/album/${albumId}`);
}

export async function deleteTrack(id: string, albumId: string) {
  const track = await prisma.track.findUnique({
    where: { id }
  });

  if (track) {
    const filePath = path.join(process.cwd(), 'public', track.fileUrl);
    await fs.unlink(filePath).catch(() => {});
  }

  await prisma.track.delete({ where: { id } });
  revalidatePath(`/album/${albumId}`);
}
