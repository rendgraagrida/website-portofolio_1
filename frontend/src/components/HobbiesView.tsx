import React from 'react';
import { useStore } from '@nanostores/react';
import { $navMode } from '../stores/navigation';
import { 
  $profileData, 
  type HobbyItem 
} from '../stores/profile';
import { 
  Mountain, 
  Camera, 
  Coffee, 
  Heart, 
  Sparkles, 
  MapPin
} from 'lucide-react';

interface HobbiesViewProps {
  lang: 'id' | 'en';
}

export const HobbiesView: React.FC<HobbiesViewProps> = ({ lang }) => {
  const profile = useStore($profileData);
  const navMode = useStore($navMode);
  const isPersonal = navMode === 'personal';

  const icons = [Mountain, Camera, Coffee, Heart];

  return (
    <div className="space-y-8 animate-fade-in select-none">
      
      {/* 4 Hobbies Grid (Dual Styled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.hobbies.map((h, idx) => {
          const Icon = icons[idx % icons.length];

          return (
            <div
              key={h.id || idx}
              className={`p-6 flex flex-col justify-between relative transition-all duration-300 ${
                isPersonal 
                  ? 'bg-white border-3 border-black shadow-[6px_6px_0px_0px_#000] rounded-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]' 
                  : 'paper-card rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn hover:-translate-y-1'
              }`}
            >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${
                      isPersonal ? 'bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-none' : 'rounded-2xl paper-well text-brand-brown'
                    }`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 ${
                      isPersonal ? 'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]' : 'text-brand-brown bg-white rounded-full shadow-sm border border-[#ECE7DF]'
                    }`}>
                      {h.tag[lang]}
                    </span>
                  </div>

                  <h3 className={`font-extrabold text-base leading-snug mb-1 pr-14 ${
                    isPersonal ? 'font-comic text-2xl text-black tracking-wide' : 'text-earth-900'
                  }`}>
                    {h.title[lang]}
                  </h3>

                  <p className={`text-[11px] flex items-center gap-1 mb-3 font-bold ${
                    isPersonal ? 'text-black' : 'text-earth-600'
                  }`}>
                    <MapPin size={12} className={isPersonal ? 'text-[#FF007F]' : 'text-brand-brown'} />
                    <span>{h.location[lang]}</span>
                  </p>

                  <p className={`text-xs md:text-sm leading-relaxed ${
                    isPersonal ? 'text-black font-semibold' : 'text-earth-800'
                  }`}>
                    {h.desc[lang]}
                  </p>
                </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
