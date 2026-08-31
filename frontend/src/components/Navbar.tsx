import React from 'react';
import { useStore } from '@nanostores/react';
import { $showPortfolioGen, $showContact, togglePortfolioGen, toggleContact } from '../stores/navigation';
import { Terminal, Sparkles, Send, X } from 'lucide-react';
import { ui } from '../i18n/ui';

interface NavbarProps {
  lang: 'id' | 'en';
}

export const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const t = ui[lang];
  const isPortfolioGenOpen = useStore($showPortfolioGen);
  const isContactOpen = useStore($showContact);
  const toggleUrl = lang === 'id' ? '/en/' : '/';

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-earth-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Clickable Logo/Brand to Toggle Portfolio Generator */}
        <button
          onClick={togglePortfolioGen}
          className={`group flex items-center gap-2.5 px-3 py-1.5 rounded-xl font-extrabold text-xl transition-all duration-300 select-none focus:outline-none ${
            isPortfolioGenOpen 
              ? 'bg-brand-brown/15 text-brand-brown shadow-sm ring-1 ring-brand-brown/30' 
              : 'text-brand-dark hover:text-brand-brown hover:bg-white/60'
          }`}
          title={lang === 'id' ? 'Klik untuk Buka / Tutup Portofolio Generator' : 'Click to Toggle Portfolio Generator'}
        >
          <div className={`p-1 rounded-lg transition-transform duration-300 ${isPortfolioGenOpen ? 'rotate-12 scale-110 text-brand-brown' : 'group-hover:scale-110 text-brand-brown'}`}>
            <Terminal size={22} />
          </div>
          <span>
            Rendgra.<span className="text-brand-brown">Dev</span>
          </span>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full transition-all duration-300 hidden sm:inline-flex items-center gap-1 ${
            isPortfolioGenOpen
              ? 'bg-brand-brown text-white'
              : 'bg-brand-brown/10 text-brand-brown group-hover:bg-brand-brown/20'
          }`}>
            <Sparkles size={10} />
            <span>{isPortfolioGenOpen ? (lang === 'id' ? 'Tutup' : 'Close') : 'Gen'}</span>
          </span>
        </button>

        {/* Right Actions: Hubungi Saya (Toggle) + Language Switcher */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Hubungi Saya Toggle Button */}
          <button
            onClick={toggleContact}
            className={`px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 shadow-sm flex items-center gap-1.5 focus:outline-none select-none ${
              isContactOpen
                ? 'bg-brand-dark text-white ring-2 ring-brand-brown shadow-md scale-105'
                : 'bg-brand-brown hover:bg-brand-dark text-white hover:shadow'
            }`}
            title={lang === 'id' ? 'Klik untuk Buka / Tutup Form Kontak' : 'Click to Toggle Contact Form'}
          >
            {isContactOpen ? <X size={15} /> : <Send size={15} />}
            <span>{isContactOpen ? (lang === 'id' ? 'Tutup Kontak' : 'Close Contact') : t['nav.contact']}</span>
          </button>

          {/* Language Toggle */}
          <a
            href={toggleUrl}
            className="flex items-center px-3 py-1.5 bg-white border border-earth-200 rounded-xl hover:border-brand-brown transition-colors text-xs font-extrabold shadow-sm select-none"
          >
            <span className={lang === 'id' ? 'text-brand-brown font-black' : 'text-earth-400'}>ID</span>
            <span className="mx-1 text-earth-300">|</span>
            <span className={lang === 'en' ? 'text-brand-brown font-black' : 'text-earth-400'}>EN</span>
          </a>

        </div>

      </div>
    </header>
  );
};
