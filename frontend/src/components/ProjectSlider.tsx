import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { api, type ProjectData } from '../lib/eden';
import { ui } from '../i18n/ui';
import { Code, Database, Server, Cpu } from 'lucide-react';

interface ProjectSliderProps {
  lang: 'id' | 'en';
}

const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: 'Python Data Acquisition & Automation',
    titleEn: 'Python Data Acquisition & Automation',
    description: 'Mengembangkan sistem automasi ekstraksi, cleansing, dan visualisasi data operasional sumur minyak DAU secara presisi.',
    descriptionEn: 'Developed an automated pipeline for extracting, cleansing, and visualizing DAU oil exploration data with high precision.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    techStack: 'Python, Pandas, Automation, Data Analysis'
  },
  {
    id: 2,
    title: 'Enterprise Oracle & Siebel CRM Optimization',
    titleEn: 'Enterprise Oracle & Siebel CRM Optimization',
    description: 'Arsitektur pemeliharaan database skala enterprise, tuning query SQL performa tinggi, dan otomatisasi server deployment.',
    descriptionEn: 'Enterprise-scale database maintenance architecture, high-performance SQL query tuning, and automated server deployments.',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    techStack: 'Oracle DB, Siebel CRM, PL/SQL, Linux'
  },
  {
    id: 3,
    title: 'Cross-System Data Reconciliation Engine',
    titleEn: 'Cross-System Data Reconciliation Engine',
    description: 'Skrip validasi & rekonsiliasi data skala jutaan baris lintas sistem Telkomsel, IndiHome, dan TCares tanpa downtime.',
    descriptionEn: 'Data validation & reconciliation scripts handling millions of records across Telkomsel, IndiHome, and TCares systems with zero downtime.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    techStack: 'SQL, Bash, Python, ETL'
  },
  {
    id: 4,
    title: 'DevOps Automated Monitoring & Scripting',
    titleEn: 'DevOps Automated Monitoring & Scripting',
    description: 'Otomatisasi pemantauan kesehatan server berkala, failover detection, dan auto-healing scripts untuk sistem kritikal.',
    descriptionEn: 'Automated routine server health monitoring, failover detection, and auto-healing scripts for mission-critical systems.',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    techStack: 'Shell Scripting, Linux Admin, CI/CD'
  }
];

export const ProjectSlider: React.FC<ProjectSliderProps> = ({ lang }) => {
  const t = ui[lang];
  const [projects, setProjects] = useState<ProjectData[]>(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await api.api.projects.get();
        if (data && !error && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.warn("Menggunakan fallback data proyek:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="proyek" className="py-24 bg-earth-100/60">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-tuku-brown/10 text-tuku-brown rounded-lg">
            <Cpu size={22} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-tuku-brown">Portfolio Showcase</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-tuku-dark mb-3 tracking-tight">
          {t['projects.title']}
        </h2>
        <p className="text-earth-800 text-lg max-w-2xl leading-relaxed">
          {t['projects.desc']}
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20 text-earth-800 font-bold">
            {lang === 'id' ? 'Sedang menyeduh data proyek...' : 'Loading projects...'}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14 !px-1"
          >
            {projects.map((project) => {
              const displayTitle = lang === 'en' && project.titleEn ? project.titleEn : project.title;
              const displayDesc = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
              
              return (
                <SwiperSlide key={project.id} className="h-auto">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-earth-200/80 h-full flex flex-col group">
                    <div className="h-48 rounded-xl mb-5 overflow-hidden bg-earth-200 relative">
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={displayTitle} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-tuku-cream">
                          <Code size={36} className="text-tuku-brown/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-tuku-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h3 className="text-xl font-bold text-tuku-dark mb-2 group-hover:text-tuku-brown transition-colors">
                      {displayTitle}
                    </h3>
                    
                    <p className="text-earth-700 text-sm leading-relaxed mb-6 flex-grow">
                      {displayDesc}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-earth-100 flex flex-wrap gap-1.5">
                      {project.techStack?.split(',').map((tech, i) => (
                        <span 
                          key={i} 
                          className="inline-block text-xs font-semibold text-tuku-brown bg-tuku-brown/10 px-2.5 py-1 rounded-md"
                        >
                          {tech.trim()}
                        </span>
                      ))}
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
