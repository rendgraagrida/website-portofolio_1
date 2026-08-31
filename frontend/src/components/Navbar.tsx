import React from 'react';
import { useStore } from '@nanostores/react';
import { $showPortfolioGen, $showContact, togglePortfolioGen, toggleContact, $navMode } from '../stores/navigation';
import { Terminal, Sparkles, Send, X, Globe } from 'lucide-react';
import { ui } from '../i18n/ui';
import { QuoteCarousel } from './QuoteCarousel';

interface NavbarProps {
  lang: 'id' | 'en';
}

export const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const t = ui[lang];
  const isPortfolioGenOpen = useStore($showPortfolioGen);
  const isContactOpen = useStore($showContact);
  const navMode = useStore($navMode);
  const isPersonal = navMode === 'personal';
  const toggleUrl = lang === 'id' ? '/en/' : '/';

  return (
    <>
      {/* Absolute Center Quote Carousel (Stays at the very top, scrolls away, not sticky) */}
      {isPersonal && (
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center z-40 pointer-events-none">
          <div className="pointer-events-auto w-full px-2 sm:px-6 flex justify-center">
            <QuoteCarousel lang={lang} />
          </div>
        </div>
      )}

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isPersonal ? 'bg-transparent' : 'bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#E6E0D5]'
      }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative">
        
        {/* Left: Paper-Embossed Clickable Logo/Brand to Toggle Portfolio Generator */}
        <div className={`flex items-center flex-1 overflow-hidden ${isPersonal ? 'invisible' : ''}`}>
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
        </div>


        {/* Right Actions: Hubungi Saya + Language Switcher */}
        <div className="flex items-center justify-end flex-1 gap-2 md:gap-3">
          
          {/* Hubungi Saya Toggle Button */}
          <div className={isPersonal ? 'invisible' : ''}>
            <button
              onClick={toggleContact}
              className={`px-3.5 md:px-4 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 focus:outline-none select-none ${
                isContactOpen
                  ? 'paper-well text-brand-brown font-extrabold scale-[0.98]'
                  : 'paper-btn text-earth-900 hover:text-brand-brown'
              }`}
              title={lang === 'id' ? 'Klik untuk Buka / Tutup Form Kontak' : 'Click to Toggle Contact Form'}
            >
              {isContactOpen ? <X size={15} /> : <Send size={15} className="text-brand-brown" />}
              <span className="hidden sm:inline">{isContactOpen ? (lang === 'id' ? 'Tutup Kontak' : 'Close Contact') : t['nav.contact']}</span>
            </button>
          </div>

          {/* Language Toggle */}
          {isPersonal ? (
            <a
              href={toggleUrl}
              className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-[#FF007F] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFE600] hover:scale-110 hover:-rotate-12 transition-all duration-300 group overflow-hidden relative mt-1"
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.1)_100%)]"></div>
              <div className="relative flex flex-col items-center justify-center font-comic font-black text-white group-hover:text-black leading-none mt-0.5">
                <span className="text-[9px] tracking-widest">{lang === 'id' ? 'ENG' : 'IND'}</span>
                <Globe size={14} className="mt-0.5" strokeWidth={3} />
              </div>
            </a>
          ) : (
            <a
              href={toggleUrl}
              className="flex items-center px-2.5 md:px-3 py-1.5 paper-btn rounded-xl text-xs font-extrabold select-none text-earth-700 hover:text-brand-brown"
            >
              <span className={lang === 'id' ? 'text-brand-brown font-black' : 'text-earth-400'}>ID</span>
              <span className="mx-1 text-earth-300">|</span>
              <span className={lang === 'en' ? 'text-brand-brown font-black' : 'text-earth-400'}>EN</span>
            </a>
          )}

        </div>

      </div>
    </header>
    </>
  );
};
