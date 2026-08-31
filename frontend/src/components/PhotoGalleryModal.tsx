import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $showGallery, toggleGallery } from '../stores/navigation';
import { X, Camera, Heart, Sparkles, Maximize2, Layers } from 'lucide-react';

interface PhotoGalleryModalProps {
  lang: 'id' | 'en';
}

interface ContourSticker {
  id: string;
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
  src: string;
  tag: string;
}

const individualStickers: ContourSticker[] = [
  {
    id: 'collage',
    title: { id: 'Kolase Stiker Bersatu (All-in-One)', en: 'Unified Sticker Collage' },
    subtitle: { id: 'Seluruh momen digabung berdampingan tanpa background', en: 'All moments merged seamlessly with transparent contours' },
    src: '/gallery/sticker-collage.png',
    tag: 'Master Collage'
  },
  {
    id: 'studio',
    title: { id: 'Keluarga Ceria di Studio', en: 'Family Studio Joy' },
    subtitle: { id: 'Momen penuh tawa dan kehangatan keluarga', en: 'Laughs and family warmth' },
    src: '/gallery/sticker-studio.png',
    tag: 'Family'
  },
  {
    id: 'bromo',
    title: { id: 'Eksplorasi Gunung Bromo', en: 'Mount Bromo Expedition' },
    subtitle: { id: 'Sunrise dan petualangan alam terbuka', en: 'Sunrise and nature expedition' },
    src: '/gallery/sticker-bromo.png',
    tag: 'Adventure'
  },
  {
    id: 'supermarket',
    title: { id: 'Supermarket Creative Session', en: 'Creative Studio Room' },
    subtitle: { id: 'Eksplorasi konsep ruangan pop-art biru', en: 'Pop-art blue studio experience' },
    src: '/gallery/sticker-supermarket.png',
    tag: 'Creative'
  },
  {
    id: 'profile',
    title: { id: 'Rendgra Agrida', en: 'Rendgra Agrida' },
    subtitle: { id: 'Senior Software Engineer & Tech Lead', en: 'Senior Software Engineer & Tech Lead' },
    src: '/gallery/sticker-profile.png',
    tag: 'Tech Lead'
  }
];

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ lang }) => {
  const showGallery = useStore($showGallery);
  const [activeImage, setActiveImage] = useState<ContourSticker | null>(null);

  if (!showGallery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/55 backdrop-blur-md animate-fade-in">
      <div className="paper-card rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl animate-fade-in max-h-[92vh] flex flex-col">
        
        {/* Header with Title and Close Button */}
        <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-sm md:text-base">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
              <Camera size={16} />
            </div>
            <span>{lang === 'id' ? 'Galeri Stiker Kontur Personil (Tanpa Background)' : 'Personnel Contour Sticker Gallery (Transparent)'}</span>
          </div>

          <button
            onClick={toggleGallery}
            className="paper-btn w-8 h-8 rounded-xl flex items-center justify-center text-earth-700 hover:text-brand-brown focus:outline-none"
            title="Tutup (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Gallery Area */}
        <div className="p-6 md:p-8 overflow-y-auto bg-[#F4F1EA] space-y-8">
          
          {/* SECTION 1: MASTER UNIFIED STICKER BANNER (Ala Tuku Banner) */}
          <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full paper-btn text-brand-brown text-xs font-black">
                <Layers size={13} />
                <span>{lang === 'id' ? 'Kolase Stiker Bersatu' : 'Unified Sticker Banner'}</span>
              </div>
              <span className="text-[11px] font-bold text-earth-600 bg-[#ECE7DF] px-2.5 py-1 rounded-full shadow-inner">
                {lang === 'id' ? 'Garis Luar Putih Tebal' : 'Die-Cut White Outer Outline'}
              </span>
            </div>

            {/* Wide Master Collage Image */}
            <div 
              onClick={() => setActiveImage(individualStickers[0])}
              className="w-full h-48 sm:h-64 md:h-72 flex items-end justify-center cursor-pointer group bg-gradient-to-b from-[#EFEBE4]/60 to-[#ECE7DF] rounded-2xl p-4 transition-all duration-300 hover:shadow-inner"
            >
              <img
                src="/gallery/sticker-collage.png"
                alt="Rendgra Agrida & Family Sticker Collage"
                className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-400"
              />
            </div>

            {/* Sticker Pill Label Underneath Banner */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#ECE7DF]">
              <span className="text-xs font-bold text-earth-800">
                {lang === 'id' 
                  ? 'Potongan kontur orang dipotong presisi dan disatukan berdampingan tanpa latar belakang.'
                  : 'Individual human contours precisely cut and unified side-by-side with zero background.'}
              </span>
              <button
                onClick={() => setActiveImage(individualStickers[0])}
                className="paper-btn px-3 py-1 rounded-xl text-xs font-extrabold text-brand-brown flex items-center gap-1.5"
              >
                <Maximize2 size={12} />
                <span>{lang === 'id' ? 'Lihat Resolusi Penuh' : 'View Full Res'}</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: INDIVIDUAL DIE-CUT CONTOUR STICKERS */}
          <div>
            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full paper-btn text-brand-brown text-xs font-black mb-1.5">
                <Sparkles size={12} />
                <span>{lang === 'id' ? 'Potongan Stiker Personil' : 'Individual Cutout Stickers'}</span>
              </span>
              <p className="text-earth-700 text-xs leading-relaxed">
                {lang === 'id' ? 'Klik stiker di bawah untuk memperbesar dan melihat detail kontur stiker.' : 'Click any sticker below to enlarge.'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {individualStickers.slice(1).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImage(item)}
                  className="paper-card p-4 rounded-3xl flex flex-col items-center text-center cursor-pointer group hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 select-none"
                >
                  {/* Contour Sticker Container (Transparent bg with drop shadow) */}
                  <div className="w-full h-40 sm:h-48 flex items-center justify-center p-2 rounded-2xl bg-[#ECE7DF]/50 shadow-inner mb-3 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title[lang]}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="font-extrabold text-xs md:text-sm text-earth-900 leading-tight mb-1 group-hover:text-brand-brown transition-colors">
                    {item.title[lang]}
                  </h4>

                  <span className="mt-auto text-[10px] font-black uppercase tracking-wider text-brand-brown bg-white px-2.5 py-0.5 rounded-full shadow-sm border border-[#ECE7DF]">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#ECE7DF] flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-600">
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span>Rendgra Agrida • Die-Cut Contour Sticker Collection</span>
          </div>

          <button
            onClick={toggleGallery}
            className="paper-btn px-4 py-1.5 rounded-xl text-xs font-extrabold text-earth-900 hover:text-brand-brown"
          >
            {lang === 'id' ? 'Tutup Galeri' : 'Close'}
          </button>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX PREVIEW */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Lightbox */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white text-white hover:text-black w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              <X size={18} />
            </button>

            {/* High-Resolution Die-Cut Sticker Card */}
            <div className="paper-card p-6 md:p-8 rounded-3xl max-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#F4F1EA]">
              <img 
                src={activeImage.src} 
                alt={activeImage.title[lang]} 
                className="max-h-[60vh] max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
              />
              <div className="pt-4 text-center">
                <h4 className="font-extrabold text-lg text-earth-900">{activeImage.title[lang]}</h4>
                <p className="text-xs text-earth-600 mt-0.5">{activeImage.subtitle[lang]}</p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
