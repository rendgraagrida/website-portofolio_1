import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { api } from '../lib/eden';

type Project = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  techStack: string | null;
};

export const ProjectSlider: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await api.api.projects.get();
        if (data && !error) {
          setProjects(data);
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
        <h2 className="text-3xl font-bold text-tuku-dark mb-2">Showcase Proyek</h2>
        <p className="text-earth-800">Seduhan karya terbaik yang pernah saya buat.</p>
      </div>
      
      <div className="max-w-5xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20 text-earth-800 font-bold">Sedang mengambil data proyek...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-earth-800 font-bold">Belum ada proyek tersedia.</div>
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
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="bg-tuku-cream rounded-xl p-8 shadow-sm border border-earth-100 h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className="h-40 bg-earth-500/20 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-earth-500 font-medium">Gambar Proyek</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-tuku-dark mb-2">{project.title}</h3>
                  <p className="text-earth-800 mb-4 flex-grow">{project.description}</p>
                  <div className="mt-auto pt-4 border-t border-earth-200">
                    <span className="inline-block text-xs font-bold text-tuku-brown bg-tuku-brown/10 px-3 py-1 rounded-full">
                      {project.techStack}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
