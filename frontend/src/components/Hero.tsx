import React from 'react';
import { useStore } from '@nanostores/react';
import { ui } from '../i18n/ui';
import { $navMode, togglePersonalMode } from '../stores/navigation';
import { Sparkles, User, Briefcase } from 'lucide-react';

interface HeroProps {
  lang: 'id' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = ui[lang];
  const navMode = useStore($navMode);

  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 flex flex-col items-start select-none relative">
      
      {/* Clickable Greeting Badge to Toggle Personal Mode (Personality, Hobbies, Gallery) */}
      <div className="mb-6">
        <button
          onClick={togglePersonalMode}
          className={`group inline-flex items-center gap-2.5 py-2 px-4 rounded-2xl transition-all cursor-pointer focus:outline-none ${
            navMode === 'personal'
              ? 'paper-card bg-brand-brown text-white border border-brand-brown shadow-lg'
              : 'paper-btn text-earth-900 hover:text-brand-brown'
          }`}
          title={lang === 'id' ? 'Klik untuk membuka profil personal, hobi, dan galeri stiker' : 'Click to toggle personal profile, hobbies, and sticker gallery'}
        >
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform ${
            navMode === 'personal' ? 'bg-white/20 text-white' : 'paper-well text-brand-brown group-hover:scale-110'
          }`}>
            {navMode === 'personal' ? <User size={13} /> : <Sparkles size={13} />}
          </div>

          <span className="text-xs md:text-sm font-bold">{t['hero.greeting']}</span>

          <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold shadow-inner ml-1 flex items-center gap-1 ${
            navMode === 'personal' ? 'bg-white/25 text-white' : 'bg-[#ECE7DF] text-brand-brown'
          }`}>
            {navMode === 'personal' ? (
              <span>{lang === 'id' ? 'Mode Personal' : 'Personal Mode'}</span>
            ) : (
              <span>{lang === 'id' ? 'Klik Profil' : 'Explore'}</span>
            )}
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
