import React from 'react';
import { useStore } from '@nanostores/react';
import { ui } from '../i18n/ui';
import { $navMode, togglePersonalMode } from '../stores/navigation';

interface HeroProps {
  lang: 'id' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = ui[lang];
  const navMode = useStore($navMode);
  const isPersonal = navMode === 'personal';

  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 flex flex-col items-start select-none relative">
      
      {/* Clickable Greeting Badge (Neo-Brutalist Pop Art in Personal Mode) */}
      <div className="mb-6">
        <button
          onClick={togglePersonalMode}
          className={`group inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl text-xs md:text-sm font-extrabold transition-all duration-300 cursor-pointer focus:outline-none select-none ${
            isPersonal
              ? 'bg-[#00F0FF] text-black border-3 border-black shadow-[5px_5px_0px_0px_#000] rounded-none transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_#000]'
              : 'paper-btn text-earth-900 hover:text-brand-brown hover:scale-[1.02]'
          }`}
          title={lang === 'id' ? 'Klik untuk beralih antara Mode Karir dan Mode Personal' : 'Click to toggle between Professional and Personal Mode'}
        >
          <span className={isPersonal ? 'font-black tracking-tight text-black text-sm uppercase' : 'font-extrabold'}>
            {t['hero.greeting']}
          </span>

          <span className={isPersonal ? 'text-black font-black' : 'text-earth-400'}>•</span>

          <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 transition-all ${
            isPersonal
              ? 'bg-[#FF007F] text-white border border-black shadow-[2px_2px_0px_0px_#000] rounded-none'
              : 'bg-[#ECE7DF] text-brand-brown rounded-full shadow-inner'
          }`}>
            {isPersonal ? 'Personal (Pop Art)' : 'Professional'}
          </span>
        </button>
      </div>

      {/* Main Title Heading: Bangers/Bebas Comic font in Personal Mode */}
      <h1 className={`text-4xl md:text-6xl font-extrabold text-earth-900 leading-tight mb-6 tracking-tight ${
        isPersonal ? 'font-comic text-5xl md:text-7xl text-black tracking-wider drop-shadow-[3px_3px_0_#FFF]' : ''
      }`}>
        {t['hero.title']} <br className="hidden md:block" />
        <span className={isPersonal ? 'text-[#FF007F] bg-white px-2 border-3 border-black shadow-[5px_5px_0px_0px_#000] inline-block mt-2' : 'text-brand-brown'}>
          {t['hero.titleHighlight']}
        </span>
      </h1>

      {/* Bio Paragraph: Ultra readable text with Neo-Brutalist card container in Personal Mode */}
      <div className={`max-w-2xl text-lg md:text-xl text-earth-800 leading-relaxed ${
        isPersonal ? 'bg-white text-black font-semibold p-5 border-3 border-black shadow-[6px_6px_0px_0px_#000]' : ''
      }`}>
        {t['hero.desc']}
      </div>

    </section>
  );
};
