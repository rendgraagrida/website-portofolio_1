import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { api, type ProjectData } from '../lib/eden';
import { ui } from '../i18n/ui';
import { Code, ExternalLink, FolderGit2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectSliderProps {
  lang: 'id' | 'en';
}

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const GITHUB_PROJECTS_FALLBACK: ProjectData[] = [
  {
    id: 1,
    title: 'Trade Apps Backend (Crypto & Wallet Tracker)',
    titleEn: 'Trade Apps Backend (Crypto & Wallet Tracker)',
    description: 'Aplikasi backend untuk melacak wallet cryptocurrency, analisis koin potensial, dan agregasi data historis transaksi finansial.',
    descriptionEn: 'Backend system designed to track crypto wallets, analyze coin metrics, and aggregate historical financial transaction data.',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/trade-apps-backend',
    techStack: 'JavaScript, Node.js, Web3, Crypto API'
  },
  {
    id: 2,
    title: 'AutoTesseract (Automated Quiz & OCR Engine)',
    titleEn: 'AutoTesseract (Automated Quiz & OCR Engine)',
    description: 'Otomatisasi pengisian kuis dan ekstraksi data teks gambar secara presisi menggunakan teknologi OCR Python.',
    descriptionEn: 'Intelligent automation tool for quiz solving and image text extraction using Python OCR technology.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/AutoTesseract',
    techStack: 'Python, OCR, Tesseract, Automation'
  },
  {
    id: 3,
    title: 'Frontend Pelacak App (Asset Tracking UI)',
    titleEn: 'Frontend Pelacak App (Asset Tracking UI)',
    description: 'Dashboard antarmuka modern untuk pelacakan transaksi, monitoring metrik portofolio, dan visualisasi data aset.',
    descriptionEn: 'Modern UI dashboard for transaction tracking, portfolio metrics monitoring, and asset data visualization.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/frontend-pelacak-app',
    techStack: 'TypeScript, React, TailwindCSS'
  },
  {
    id: 4,
    title: 'Caro Projects (Robinhood Chain DApp)',
    titleEn: 'Caro Projects (Robinhood Chain DApp)',
    description: 'Eksplorasi aplikasi terdesentralisasi (DApp) dan smart contract pada ekosistem blockchain Robinhood Chain.',
    descriptionEn: 'Decentralized application (DApp) and smart contract implementation built on the Robinhood Chain blockchain ecosystem.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/caro-projects',
    techStack: 'Solidity, Web3.js, Blockchain'
  },
  {
    id: 5,
    title: 'Website Portofolio Enterprise & Master Template',
    titleEn: 'Enterprise Portfolio & Master Template',
    description: 'Website portofolio fullstack performa tinggi dengan Astro, React, Elysia, LibSQL, dan arsitektur Master Template AI.',
    descriptionEn: 'High-performance fullstack portfolio website built with Astro, React, Elysia, LibSQL, and AI Master Template architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/rendgraagrida/website-portofolio_1',
    techStack: 'Astro, React, Elysia, Bun, SQLite'
  }
];

export const ProjectSlider: React.FC<ProjectSliderProps> = ({ lang }) => {
  const t = ui[lang];
  const [projects, setProjects] = useState<ProjectData[]>(GITHUB_PROJECTS_FALLBACK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await api.api.projects.get();
        if (data && !error && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.warn("Menggunakan fallback data GitHub projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="proyek" className="py-24 bg-earth-100/60 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-brand-brown/10 text-brand-brown rounded-lg">
              <FolderGit2 size={22} />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-brand-brown">
              GitHub Projects Showcase
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
            {t['projects.title']}
          </h2>
          <p className="text-earth-800 text-base md:text-lg max-w-2xl mt-2 leading-relaxed">
            {t['projects.desc']}
          </p>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button 
            id="swiper-prev-btn" 
            aria-label="Previous Slide"
            className="p-3 bg-white hover:bg-brand-brown hover:text-white text-earth-800 rounded-full border border-earth-300 shadow-sm transition-all focus:outline-none"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            id="swiper-next-btn" 
            aria-label="Next Slide"
            className="p-3 bg-white hover:bg-brand-brown hover:text-white text-earth-800 rounded-full border border-earth-300 shadow-sm transition-all focus:outline-none"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20 text-earth-800 font-bold">
            {lang === 'id' ? 'Sedang memuat slider repositori...' : 'Loading repository slider...'}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: '#swiper-prev-btn',
              nextEl: '#swiper-next-btn',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 !px-1"
          >
            {projects.map((project) => {
              const displayTitle = lang === 'en' && project.titleEn ? project.titleEn : project.title;
              const displayDesc = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
              
              return (
                <SwiperSlide key={project.id} className="h-auto pb-2">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-earth-200/80 h-full flex flex-col group select-none">
                    <div className="h-48 rounded-xl mb-5 overflow-hidden bg-earth-200 relative">
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={displayTitle} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-brand-cream">
                          <Code size={36} className="text-brand-brown/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-brown/90 hover:bg-brand-brown px-3 py-1.5 rounded-lg shadow transition-colors"
                          >
                            <GithubIcon size={14} />
                            <span>{lang === 'id' ? 'Buka di GitHub' : 'View on GitHub'}</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-brown transition-colors">
                      {displayTitle}
                    </h3>
                    
                    <p className="text-earth-700 text-sm leading-relaxed mb-6 flex-grow">
                      {displayDesc}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-earth-100 flex flex-col gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack?.split(',').map((tech, i) => (
                          <span 
                            key={i} 
                            className="inline-block text-xs font-semibold text-brand-brown bg-brand-brown/10 px-2.5 py-1 rounded-md"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-between text-xs font-bold text-earth-700 hover:text-brand-brown bg-earth-50 hover:bg-earth-100/80 px-3 py-2 rounded-lg transition-colors mt-1"
                        >
                          <span className="flex items-center gap-1.5">
                            <GithubIcon size={15} />
                            <span>{project.githubUrl.replace('https://github.com/', '')}</span>
                          </span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};
