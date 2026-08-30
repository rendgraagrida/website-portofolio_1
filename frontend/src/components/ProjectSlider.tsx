import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const mockProjects = [
  { id: 1, title: 'Kopi Kenangan App', desc: 'Aplikasi pemesanan kopi yang memudahkan harimu.', tech: 'React Native' },
  { id: 2, title: 'Toserba Online', desc: 'E-commerce lokal yang membumi dan merakyat.', tech: 'Astro + Elysia' },
  { id: 3, title: 'POS Kasir', desc: 'Sistem point of sales untuk warung tetangga.', tech: 'Vue + Go' },
  { id: 4, title: 'Buku Tamu Digital', desc: 'Pencatatan tamu lebih praktis.', tech: 'Next.js' },
];

export const ProjectSlider: React.FC = () => {
  return (
    <section id="proyek" className="py-20 bg-earth-200">
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold text-tuku-dark mb-2">Showcase Proyek</h2>
        <p className="text-earth-800">Seduhan karya terbaik yang pernah saya buat.</p>
      </div>
      
      <div className="max-w-5xl mx-auto px-6">
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
          {mockProjects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="bg-tuku-cream rounded-xl p-8 shadow-sm border border-earth-100 h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="h-40 bg-earth-500/20 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-earth-500 font-medium">Gambar Proyek</span>
                </div>
                <h3 className="text-xl font-bold text-tuku-dark mb-2">{project.title}</h3>
                <p className="text-earth-800 mb-4 flex-grow">{project.desc}</p>
                <div className="mt-auto pt-4 border-t border-earth-200">
                  <span className="inline-block text-xs font-bold text-tuku-brown bg-tuku-brown/10 px-3 py-1 rounded-full">
                    {project.tech}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
