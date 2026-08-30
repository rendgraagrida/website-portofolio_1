import { db } from '../../backend/src/db';
import { projects } from '../../backend/src/db/schema';

const myExperiences = [
  { 
    title: 'Python Data Automation', 
    titleEn: 'Python Data Automation',
    description: 'Mengotomatisasi ekstraksi, pembersihan, dan pelaporan data Data Acquisition Unit (DAU) menggunakan Python, meningkatkan efisiensi dan keakuratan analisis data operasional.', 
    descriptionEn: 'Automated data extraction, cleansing, and reporting of Data Acquisition Unit (DAU) data using Python, significantly improving the efficiency and accuracy of operational data analysis.',
    techStack: 'Python, Data Analysis',
    imageUrl: ''
  },
  { 
    title: 'Oracle Database & Siebel CRM Admin', 
    titleEn: 'Oracle Database & Siebel CRM Administrator',
    description: 'Mengelola, memelihara, dan melakukan troubleshooting infrastruktur database skala enterprise untuk mendukung operasi bisnis Telkom Enterprise.', 
    descriptionEn: 'Managed, maintained, and troubleshot enterprise-scale database infrastructure to support Telkom Enterprise business operations.',
    techStack: 'Oracle DB, Siebel CRM, Linux',
    imageUrl: ''
  },
  { 
    title: 'Data Management & Migration', 
    titleEn: 'Data Management & Migration',
    description: 'Menulis SQL kompleks untuk validasi data, migrasi, dan rekonsiliasi lintas platform antara sistem IndiHome, Tcares, dan Telkomsel.', 
    descriptionEn: 'Authored complex SQL queries for data validation, migration, and reconciliation across platforms including IndiHome, Tcares, and Telkomsel systems.',
    techStack: 'SQL, PL/SQL',
    imageUrl: ''
  },
  { 
    title: 'Technical Leadership & Planning', 
    titleEn: 'Technical Leadership & Planning',
    description: 'Mengoordinasikan resource IT, menyusun arsitektur sistem, dan memastikan kelancaran pengiriman proyek lintas divisi dengan dokumentasi teknis standar tinggi.', 
    descriptionEn: 'Coordinated IT resources, structured system architecture, and ensured smooth cross-divisional project delivery with high-standard technical documentation.',
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
