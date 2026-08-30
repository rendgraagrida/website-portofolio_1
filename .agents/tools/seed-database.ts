import { db } from '../../backend/src/db';
import { projects } from '../../backend/src/db/schema';

const dummyProjects = [
  { 
    title: 'Kopi Kenangan App', 
    description: 'Aplikasi pemesanan kopi yang memudahkan harimu.', 
    techStack: 'React Native',
    imageUrl: ''
  },
  { 
    title: 'Toserba Online', 
    description: 'E-commerce lokal yang membumi dan merakyat.', 
    techStack: 'Astro + Elysia',
    imageUrl: ''
  },
  { 
    title: 'POS Kasir', 
    description: 'Sistem point of sales untuk warung tetangga.', 
    techStack: 'Vue + Go',
    imageUrl: ''
  },
  { 
    title: 'Buku Tamu Digital', 
    description: 'Pencatatan tamu lebih praktis.', 
    techStack: 'Next.js',
    imageUrl: ''
  },
];

async function seed() {
  console.log('🌱 Seeding database...');
  try {
    await db.insert(projects).values(dummyProjects);
    console.log('✅ Berhasil menyisipkan dummy data proyek!');
  } catch (error) {
    console.error('❌ Gagal seed:', error);
  }
}

seed();
