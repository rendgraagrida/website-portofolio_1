import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-earth-100/90 backdrop-blur-md border-b border-earth-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-extrabold text-tuku-dark tracking-tight">
          Portofolio<span className="text-tuku-brown">.</span>
        </a>
        <nav className="hidden md:flex space-x-6 text-earth-800 font-medium">
          <a href="#proyek" className="hover:text-tuku-brown transition-colors">Proyek</a>
          <a href="#stack" className="hover:text-tuku-brown transition-colors">Tech Stack</a>
          <a href="#kontak" className="hover:text-tuku-brown transition-colors">Kontak</a>
        </nav>
        <button className="md:hidden text-tuku-dark p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};
