import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { api } from '../lib/eden';
import { ui } from '../i18n/ui';

type Project = {
  id: number;
  title: string;
  titleEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  imageUrl: string | null;
  techStack: string | null;
};

interface ProjectSliderProps {
  lang: 'id' | 'en';
}

export const ProjectSlider: React.FC<ProjectSliderProps> = ({ lang }) => {
  const t = ui[lang];
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await api.api.projects.get();
        if (data && !error) {
          // Eden infers types but we mapped it manually above just in case
          setProjects(data as unknown as Project[]);
        } else {
          console.error("Gagal menarik data:", error);
        }
      } catch (err) {
        console.error("Error jaringan:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="proyek" className="py-20 bg-earth-200">
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold text-tuku-dark mb-2">{t['projects.title']}</h2>
        <p className="text-earth-800">{t['projects.desc']}</p>
      </div>
      
      <div className="max-w-5xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20 text-earth-800 font-bold">
            {lang === 'id' ? 'Sedang mengambil data proyek...' : 'Loading projects...'}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-earth-800 font-bold">
            {lang === 'id' ? 'Belum ada proyek tersedia.' : 'No projects available yet.'}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {projects.map((project) => {
              const displayTitle = lang === 'en' && project.titleEn ? project.titleEn : project.title;
              const displayDesc = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
              
              return (
                <SwiperSlide key={project.id}>
                  <div className="bg-tuku-cream rounded-xl p-8 shadow-sm border border-earth-100 h-full flex flex-col hover:shadow-md transition-shadow">
                    <div className="h-40 bg-earth-500/20 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={displayTitle} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-earth-500 font-medium">
                          {lang === 'id' ? 'Gambar Proyek' : 'Project Image'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-tuku-dark mb-2">{displayTitle}</h3>
                    <p className="text-earth-800 mb-4 flex-grow">{displayDesc}</p>
                    <div className="mt-auto pt-4 border-t border-earth-200">
                      <span className="inline-block text-xs font-bold text-tuku-brown bg-tuku-brown/10 px-3 py-1 rounded-full">
                        {project.techStack}
                      </span>
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
