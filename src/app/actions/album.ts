'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function createAlbum(formData: FormData) {
  const title = formData.get('title') as string;
  const artist = formData.get('artist') as string;
  const genre = formData.get('genre') as string;
  const cover = formData.get('cover') as File;

  let coverUrl = null;

  if (cover && cover.size > 0) {
    const fileName = `${Date.now()}-${cover.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', 'covers', fileName);
    
    const arrayBuffer = await cover.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await fs.writeFile(filePath, buffer);
    coverUrl = `/uploads/covers/${fileName}`;
  }

  await prisma.album.create({
    data: {
      title,
      artist,
      genre,
      coverUrl,
    },
  });

  revalidatePath('/');
  redirect('/');
}

export async function deleteAlbum(id: string) {
  const album = await prisma.album.findUnique({
    where: { id },
    include: { tracks: true }
  });

  if (album) {
    // Delete cover image
    if (album.coverUrl) {
      const coverPath = path.join(process.cwd(), 'public', album.coverUrl);
      await fs.unlink(coverPath).catch(() => {});
    }

    // Delete tracks
    for (const track of album.tracks) {
      const trackPath = path.join(process.cwd(), 'public', track.fileUrl);
      await fs.unlink(trackPath).catch(() => {});
    }
  }

  await prisma.album.delete({ where: { id } });
  revalidatePath('/');
}
