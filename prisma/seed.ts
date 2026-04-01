import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.track.deleteMany();
  await prisma.album.deleteMany();

  console.log('Seeding demo albums...');

  await prisma.album.create({
    data: {
      title: 'Midnight Synthwave',
      artist: 'Retro Runner',
      genre: 'Electronic',
      coverUrl: null,
    },
  });

  await prisma.album.create({
    data: {
      title: 'Acoustic Sessions',
      artist: 'Forest Echo',
      genre: 'Folk / Indie',
      coverUrl: null,
    },
  });

  await prisma.album.create({
    data: {
      title: 'Urban Beats 2024',
      artist: 'City Slicker',
      genre: 'Lo-Fi / Hip Hop',
      coverUrl: null,
    },
  });

  console.log('Seeding complete! 3 demo albums created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
