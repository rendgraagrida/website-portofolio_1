import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $navMode } from '../stores/navigation';
import { experiences } from '../data/resume';
import { 
  Briefcase, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Target,
  Trophy
} from 'lucide-react';
import { ui } from '../i18n/ui';

interface TimelineProps {
  lang: 'id' | 'en';
}

export const ExperienceTimeline: React.FC<TimelineProps> = ({ lang }) => {
  const t = ui[lang];
  const navMode = useStore($navMode);
  const isPersonal = navMode === 'personal';

  // Default to empty object, so all are collapsed initially
  const [expandedDesks, setExpandedDesks] = useState<Record<string, boolean>>({});

  const toggleDesk = (id: string) => {
    setExpandedDesks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="pengalaman" className="py-12 select-none">
      <div className="max-w-5xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-black mb-3 ${
            isPersonal 
              ? 'bg-[#00F0FF] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] rounded-none uppercase' 
              : 'paper-btn text-earth-800 rounded-full'
          }`}>
            <Briefcase size={14} className={isPersonal ? 'text-black' : 'text-brand-brown'} />
            <span>Professional Career Track</span>
          </div>

          <h2 className={`text-3xl md:text-4xl font-extrabold text-earth-900 mb-2 tracking-tight ${
            isPersonal ? 'font-comic text-4xl md:text-5xl text-black tracking-wide' : ''
          }`}>
            {t['experience.title']}
          </h2>
          <p className={`text-base md:text-lg ${isPersonal ? 'text-black font-medium' : 'text-earth-800'}`}>
            {t['experience.desc']}
          </p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="max-w-5xl mx-auto px-6">
        <div className={`relative border-l-3 ${isPersonal ? 'border-black' : 'border-[#DCD5C9]'} ml-4 md:ml-6 space-y-12 pb-8`}>
          {([...experiences].reverse()).map((exp) => {
            const isExpanded = expandedDesks[exp.id] ?? false;



            return (
              <div key={exp.id} className="relative pl-8 md:pl-12">
                
                {/* Timeline Dot */}
                <div className={`absolute w-7 h-7 -left-[15px] top-1 flex items-center justify-center ${
                  isPersonal 
                    ? 'bg-[#FF007F] border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-none' 
                    : 'paper-btn rounded-full text-brand-brown'
                }`}>
                  <div className={`w-2.5 h-2.5 ${isPersonal ? 'bg-white' : 'bg-brand-brown rounded-full shadow-inner'}`}></div>
                </div>

                {/* Company Info (Header) */}
                <div className="mb-4 pr-4">
                  <div className="flex flex-wrap items-center text-earth-800 gap-3 md:gap-5 font-medium">
                    <span className={`font-extrabold text-xl ${isPersonal ? 'text-black bg-[#FFE600] px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_#000]' : 'text-earth-900 text-2xl tracking-tight'}`}>
                      {exp.company}
                    </span>
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${
                      isPersonal 
                        ? 'bg-[#00F0FF] text-black px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000]' 
                        : 'bg-[#ECE7DF] text-earth-600 px-3 py-1 rounded-full shadow-inner'
                    }`}>
                      <Calendar size={13} className={isPersonal ? 'text-black' : 'text-brand-brown'} />
                      <span>{exp.period[lang]}</span>
                    </div>
                  </div>
                  {exp.companyHighlight && (
                    <p className={`text-xs md:text-sm mt-3 leading-relaxed max-w-3xl ${isPersonal ? 'text-black font-semibold' : 'text-earth-700'}`}>
                      {exp.companyHighlight[lang]}
                    </p>
                  )}
                </div>

                {/* Role Banner (Static) */}
                <div className={`mb-5 px-6 py-4 flex items-center justify-between ${
                  isPersonal 
                    ? 'bg-black border-3 border-black shadow-[6px_6px_0px_0px_#000] rounded-none' 
                    : 'bg-earth-900 border border-earth-900 rounded-2xl shadow-md'
                }`}>
                  <span className={`font-extrabold flex items-center gap-3 ${
                    isPersonal ? 'font-comic text-2xl text-white tracking-wide' : 'text-[#F3EFE7] text-xl'
                  }`}>
                    <Briefcase size={22} className={isPersonal ? 'text-[#00F0FF]' : 'text-earth-400'} />
                    <span>Role : {exp.role}</span>
                  </span>
                </div>

                {/* Expandable Tasks / Job Desks */}
                <div className="space-y-4 pl-0 md:pl-4">
                  {exp.jobDesks.map((desk, idx) => {
                    const deskId = `${exp.id}-${idx}`;
                    const isExpanded = expandedDesks[deskId] ?? false;

                    return (
                      <div key={deskId} className={`transition-all duration-300 overflow-hidden ${
                        isPersonal 
                          ? 'bg-white border-3 border-black shadow-[4px_4px_0px_0px_#000] rounded-none' 
                          : 'paper-card rounded-2xl'
                      }`}>
                        <button 
                          onClick={() => toggleDesk(deskId)}
                          className={`w-full text-left px-5 py-4 flex items-center justify-between focus:outline-none transition-colors ${
                            isPersonal ? 'hover:bg-[#FF007F]/10' : 'hover:bg-[#F3EFE7]'
                          }`}
                        >
                          <span className={`font-bold flex items-center gap-2 ${
                            isPersonal ? 'text-lg text-black font-sans tracking-tight' : 'text-earth-900 text-base font-extrabold'
                          }`}>
                            <Target size={18} className={isPersonal ? 'text-[#00F0FF]' : 'text-brand-brown'} />
                            <span>{desk.title[lang]}</span>
                          </span>
                          <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${
                            isPersonal 
                              ? 'bg-[#00F0FF] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]' 
                              : 'bg-[#ECE7DF] rounded-xl text-brand-brown'
                          }`}>
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </button>

                        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className={`p-5 pt-4 space-y-5 ${isPersonal ? 'border-t-3 border-black bg-white' : 'border-t border-[#ECE7DF]'}`}>
                            
                            {/* Tasks as list */}
                            <div>
                              <ul className={`list-disc list-outside pl-4 space-y-2 text-sm leading-relaxed ${isPersonal ? 'text-black font-semibold' : 'text-earth-800'}`}>
                                {desk.tasks[lang].map((task, tIdx) => (
                                  <li key={tIdx}>{task}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Achievements as an embossed box */}
                            {desk.achievements[lang].length > 0 && (
                              <div>
                                <h4 className={`text-xs uppercase tracking-wider font-extrabold mb-3 flex items-center gap-1.5 ${isPersonal ? 'text-black' : 'text-earth-900'}`}>
                                  <Trophy size={14} className={isPersonal ? 'text-[#FFE600]' : 'text-brand-brown'} />
                                  <span>{lang === 'id' ? 'Pencapaian (Achievements)' : 'Key Achievements'}</span>
                                </h4>
                                
                                <div className={`p-4 rounded-xl text-sm leading-relaxed ${
                                  isPersonal 
                                    ? 'bg-[#FFE600] text-black border-2 border-black font-bold shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.15)]' 
                                    : 'bg-[#ECE7DF] text-earth-900 font-medium shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]'
                                }`}>
                                  <ul className="space-y-2 list-none p-0 m-0">
                                     {desk.achievements[lang].map((ach, aIdx) => (
                                       <li key={aIdx} className="flex gap-2">
                                         <span className="font-black select-none text-brand-brown/50">{'>'}</span>
                                         <span>{ach}</span>
                                       </li>
                                     ))}
                                  </ul>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
