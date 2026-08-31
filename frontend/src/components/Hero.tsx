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
      
      {/* Clickable Greeting Badge with Realistic Paper Embossed / Inset Effect when active */}
      <div className="mb-6">
        <button
          onClick={togglePersonalMode}
          className={`group inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl text-xs md:text-sm font-extrabold transition-all duration-300 cursor-pointer focus:outline-none select-none ${
            isPersonal
              ? 'bg-[#E8E2D7] text-brand-brown border border-[#D5CEC0] shadow-[inset_3px_3px_8px_rgba(150,140,125,0.4),inset_-3px_-3px_8px_rgba(255,255,255,0.95)] transform scale-[0.98]'
              : 'paper-btn text-earth-900 hover:text-brand-brown hover:scale-[1.02]'
          }`}
          title={lang === 'id' ? 'Klik untuk beralih antara Mode Karir dan Mode Personal' : 'Click to toggle between Professional and Personal Mode'}
        >
          <span className={isPersonal ? 'font-black tracking-tight text-brand-brown' : 'font-extrabold'}>
            {t['hero.greeting']}
          </span>

          <span className={isPersonal ? 'text-brand-brown/40' : 'text-earth-400'}>•</span>

          <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-all ${
            isPersonal
              ? 'bg-brand-brown text-white shadow-sm'
              : 'bg-[#ECE7DF] text-brand-brown shadow-inner'
          }`}>
            {isPersonal ? 'Personal' : 'Professional'}
          </span>
        </button>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-earth-900 leading-tight mb-6 tracking-tight">
        {t['hero.title']} <br className="hidden md:block" />
        <span className="text-brand-brown">{t['hero.titleHighlight']}</span>
      </h1>

      <p className="text-lg md:text-xl text-earth-800 max-w-2xl leading-relaxed">
        {t['hero.desc']}
      </p>

    </section>
  );
};
