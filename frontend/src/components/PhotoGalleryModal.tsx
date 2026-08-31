import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $showGallery, toggleGallery } from '../stores/navigation';
import { X, Camera, Heart, Maximize2, MapPin, Sparkles } from 'lucide-react';

interface PhotoGalleryModalProps {
  lang: 'id' | 'en';
}

interface GallerySticker {
  id: string;
  title: { id: string; en: string };
  location: { id: string; en: string };
  src: string;
  rotation: string;
  tag: { id: string; en: string };
}

const galleryStickers: GallerySticker[] = [
  {
    id: 'studio',
    title: { id: 'Kebersamaan Keluarga', en: 'Family Studio Joy' },
    location: { id: 'Studio Potret, Bandung', en: 'Portrait Studio, Bandung' },
    src: '/gallery/photo-studio.jpg',
    rotation: '-rotate-2',
    tag: { id: 'Family & Harmony', en: 'Family & Harmony' }
  },
  {
    id: 'bromo',
    title: { id: 'Petualangan Gunung Bromo', en: 'Mount Bromo Expedition' },
    location: { id: 'Bromo Tengger Semeru, Jawa Timur', en: 'Bromo Tengger Semeru, East Java' },
    src: '/gallery/photo-bromo.jpg',
    rotation: 'rotate-2',
    tag: { id: 'Sunrise & Nature', en: 'Sunrise & Nature' }
  },
  {
    id: 'supermarket',
    title: { id: 'Supermarket Creative Experience', en: 'Creative Studio Session' },
    location: { id: 'Picart Studio Room', en: 'Picart Studio Room' },
    src: '/gallery/photo-supermarket.jpg',
    rotation: '-rotate-3',
    tag: { id: 'Playful Moments', en: 'Playful Moments' }
  },
  {
    id: 'profile',
    title: { id: 'Rendgra Agrida', en: 'Rendgra Agrida' },
    location: { id: 'Bandung, Jawa Barat', en: 'Bandung, West Java' },
    src: '/gallery/photo-profile.png',
    rotation: 'rotate-1',
    tag: { id: 'Tech Lead & Engineer', en: 'Tech Lead & Engineer' }
  }
];

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ lang }) => {
  const showGallery = useStore($showGallery);
  const [activeImage, setActiveImage] = useState<GallerySticker | null>(null);

  if (!showGallery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="paper-card rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl animate-fade-in max-h-[92vh] flex flex-col">
        
        {/* Header with Title and Close Button */}
        <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-sm md:text-base">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
              <Camera size={16} />
            </div>
            <span>{lang === 'id' ? 'Galeri Foto & Stiker Kebersamaan' : 'Photo Gallery & Memory Stickers'}</span>
          </div>

          <button
            onClick={toggleGallery}
            className="paper-btn w-8 h-8 rounded-xl flex items-center justify-center text-earth-700 hover:text-brand-brown focus:outline-none"
            title="Tutup (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Gallery Area (Sticker Board Layout) */}
        <div className="p-6 md:p-8 overflow-y-auto bg-[#F4F1EA]">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full paper-btn text-brand-brown text-xs font-black mb-2">
              <Sparkles size={12} />
              <span>{lang === 'id' ? 'Koleksi Stiker & Momen Nyata' : 'Sticker Collection & Moments'}</span>
            </span>
            <p className="text-earth-800 text-xs md:text-sm leading-relaxed">
              {lang === 'id'
                ? 'Kumpulan momen kebersamaan dan perjalanan hidup yang menjadi sumber energi dalam berkarya di dunia rekayasa perangkat lunak.'
                : 'A curated collection of cherished moments and journeys that fuel my passion for engineering and building reliable systems.'}
            </p>
          </div>

          {/* Die-Cut Sticker Grid with Thick White Outer Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 p-2">
            {galleryStickers.map((sticker) => (
              <div
                key={sticker.id}
                onClick={() => setActiveImage(sticker)}
                className={`group cursor-pointer transform ${sticker.rotation} hover:rotate-0 hover:scale-[1.03] transition-all duration-300 ease-out`}
              >
                {/* Sticker Frame: Thick White Border + Deep Soft Shadow */}
                <div className="bg-white p-2.5 md:p-3 rounded-3xl border-[5px] md:border-[7px] border-white shadow-[0_12px_28px_rgba(0,0,0,0.14),0_4px_10px_rgba(0,0,0,0.08)] relative overflow-hidden group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)]">
                  
                  {/* Photo Container */}
                  <div className="h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#ECE7DF] relative">
                    <img
                      src={sticker.src}
                      alt={sticker.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Subtle Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-lg">
                        <Maximize2 size={13} />
                        <span>{lang === 'id' ? 'Perbesar Foto' : 'Enlarge Photo'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Sticker Caption Bottom Label */}
                  <div className="pt-3 pb-1 px-2 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-earth-900 leading-tight group-hover:text-brand-brown transition-colors">
                        {sticker.title[lang]}
                      </h4>
                      <p className="text-[11px] text-earth-600 flex items-center gap-1 mt-0.5 font-medium">
                        <MapPin size={11} className="text-brand-brown" />
                        <span>{sticker.location[lang]}</span>
                      </p>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider text-brand-brown bg-[#F5F2EB] px-2.5 py-1 rounded-full shadow-inner">
                      {sticker.tag[lang]}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#ECE7DF] flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-600">
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span>Rendgra Agrida • Family &amp; Life Journey</span>
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
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Lightbox */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white text-white hover:text-black w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              <X size={18} />
            </button>

            {/* High-Resolution Sticker Frame */}
            <div className="bg-white p-3 md:p-4 rounded-3xl border-[6px] md:border-[10px] border-white shadow-2xl max-h-[80vh] flex flex-col overflow-hidden">
              <img 
                src={activeImage.src} 
                alt={activeImage.title[lang]} 
                className="max-h-[68vh] w-auto object-contain rounded-2xl"
              />
              <div className="pt-3 px-2 flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-base text-earth-900">{activeImage.title[lang]}</h4>
                  <p className="text-xs text-earth-600 flex items-center gap-1 mt-0.5 font-medium">
                    <MapPin size={12} className="text-brand-brown" />
                    <span>{activeImage.location[lang]}</span>
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-brown bg-[#F5F2EB] px-3 py-1 rounded-full shadow-inner">
                  {activeImage.tag[lang]}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
