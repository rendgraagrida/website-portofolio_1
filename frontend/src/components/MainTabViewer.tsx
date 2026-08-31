import React, { useState, useEffect } from 'react';
import { ui } from '../i18n/ui';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ProjectSlider } from './ProjectSlider';
import { TechGrid } from './TechGrid';
import { CoverLetterGenerator } from './CoverLetterGenerator';
import { ContactForm } from './ContactForm';
import { Briefcase, FolderGit2, Cpu, Sparkles, MessageSquareQuote } from 'lucide-react';

interface MainTabViewerProps {
  lang: 'id' | 'en';
}

type TabKey = 'experience' | 'projects' | 'stack' | 'portfolio-gen' | 'contact';

export const MainTabViewer: React.FC<MainTabViewerProps> = ({ lang }) => {
  const t = ui[lang];
  const [activeTab, setActiveTab] = useState<TabKey>('experience');

  // Handle URL hash navigation (#pengalaman, #proyek, #stack, #portfolio-gen, #cover-letter, #kontak)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('proyek') || hash.includes('project')) {
        setActiveTab('projects');
      } else if (hash.includes('pengalaman') || hash.includes('experience')) {
        setActiveTab('experience');
      } else if (hash.includes('stack') || hash.includes('tech') || hash.includes('skill')) {
        setActiveTab('stack');
      } else if (hash.includes('cover') || hash.includes('letter') || hash.includes('portfolio') || hash.includes('generator')) {
        setActiveTab('portfolio-gen');
      } else if (hash.includes('kontak') || hash.includes('contact') || hash.includes('bincang')) {
        setActiveTab('contact');
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
      icon: <Briefcase size={17} />,
      badge: '8+ Thn'
    },
    {
      key: 'projects',
      label: lang === 'id' ? 'Showcase Repositori' : 'GitHub Projects',
      icon: <FolderGit2 size={17} />,
      badge: '5 Repo'
    },
    {
      key: 'stack',
      label: lang === 'id' ? 'Core Tech Stack' : 'Core Tech Stack',
      icon: <Cpu size={17} />,
      badge: '16 Tools'
    },
    {
      key: 'portfolio-gen',
      label: lang === 'id' ? 'Portofolio Generator' : 'Portfolio Generator',
      icon: <Sparkles size={17} className="text-amber-500" />,
      badge: 'Auto'
    },
    {
      key: 'contact',
      label: lang === 'id' ? 'Mari Berbincang' : "Let's Connect",
      icon: <MessageSquareQuote size={17} className="text-brand-brown" />,
      badge: 'Online'
    }
  ];

  const handleTabClick = (key: TabKey) => {
    setActiveTab(key);
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
                className={`flex-1 min-w-[130px] md:min-w-0 py-3 px-3 md:px-4 rounded-xl md:rounded-full font-bold text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 focus:outline-none select-none ${
                  isActive
                    ? 'bg-brand-brown text-white shadow-md transform scale-[1.02]'
                    : 'text-earth-700 hover:text-brand-brown hover:bg-white/60'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-brand-brown'}>
                  {tab.icon}
                </span>
                <span className="truncate">{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden lg:inline-block text-[10px] px-2 py-0.5 rounded-full font-bold ${
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
          <div className="animate-fade-in bg-[#FAF9F5] rounded-3xl max-w-6xl mx-auto border border-earth-200/60 my-4 shadow-sm">
            <TechGrid lang={lang} />
          </div>
        )}

        {activeTab === 'portfolio-gen' && (
          <div className="animate-fade-in">
            <CoverLetterGenerator lang={lang} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-fade-in bg-white rounded-3xl max-w-4xl mx-auto border border-earth-200/80 my-4 shadow-md overflow-hidden">
            <ContactForm lang={lang} />
          </div>
        )}
      </div>

    </div>
  );
};
