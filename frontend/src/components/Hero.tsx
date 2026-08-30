import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 md:py-32 flex flex-col items-start">
      <span className="inline-block py-1 px-3 rounded-full bg-tuku-cream text-tuku-brown text-sm font-semibold mb-6">
        Halo, saya Rendgra Agrida 👋
      </span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-tuku-dark leading-tight mb-6">
        Experienced Software <br className="hidden md:block" />
        <span className="text-tuku-brown">Engineer & Tech Lead.</span>
      </h1>
      <p className="text-lg md:text-xl text-earth-800 max-w-2xl leading-relaxed mb-10">
        Berpengalaman dalam mengotomatisasi proses data, mengelola Oracle DB skala enterprise, DevOps, serta merancang arsitektur IT yang andal untuk merampingkan alur kerja bisnis.
      </p>
      <a href="#proyek" className="bg-tuku-brown hover:bg-tuku-dark text-earth-100 font-semibold py-4 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
        Lihat Karya Saya
      </a>
    </section>
  );
};
