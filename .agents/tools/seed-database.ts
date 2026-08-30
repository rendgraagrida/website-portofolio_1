import { db } from '../../backend/src/db';
import { projects } from '../../backend/src/db/schema';

const myExperiences = [
  { 
    title: 'Python Data Automation', 
    description: 'Mengotomatisasi ekstraksi, pembersihan, dan pelaporan data Data Acquisition Unit (DAU) menggunakan Python, meningkatkan efisiensi dan keakuratan analisis data operasional.', 
    techStack: 'Python, Data Analysis',
    imageUrl: ''
  },
  { 
    title: 'Oracle Database & Siebel CRM Admin', 
    description: 'Mengelola, memelihara, dan melakukan troubleshooting infrastruktur database skala enterprise untuk mendukung operasi bisnis Telkom Enterprise.', 
    techStack: 'Oracle DB, Siebel CRM, Linux',
    imageUrl: ''
  },
  { 
    title: 'Data Management & Migration', 
    description: 'Menulis SQL kompleks untuk validasi data, migrasi, dan rekonsiliasi lintas platform antara sistem IndiHome, Tcares, dan Telkomsel.', 
    techStack: 'SQL, PL/SQL',
    imageUrl: ''
  },
  { 
    title: 'Technical Leadership & Planning', 
    description: 'Mengoordinasikan resource IT, menyusun arsitektur sistem, dan memastikan kelancaran pengiriman proyek lintas divisi dengan dokumentasi teknis standar tinggi.', 
    techStack: 'Tech Lead, IT Governance',
    imageUrl: ''
  },
];

async function seed() {
  console.log('🌱 Menghapus data lama...');
  try {
    // Kosongkan tabel (Hati-hati: Hanya untuk Development/SQLite)
    await db.delete(projects);
    
    console.log('🌱 Memasukkan pengalaman kerja nyata...');
    await db.insert(projects).values(myExperiences);
    console.log('✅ Berhasil menyisipkan data pengalaman Rendgra Agrida!');
  } catch (error) {
    console.error('❌ Gagal seed:', error);
  }
}

seed();
