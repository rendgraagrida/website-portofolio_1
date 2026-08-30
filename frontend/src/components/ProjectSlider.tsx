import React from 'react';

const mockProjects = [
  { id: 1, title: 'Kopi Kenangan App', desc: 'Aplikasi pemesanan kopi yang memudahkan harimu.', tech: 'React Native' },
  { id: 2, title: 'Toserba Online', desc: 'E-commerce lokal yang membumi dan merakyat.', tech: 'Astro + Elysia' },
  { id: 3, title: 'POS Kasir', desc: 'Sistem point of sales untuk warung tetangga.', tech: 'Vue + Go' },
];

export const ProjectSlider: React.FC = () => {
  return (
    <section id="proyek" className="py-20 bg-earth-200">
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold text-tuku-dark mb-2">Showcase Proyek</h2>
        <p className="text-earth-800">Seduhan karya terbaik yang pernah saya buat.</p>
      </div>
      
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 px-6 max-w-5xl mx-auto gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="snap-center shrink-0 w-80 md:w-96 bg-tuku-cream rounded-xl p-8 shadow-md border border-earth-100">
            <div className="h-40 bg-earth-500/20 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-earth-500 font-medium">Gambar Proyek</span>
            </div>
            <h3 className="text-xl font-bold text-tuku-dark mb-2">{project.title}</h3>
            <p className="text-earth-800 mb-4">{project.desc}</p>
            <span className="inline-block text-xs font-bold text-tuku-brown bg-tuku-brown/10 px-3 py-1 rounded-full">
              {project.tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
