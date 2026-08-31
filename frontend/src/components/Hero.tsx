import React from 'react';
import { ui } from '../i18n/ui';
import { toggleGallery } from '../stores/navigation';
import { PhotoGalleryModal } from './PhotoGalleryModal';
import { Camera, Sparkles } from 'lucide-react';

interface HeroProps {
  lang: 'id' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = ui[lang];

  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 flex flex-col items-start select-none relative">
      
      {/* Clickable Greeting Badge to Trigger Photo Gallery Modal */}
      <div className="mb-6">
        <button
          onClick={toggleGallery}
          className="group inline-flex items-center gap-2.5 py-2 px-4 rounded-2xl paper-btn text-earth-900 text-xs md:text-sm font-bold hover:text-brand-brown transition-all cursor-pointer focus:outline-none"
          title={lang === 'id' ? 'Klik untuk melihat galeri profil foto & rekam jejak' : 'Click to view photo gallery & profile highlight'}
        >
          <div className="w-6 h-6 rounded-lg paper-well flex items-center justify-center text-brand-brown group-hover:scale-110 transition-transform">
            <Camera size={13} />
          </div>
          <span>{t['hero.greeting']}</span>
          <span className="text-[10px] bg-[#ECE7DF] text-brand-brown px-2 py-0.5 rounded-full font-extrabold shadow-inner ml-1 flex items-center gap-1">
            <Sparkles size={10} />
            <span>{lang === 'id' ? 'Lihat Foto' : 'Gallery'}</span>
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

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal lang={lang} />

    </section>
  );
};
