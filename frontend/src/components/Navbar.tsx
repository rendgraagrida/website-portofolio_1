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
    <header className="sticky top-0 z-50 bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#E6E0D5]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Paper-Embossed Clickable Logo/Brand to Toggle Portfolio Generator */}
        <button
          onClick={togglePortfolioGen}
          className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-2xl font-extrabold text-lg transition-all duration-300 select-none focus:outline-none ${
            isPortfolioGenOpen 
              ? 'paper-well text-brand-brown scale-[0.98]' 
              : 'paper-btn text-earth-900 hover:text-brand-brown'
          }`}
          title={lang === 'id' ? 'Klik untuk Buka / Tutup Portofolio Generator' : 'Click to Toggle Portfolio Generator'}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 ${
            isPortfolioGenOpen 
              ? 'bg-brand-brown text-white shadow-inner' 
              : 'bg-[#ECE7DF] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] text-brand-brown group-hover:scale-105'
          }`}>
            <Terminal size={17} />
          </div>
          <span>
            Rendgra.<span className="text-brand-brown">Dev</span>
          </span>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full transition-all duration-300 hidden sm:inline-flex items-center gap-1 ${
            isPortfolioGenOpen
              ? 'bg-brand-brown text-white'
              : 'bg-[#ECE7DF] text-earth-700 shadow-inner'
          }`}>
            <Sparkles size={10} />
            <span>{isPortfolioGenOpen ? (lang === 'id' ? 'Tutup' : 'Close') : 'Gen'}</span>
          </span>
        </button>

        {/* Right Actions: Hubungi Saya (Paper Button) + Language Switcher */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Hubungi Saya Toggle Button */}
          <button
            onClick={toggleContact}
            className={`px-4 md:px-5 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 focus:outline-none select-none ${
              isContactOpen
                ? 'paper-well text-brand-brown font-extrabold scale-[0.98]'
                : 'paper-btn text-earth-900 hover:text-brand-brown'
            }`}
            title={lang === 'id' ? 'Klik untuk Buka / Tutup Form Kontak' : 'Click to Toggle Contact Form'}
          >
            {isContactOpen ? <X size={15} /> : <Send size={15} className="text-brand-brown" />}
            <span>{isContactOpen ? (lang === 'id' ? 'Tutup Kontak' : 'Close Contact') : t['nav.contact']}</span>
          </button>

          {/* Paper Language Toggle */}
          <a
            href={toggleUrl}
            className="flex items-center px-3 py-1.5 paper-btn rounded-xl text-xs font-extrabold select-none text-earth-700 hover:text-brand-brown"
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
