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

  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 flex flex-col items-start select-none relative">
      
      {/* Clickable Greeting Badge: Clean without any icon box */}
      <div className="mb-6">
        <button
          onClick={togglePersonalMode}
          className="group inline-flex items-center gap-2 py-2 px-4 rounded-2xl paper-btn text-earth-900 text-xs md:text-sm font-extrabold hover:text-brand-brown transition-all cursor-pointer focus:outline-none"
          title={lang === 'id' ? 'Klik untuk beralih antara Mode Karir dan Mode Personal' : 'Click to toggle between Professional and Personal Mode'}
        >
          <span>
            {t['hero.greeting']}
          </span>

          <span className="mx-0.5 text-earth-400">•</span>

          <span className="text-[11px] font-black uppercase tracking-wider text-brand-brown bg-[#ECE7DF] px-2.5 py-0.5 rounded-full shadow-inner">
            {navMode === 'personal' ? 'Personal' : 'Professional'}
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
