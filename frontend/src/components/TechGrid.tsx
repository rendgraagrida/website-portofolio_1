import React from 'react';

const mockTechs = [
  { name: 'Astro', icon: '🚀' },
  { name: 'React', icon: '⚛️' },
  { name: 'Bun', icon: '🥟' },
  { name: 'Elysia', icon: '🦊' },
  { name: 'Drizzle', icon: '💧' },
  { name: 'Turso', icon: '🛢️' },
];

export const TechGrid: React.FC = () => {
  return (
    <section id="stack" className="max-w-5xl mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-tuku-dark mb-4">Tech Stack & Peralatan</h2>
        <p className="text-earth-800 max-w-xl mx-auto">
          Bahan-bahan berkualitas yang saya gunakan untuk meracik aplikasi.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {mockTechs.map((tech, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-8 bg-tuku-cream rounded-xl shadow-sm border border-earth-200 hover:shadow-md transition-shadow">
            <span className="text-4xl mb-4">{tech.icon}</span>
            <span className="font-bold text-earth-800">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
