import React, { useState } from 'react';
import { experiences } from '../data/resume';
import { Briefcase, Calendar, ChevronDown, ChevronUp, CheckCircle2, Target } from 'lucide-react';
import { ui } from '../i18n/ui';

interface TimelineProps {
  lang: 'id' | 'en';
}

export const ExperienceTimeline: React.FC<TimelineProps> = ({ lang }) => {
  const t = ui[lang];
  const [expandedDesks, setExpandedDesks] = useState<Record<string, boolean>>({
    'telkomsigma-tech-lead-0': true // Open first desk by default for immediate preview
  });

  const toggleDesk = (id: string) => {
    setExpandedDesks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="pengalaman" className="py-12">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full paper-btn text-earth-800 text-xs font-extrabold mb-3">
          <Briefcase size={14} className="text-brand-brown" />
          <span>Professional Career Track</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-earth-900 mb-3 tracking-tight">
          {t['experience.title']}
        </h2>
        <p className="text-earth-800 text-base md:text-lg">
          {t['experience.desc']}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="relative border-l-2 border-[#DCD5C9] ml-4 md:ml-6 space-y-12 pb-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-12">
              
              {/* Embossed Paper Timeline Stamp Dot */}
              <div className="absolute w-7 h-7 paper-btn rounded-full -left-[15px] top-1 flex items-center justify-center text-brand-brown">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-brown shadow-inner"></div>
              </div>

              {/* Company & Role Header (Paper Card Subdued) */}
              <div className="mb-6">
                <h3 className="text-2xl font-extrabold text-earth-900 tracking-tight">{exp.role}</h3>
                <div className="flex flex-col md:flex-row md:items-start text-earth-800 mt-2 gap-2 md:gap-6 font-medium">
                  <div className="flex items-start gap-2">
                    <Briefcase size={17} className="text-brand-brown mt-0.5" />
                    <div className="flex flex-col">
                      {exp.companyUrl ? (
                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown font-bold transition-colors underline decoration-brand-brown/30 underline-offset-4">
                          {exp.company}
                        </a>
                      ) : (
                        <span className="font-bold">{exp.company}</span>
                      )}
                      {exp.companyHighlight && (
                        <span className="text-xs md:text-sm font-normal text-earth-600 mt-1 max-w-xl leading-relaxed">
                          {exp.companyHighlight[lang]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-earth-600 whitespace-nowrap bg-[#ECE7DF] px-3 py-1 rounded-full shadow-inner">
                    <Calendar size={15} className="text-brand-brown" />
                    <span>{exp.period[lang]}</span>
                  </div>
                </div>
              </div>

              {/* Job Desks Accordion in Paper Cards */}
              <div className="space-y-4">
                {exp.jobDesks.map((desk, dIndex) => {
                  const deskId = `${exp.id}-${dIndex}`;
                  const isExpanded = expandedDesks[deskId];

                  return (
                    <div key={deskId} className="paper-card rounded-2xl overflow-hidden transition-all duration-300">
                      {/* Accordion Header */}
                      <button 
                        onClick={() => toggleDesk(deskId)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-[#F3EFE7] focus:outline-none transition-colors"
                      >
                        <h4 className="font-extrabold text-base md:text-lg text-earth-900">{desk.title[lang]}</h4>
                        <div className="w-8 h-8 rounded-xl paper-btn flex items-center justify-center text-brand-brown ml-4 flex-shrink-0">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </button>

                      {/* Accordion Body */}
                      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-2 border-t border-[#ECE7DF]">
                          
                          {/* Tasks Section */}
                          <div className="mt-3 mb-6">
                            <h5 className="flex items-center gap-2 font-extrabold text-earth-900 text-sm mb-3">
                              <Target size={16} className="text-brand-brown" />
                              <span>{t['experience.responsibilities']}</span>
                            </h5>
                            <ul className="space-y-2.5">
                              {desk.tasks[lang].map((task, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-3 text-earth-800 text-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-brown mt-2 flex-shrink-0"></span>
                                  <span className="leading-relaxed">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Achievements Section */}
                          <div className="paper-well p-4 rounded-xl">
                            <h5 className="flex items-center gap-2 font-extrabold text-earth-900 text-xs uppercase tracking-wider mb-2">
                              <CheckCircle2 size={15} className="text-emerald-700" />
                              <span>{t['experience.achievements']}</span>
                            </h5>
                            <ul className="space-y-1.5">
                              {desk.achievements[lang].map((achievement, aIdx) => (
                                <li key={aIdx} className="text-xs md:text-sm text-earth-800 leading-relaxed">
                                  • {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
