import React from 'react';
import { useStore } from '@nanostores/react';
import { $profileData } from '../stores/profile';
import { $isOwner, openProfileEditModal } from '../stores/auth';
import { 
  Brain, 
  Users, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  HeartHandshake, 
  Quote,
  Edit3
} from 'lucide-react';

interface PersonalityViewProps {
  lang: 'id' | 'en';
}

export const PersonalityView: React.FC<PersonalityViewProps> = ({ lang }) => {
  const profile = useStore($profileData);
  const isOwner = useStore($isOwner);

  const icons = [Brain, Users, ShieldCheck, Compass];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Quote Card */}
      <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-brand-brown/10 text-brand-brown flex items-center justify-center flex-shrink-0 shadow-inner">
              <Quote size={20} />
            </div>
            <div>
              <p className="text-base md:text-lg font-bold text-earth-900 leading-relaxed italic mb-3">
                "{profile.quote}"
              </p>
              <div className="flex items-center gap-2 text-xs font-black text-brand-brown uppercase tracking-wider">
                <Sparkles size={13} />
                <span>{profile.fullName} • Personal Philosophy</span>
              </div>
            </div>
          </div>

          {isOwner && (
            <button
              onClick={openProfileEditModal}
              className="paper-btn p-2 rounded-xl text-brand-brown hover:text-earth-900 flex-shrink-0"
              title="Edit Personality Data"
            >
              <Edit3 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Personality Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.personalityPillars.map((t, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={t.id || idx}
              className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl paper-well flex items-center justify-center text-brand-brown flex-shrink-0">
                  <Icon size={18} />
                </div>
                <h3 className="font-extrabold text-sm md:text-base text-earth-900 leading-snug">
                  {t.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-earth-800 leading-relaxed mt-auto">
                {t.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Core Principles Well */}
      <div className="paper-well p-6 md:p-8 rounded-3xl border border-[#E6E0D5]">
        <div className="flex items-center gap-2.5 mb-4 text-earth-900 font-extrabold text-sm md:text-base">
          <HeartHandshake size={18} className="text-brand-brown" />
          <span>{lang === 'id' ? 'Nilai Kerja & Kolaborasi' : 'Core Working Principles'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/80 p-4 rounded-2xl shadow-sm border border-[#ECE7DF]">
            <div className="text-xl font-black text-brand-brown mb-1">Integritas</div>
            <div className="text-xs text-earth-700 font-medium">Jujur, transparan, dan dapat diandalkan dalam setiap komitmen.</div>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl shadow-sm border border-[#ECE7DF]">
            <div className="text-xl font-black text-brand-brown mb-1">Presisi</div>
            <div className="text-xs text-earth-700 font-medium">Memperhatikan detail arsitektur hingga optimasi baris kode terkecil.</div>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl shadow-sm border border-[#ECE7DF]">
            <div className="text-xl font-black text-brand-brown mb-1">Empati</div>
            <div className="text-xs text-earth-700 font-medium">Mendengarkan pengguna dan mengutamakan kenyamanan rekan tim.</div>
          </div>
        </div>
      </div>

    </div>
  );
};
