import React, { useState } from 'react';
import { experiences } from '../data/resume';
import { Briefcase, Calendar, ChevronDown, ChevronUp, CheckCircle, Target } from 'lucide-react';
import { ui } from '../i18n/ui';

interface TimelineProps {
  lang: 'id' | 'en';
}

export const ExperienceTimeline: React.FC<TimelineProps> = ({ lang }) => {
  const t = ui[lang];
  const [expandedDesks, setExpandedDesks] = useState<Record<string, boolean>>({});

  const toggleDesk = (id: string) => {
    setExpandedDesks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="pengalaman" className="py-20 bg-brand-cream">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">{t['experience.title']}</h2>
        <p className="text-earth-800">
          {t['experience.desc']}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="relative border-l-2 border-brand-brown/30 ml-4 md:ml-6 space-y-12 pb-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute w-6 h-6 bg-brand-brown rounded-full -left-[13px] top-1 border-4 border-brand-cream flex items-center justify-center"></div>

              {/* Company & Role Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-brand-dark">{exp.role}</h3>
                <div className="flex flex-col md:flex-row md:items-start text-earth-800 mt-2 gap-2 md:gap-6 font-medium">
                  <div className="flex items-start gap-2">
                    <Briefcase size={18} className="text-brand-brown mt-0.5" />
                    <div className="flex flex-col">
                      {exp.companyUrl ? (
                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-brown transition-colors underline decoration-brand-brown/30 underline-offset-4">
                          {exp.company}
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                      {exp.companyHighlight && (
                        <span className="text-sm font-normal text-earth-500 mt-1 max-w-lg leading-snug">
                          {exp.companyHighlight[lang]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-brand-brown" />
                    <span>{exp.period[lang]}</span>
                  </div>
                </div>
              </div>

              {/* Job Desks Accordion */}
              <div className="space-y-4">
                {exp.jobDesks.map((desk, dIndex) => {
                  const deskId = `${exp.id}-${dIndex}`;
                  const isExpanded = expandedDesks[deskId];

                  return (
                    <div key={deskId} className="bg-white rounded-xl shadow-sm border border-earth-100 overflow-hidden transition-all duration-300">
                      {/* Accordion Header */}
                      <button 
                        onClick={() => toggleDesk(deskId)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-earth-50 focus:outline-none focus:bg-earth-50 transition-colors"
                      >
                        <h4 className="font-bold text-lg text-brand-dark">{desk.title[lang]}</h4>
                        <div className="text-brand-brown ml-4 flex-shrink-0">
                          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </div>
                      </button>

                      {/* Accordion Body (Cascade/Expand) */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-0 border-t border-earth-100">
                          
                          {/* Tasks Section */}
                          <div className="mt-4 mb-6">
                            <h5 className="flex items-center gap-2 font-bold text-brand-dark mb-3">
                              <Target size={18} className="text-brand-brown" />
                              {t['experience.responsibilities']}
                            </h5>
                            <ul className="space-y-2">
                              {desk.tasks[lang].map((task, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-3 text-earth-800">
                                  <span className="text-brand-brown mt-1">•</span>
                                  <span className="leading-relaxed">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Achievements Section */}
                          <div>
                            <h5 className="flex items-center gap-2 font-bold text-brand-dark mb-3">
                              <CheckCircle size={18} className="text-green-600" />
                              {t['experience.achievements']}
                            </h5>
                            <ul className="space-y-2">
                              {desk.achievements[lang].map((achievement, aIdx) => (
                                <li key={aIdx} className="flex items-start gap-3 text-earth-800">
                                  <span className="text-green-600 mt-1">•</span>
                                  <span className="leading-relaxed">{achievement}</span>
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
