import React, { useState } from 'react';
import { experiences } from '../data/resume';
import { Briefcase, Calendar, ChevronDown, ChevronUp, CheckCircle, Target } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const [expandedDesks, setExpandedDesks] = useState<Record<string, boolean>>({});

  const toggleDesk = (id: string) => {
    setExpandedDesks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="pengalaman" className="py-20 bg-tuku-cream">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-tuku-dark mb-4">Jejak Profesional</h2>
        <p className="text-earth-800">
          Perjalanan karier dan rekam jejak pekerjaan yang membentuk keahlian saya hari ini.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="relative border-l-2 border-tuku-brown/30 ml-4 md:ml-6 space-y-12 pb-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute w-6 h-6 bg-tuku-brown rounded-full -left-[13px] top-1 border-4 border-tuku-cream flex items-center justify-center"></div>

              {/* Company & Role Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-tuku-dark">{exp.role}</h3>
                <div className="flex flex-col md:flex-row md:items-center text-earth-800 mt-2 gap-2 md:gap-6 font-medium">
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} className="text-tuku-brown" />
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-tuku-brown" />
                    <span>{exp.period}</span>
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
                        <h4 className="font-bold text-lg text-tuku-dark">{desk.title}</h4>
                        <div className="text-tuku-brown ml-4 flex-shrink-0">
                          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </div>
                      </button>

                      {/* Accordion Body (Cascade/Expand) */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-0 border-t border-earth-100">
                          
                          {/* Tasks Section */}
                          <div className="mt-4 mb-6">
                            <h5 className="flex items-center gap-2 font-bold text-tuku-dark mb-3">
                              <Target size={18} className="text-tuku-brown" />
                              Key Responsibilities & Tasks
                            </h5>
                            <ul className="space-y-2">
                              {desk.details.tasks.map((task, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-3 text-earth-800">
                                  <span className="text-tuku-brown mt-1">•</span>
                                  <span className="leading-relaxed">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Achievements Section */}
                          <div>
                            <h5 className="flex items-center gap-2 font-bold text-tuku-dark mb-3">
                              <CheckCircle size={18} className="text-green-600" />
                              Key Achievements
                            </h5>
                            <ul className="space-y-2">
                              {desk.details.achievements.map((achievement, aIdx) => (
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
