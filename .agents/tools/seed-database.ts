import { db } from '../../backend/src/db';
import { projects } from '../../backend/src/db/schema';

const githubProjects = [
  {
    title: 'Trade Apps Backend (Crypto & Wallet Tracker)',
    titleEn: 'Trade Apps Backend (Crypto & Wallet Tracker)',
    description: 'Aplikasi backend untuk melacak wallet cryptocurrency, analisis koin potensial, dan agregasi data historis transaksi finansial.',
    descriptionEn: 'Backend system designed to track crypto wallets, analyze coin metrics, and aggregate historical financial transaction data.',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/trade-apps-backend',
    techStack: 'JavaScript, Node.js, Web3, Crypto API'
  },
  {
    title: 'AutoTesseract (Automated Quiz & OCR Engine)',
    titleEn: 'AutoTesseract (Automated Quiz & OCR Engine)',
    description: 'Otomatisasi pengisian kuis dan ekstraksi data teks gambar secara presisi menggunakan teknologi OCR Python.',
    descriptionEn: 'Intelligent automation tool for quiz solving and image text extraction using Python OCR technology.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/AutoTesseract',
    techStack: 'Python, OCR, Tesseract, Automation'
  },
  {
    title: 'Frontend Pelacak App (Asset Tracking UI)',
    titleEn: 'Frontend Pelacak App (Asset Tracking UI)',
    description: 'Dashboard antarmuka modern untuk pelacakan transaksi, monitoring metrik portofolio, dan visualisasi data aset.',
    descriptionEn: 'Modern UI dashboard for transaction tracking, portfolio metrics monitoring, and asset data visualization.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/frontend-pelacak-app',
    techStack: 'TypeScript, React, TailwindCSS'
  },
  {
    title: 'Caro Projects (Robinhood Chain DApp)',
    titleEn: 'Caro Projects (Robinhood Chain DApp)',
    description: 'Eksplorasi aplikasi terdesentralisasi (DApp) dan smart contract pada ekosistem blockchain Robinhood Chain.',
    descriptionEn: 'Decentralized application (DApp) and smart contract implementation built on the Robinhood Chain blockchain ecosystem.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/caro-projects',
    techStack: 'Solidity, Web3.js, Blockchain'
  },
  {
    title: 'Website Portofolio Enterprise & Master Template',
    titleEn: 'Enterprise Portfolio & Master Template',
    description: 'Website portofolio fullstack performa tinggi dengan Astro, React, Elysia, LibSQL, dan arsitektur Master Template AI.',
    descriptionEn: 'High-performance fullstack portfolio website built with Astro, React, Elysia, LibSQL, and AI Master Template architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/website-portofolio_1',
    techStack: 'Astro, React, Elysia, Bun, SQLite'
  }
];

async function seed() {
  console.log('🌱 Menghapus data lama...');
  try {
    await db.delete(projects);
    
    console.log('🌱 Memasukkan repositori GitHub nyata Rendgra Agrida...');
    await db.insert(projects).values(githubProjects);
    console.log('✅ Berhasil menyisipkan 5 data repositori GitHub!');
  } catch (error) {
    console.error('❌ Gagal seed:', error);
  }
}

seed();
