import React from 'react';
import { useStore } from '@nanostores/react';
import { $profileData } from '../stores/profile';
import { $isOwner, openProfileEditModal } from '../stores/auth';
import { 
  Mountain, 
  Camera, 
  Coffee, 
  Heart, 
  Sparkles,
  MapPin,
  Edit3
} from 'lucide-react';

interface HobbiesViewProps {
  lang: 'id' | 'en';
}

export const HobbiesView: React.FC<HobbiesViewProps> = ({ lang }) => {
  const profile = useStore($profileData);
  const isOwner = useStore($isOwner);

  const icons = [Mountain, Camera, Coffee, Heart];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Intro Header */}
      <div className="flex items-center justify-between">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full paper-btn text-brand-brown text-xs font-black mb-2">
            <Sparkles size={13} />
            <span>{lang === 'id' ? 'Di Luar Baris Kode' : 'Beyond The Code'}</span>
          </span>
          <p className="text-earth-800 text-xs md:text-sm leading-relaxed">
            {lang === 'id'
              ? 'Aktivitas, hobi, dan minat yang menjaga keseimbangan hidup, melatih kepekaan estetika, dan mengisi kembali energi dalam berkarya.'
              : 'Passions, hobbies, and pursuits that nurture life balance, refine aesthetic intuition, and energize engineering endeavors.'}
          </p>
        </div>

        {isOwner && (
          <button
            onClick={openProfileEditModal}
            className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-brand-brown flex items-center gap-1.5 flex-shrink-0 ml-2"
            title="Edit Hobbies Data"
          >
            <Edit3 size={13} />
            <span className="hidden sm:inline">{lang === 'id' ? 'Edit Hobi' : 'Edit Hobbies'}</span>
          </button>
        )}
      </div>

      {/* Hobbies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.hobbies.map((h, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={h.id || idx}
              className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl paper-well flex items-center justify-center text-brand-brown">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-brown bg-white px-2.5 py-1 rounded-full shadow-sm border border-[#ECE7DF]">
                    {h.tag}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-earth-900 leading-snug mb-1">
                  {h.title}
                </h3>

                <p className="text-[11px] text-earth-600 flex items-center gap-1 mb-3 font-medium">
                  <MapPin size={12} className="text-brand-brown" />
                  <span>{h.location}</span>
                </p>

                <p className="text-xs md:text-sm text-earth-800 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
