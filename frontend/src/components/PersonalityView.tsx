import React from 'react';
import { useStore } from '@nanostores/react';
import { $navMode } from '../stores/navigation';
import { 
  $profileData, 
  type PersonalityItem 
} from '../stores/profile';
import { 
  Brain, 
  Users, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  HeartHandshake, 
  Quote
} from 'lucide-react';

interface PersonalityViewProps {
  lang: 'id' | 'en';
}

export const PersonalityView: React.FC<PersonalityViewProps> = ({ lang }) => {
  const profile = useStore($profileData);
  const navMode = useStore($navMode);
  const isPersonal = navMode === 'personal';

  const icons = [Brain, Users, ShieldCheck, Compass];

  return (
    <div className="space-y-8 animate-fade-in select-none">
      
      {/* Hero Quote Card (Neo-Brutalist in Personal Mode) */}
      <div className={`p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${
        isPersonal
          ? 'bg-[#00F0FF] border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-none'
          : 'paper-card rounded-3xl bg-[#FAF8F5] border border-white/80 shadow-md'
      }`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${
              isPersonal 
                ? 'bg-[#FF007F] text-white border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-none' 
                : 'rounded-2xl bg-brand-brown/10 text-brand-brown shadow-inner'
            }`}>
              <Quote size={24} />
            </div>
            
            <div className="flex-1">
              <p className={`text-base md:text-xl font-extrabold leading-relaxed italic mb-3 ${
                isPersonal ? 'text-black font-sans tracking-tight drop-shadow-xs' : 'text-earth-900'
              }`}>
                "{profile.quote[lang]}"
              </p>
              <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${
                isPersonal ? 'text-black bg-white px-2.5 py-1 border-2 border-black inline-flex shadow-[3px_3px_0px_0px_#000]' : 'text-brand-brown'
              }`}>
                <Sparkles size={13} />
                <span>{profile.fullName} • Personal Philosophy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personality Pillars Grid (Dual Styled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.personalityPillars.map((t, idx) => {
          const Icon = icons[idx % icons.length];

          return (
            <div
              key={t.id || idx}
              className={`p-6 flex flex-col relative transition-all duration-300 ${
                isPersonal 
                  ? 'bg-white border-3 border-black shadow-[6px_6px_0px_0px_#000] rounded-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]' 
                  : 'paper-card rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn hover:-translate-y-1'
              }`}
            >
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                      isPersonal ? 'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-none' : 'w-9 h-9 rounded-xl paper-well text-brand-brown'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <h3 className={`font-extrabold text-sm md:text-base leading-snug pr-12 ${
                      isPersonal ? 'font-comic text-xl text-black tracking-wide' : 'text-earth-900'
                    }`}>
                      {t.title[lang]}
                    </h3>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed mt-auto ${
                    isPersonal ? 'text-black font-semibold' : 'text-earth-800'
                  }`}>
                    {t.desc[lang]}
                  </p>
                </>
            </div>
          );
        })}
      </div>

      {/* Core Principles (Dual Styled) */}
      <div className={`p-6 md:p-8 transition-all duration-300 ${
        isPersonal ? 'bg-[#FF007F] border-4 border-black shadow-[8px_8px_0px_0px_#000] rounded-none text-white' : 'paper-well rounded-3xl border border-[#E6E0D5]'
      }`}>
        <div className={`flex items-center gap-2.5 mb-4 font-extrabold text-sm md:text-base ${
          isPersonal ? 'font-comic text-2xl text-white tracking-wider' : 'text-earth-900'
        }`}>
          <HeartHandshake size={22} className={isPersonal ? 'text-white' : 'text-brand-brown'} />
          <span>{lang === 'id' ? 'NILAI KERJA & KOLABORASI' : 'CORE WORKING PRINCIPLES'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className={`p-4 ${isPersonal ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-none' : 'bg-white/80 rounded-2xl shadow-sm border border-[#ECE7DF]'}`}>
            <div className={`text-xl font-black mb-1 ${isPersonal ? 'font-comic text-2xl text-[#FF007F]' : 'text-brand-brown'}`}>
              {lang === 'id' ? 'Integritas' : 'Integrity'}
            </div>
            <div className="text-xs text-black font-bold">
              {lang === 'id' ? 'Jujur, transparan, dan dapat diandalkan dalam setiap komitmen.' : 'Honest, transparent, and reliable in every commitment.'}
            </div>
          </div>
          <div className={`p-4 ${isPersonal ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-none' : 'bg-white/80 rounded-2xl shadow-sm border border-[#ECE7DF]'}`}>
            <div className={`text-xl font-black mb-1 ${isPersonal ? 'font-comic text-2xl text-[#00F0FF]' : 'text-brand-brown'}`}>
              {lang === 'id' ? 'Presisi' : 'Precision'}
            </div>
            <div className="text-xs text-black font-bold">
              {lang === 'id' ? 'Memperhatikan detail arsitektur hingga optimasi baris kode terkecil.' : 'Paying attention to architectural details down to the smallest code optimization.'}
            </div>
          </div>
          <div className={`p-4 ${isPersonal ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-none' : 'bg-white/80 rounded-2xl shadow-sm border border-[#ECE7DF]'}`}>
            <div className={`text-xl font-black mb-1 ${isPersonal ? 'font-comic text-2xl text-[#FFE600]' : 'text-brand-brown'}`}>
              {lang === 'id' ? 'Empati' : 'Empathy'}
            </div>
            <div className="text-xs text-black font-bold">
              {lang === 'id' ? 'Mendengarkan pengguna dan mengutamakan kenyamanan rekan tim.' : 'Listening to users and prioritizing team comfort and collaboration.'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
