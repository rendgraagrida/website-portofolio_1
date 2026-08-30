import React, { useState, useEffect } from 'react';
import { ui } from '../i18n/ui';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ProjectSlider } from './ProjectSlider';
import { TechGrid } from './TechGrid';
import { CoverLetterGenerator } from './CoverLetterGenerator';
import { Briefcase, FolderGit2, Cpu, Sparkles } from 'lucide-react';

interface MainTabViewerProps {
  lang: 'id' | 'en';
}

type TabKey = 'experience' | 'projects' | 'stack' | 'cover-letter';

export const MainTabViewer: React.FC<MainTabViewerProps> = ({ lang }) => {
  const t = ui[lang];
  const [activeTab, setActiveTab] = useState<TabKey>('experience');

  // Handle URL hash navigation (#pengalaman, #proyek, #stack, #cover-letter)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('proyek') || hash.includes('project')) {
        setActiveTab('projects');
      } else if (hash.includes('pengalaman') || hash.includes('experience')) {
        setActiveTab('experience');
      } else if (hash.includes('stack') || hash.includes('tech') || hash.includes('skill')) {
        setActiveTab('stack');
      } else if (hash.includes('cover') || hash.includes('letter')) {
        setActiveTab('cover-letter');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const tabs: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      key: 'experience',
      label: lang === 'id' ? 'Jejak Profesional' : 'Professional Journey',
      icon: <Briefcase size={18} />,
      badge: '8+ Thn'
    },
    {
      key: 'projects',
      label: lang === 'id' ? 'Showcase Repositori' : 'GitHub Projects',
      icon: <FolderGit2 size={18} />,
      badge: '5 Repo'
    },
    {
      key: 'stack',
      label: lang === 'id' ? 'Core Tech Stack' : 'Core Tech Stack',
      icon: <Cpu size={18} />,
      badge: '16 Tools'
    },
    {
      key: 'cover-letter',
      label: lang === 'id' ? 'Cover Letter AI' : 'Cover Letter AI',
      icon: <Sparkles size={18} className="text-amber-500" />,
      badge: 'Auto Gen'
    }
  ];

  const handleTabClick = (key: TabKey) => {
    setActiveTab(key);
    // Smooth scroll to top of tabs if user is further down
    const tabElement = document.getElementById('main-tab-navigator');
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="main-tab-navigator" className="w-full pt-6 pb-20 scroll-mt-20">
      
      {/* Big Master Segmented Control / Tab Bar */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-8">
        <div className="bg-earth-100 p-2 rounded-2xl md:rounded-full border border-earth-200 shadow-inner flex flex-wrap md:flex-nowrap items-center justify-between gap-1.5 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`flex-1 min-w-[140px] md:min-w-0 py-3.5 px-4 md:px-5 rounded-xl md:rounded-full font-bold text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none select-none ${
                  isActive
                    ? 'bg-tuku-brown text-white shadow-md transform scale-[1.02]'
                    : 'text-earth-700 hover:text-tuku-brown hover:bg-white/60'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-tuku-brown'}>
                  {tab.icon}
                </span>
                <span className="truncate">{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-earth-200/80 text-earth-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Tab Content with Smooth Transition */}
      <div className="min-h-[500px] transition-all duration-500">
        {activeTab === 'experience' && (
          <div className="animate-fade-in">
            <ExperienceTimeline lang={lang} />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="animate-fade-in">
            <ProjectSlider lang={lang} />
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="animate-fade-in bg-earth-100/40 rounded-3xl max-w-6xl mx-auto border border-earth-200/60 my-4">
            <TechGrid lang={lang} />
          </div>
        )}

        {activeTab === 'cover-letter' && (
          <div className="animate-fade-in">
            <CoverLetterGenerator lang={lang} />
          </div>
        )}
      </div>

    </div>
  );
};
