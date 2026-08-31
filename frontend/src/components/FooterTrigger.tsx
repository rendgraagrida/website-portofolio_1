import React from 'react';
import { useStore } from '@nanostores/react';
import { $isGlobalEditMode, toggleGlobalEditMode } from '../stores/editMode';
import { Edit3, Check, Sparkles } from 'lucide-react';

interface FooterTriggerProps {
  lang: 'id' | 'en';
}

export const FooterTrigger: React.FC<FooterTriggerProps> = ({ lang }) => {
  const isEditMode = useStore($isGlobalEditMode);

  return (
    <div className="flex flex-col items-center select-none">
      
      {/* Clickable Hidden Trigger on Copyright Text */}
      <button
        onClick={toggleGlobalEditMode}
        className={`group text-xs transition-all duration-300 cursor-pointer focus:outline-none flex items-center gap-1.5 px-3 py-1 rounded-full ${
          isEditMode 
            ? 'text-brand-brown font-black bg-brand-brown/10 shadow-inner' 
            : 'text-earth-600 hover:text-brand-brown'
        }`}
        title={lang === 'id' ? 'Klik untuk Mengaktifkan / Menonaktifkan Mode Edit' : 'Click to Toggle Edit Mode'}
      >
        <span>&copy; 2026 Rendgra Agrida.</span>
        {isEditMode && (
          <span className="inline-flex items-center gap-1 text-[10px] bg-brand-brown text-white px-2 py-0.5 rounded-full font-bold">
            <Edit3 size={10} />
            <span>{lang === 'id' ? 'Mode Edit' : 'Editing'}</span>
          </span>
        )}
      </button>

      {/* Floating Bottom Save / Edit Bar when Edit Mode is active */}
      {isEditMode && (
        <div className="fixed bottom-5 z-60 left-1/2 -translate-x-1/2 paper-card px-5 py-2.5 rounded-2xl shadow-2xl border border-brand-brown/30 bg-[#FAF8F5] flex items-center gap-3 animate-fade-in">
          <div className="flex items-center gap-1.5 text-xs font-black text-brand-brown">
            <Sparkles size={14} />
            <span>{lang === 'id' ? 'Mode Edit Aktif' : 'Edit Mode Active'}</span>
          </div>

          <span className="text-xs text-earth-700 hidden sm:inline">
            {lang === 'id' ? 'Koreksi Personality, Hobi, Galeri & Experience' : 'Edit Personality, Hobbies, Gallery & Experience'}
          </span>

          <button
            onClick={toggleGlobalEditMode}
            className="bg-brand-brown hover:bg-earth-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
          >
            <Check size={13} />
            <span>{lang === 'id' ? 'Selesai & Simpan' : 'Done & Save'}</span>
          </button>
        </div>
      )}

    </div>
  );
};
