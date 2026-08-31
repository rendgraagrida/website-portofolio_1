import React from 'react';
import { useStore } from '@nanostores/react';
import { 
  $activeTab, 
  $showPortfolioGen, 
  $showContact, 
  selectMainTab, 
  closeOverlays,
  type MainTabType 
} from '../stores/navigation';
import { ui } from '../i18n/ui';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ProjectSlider } from './ProjectSlider';
import { TechGrid } from './TechGrid';
import { CoverLetterGenerator } from './CoverLetterGenerator';
import { ContactForm } from './ContactForm';
import { Briefcase, FolderGit2, Cpu, X, Sparkles, MessageSquareQuote } from 'lucide-react';

interface MainTabViewerProps {
  lang: 'id' | 'en';
}

export const MainTabViewer: React.FC<MainTabViewerProps> = ({ lang }) => {
  const t = ui[lang];
  const activeTab = useStore($activeTab);
  const showPortfolioGen = useStore($showPortfolioGen);
  const showContact = useStore($showContact);

  const tabs: { key: MainTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
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
    }
  ];

  return (
    <div id="main-tab-navigator" className="w-full pt-4 pb-20 scroll-mt-20">
      
      {/* CASE 1: PORTFOLIO GENERATOR OVERLAY (Paper Card) */}
      {showPortfolioGen && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 mb-12 animate-fade-in">
          <div className="paper-card rounded-3xl overflow-hidden">
            {/* Overlay Header with Close Button */}
            <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between">
              <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-sm md:text-base">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
                  <Sparkles size={16} />
                </div>
                <span>{lang === 'id' ? 'Portofolio & Cover Letter Generator' : 'Portfolio & Cover Letter Generator'}</span>
              </div>
              <button
                onClick={closeOverlays}
                className="paper-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-earth-800"
              >
                <X size={14} />
                <span>{lang === 'id' ? 'Tutup (Esc)' : 'Close'}</span>
              </button>
            </div>

            <CoverLetterGenerator lang={lang} />
          </div>
        </div>
      )}

      {/* CASE 2: CONTACT FORM OVERLAY (Paper Card) */}
      {showContact && (
        <div className="max-w-4xl mx-auto px-4 md:px-6 mb-12 animate-fade-in">
          <div className="paper-card rounded-3xl overflow-hidden">
            {/* Overlay Header with Close Button */}
            <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between">
              <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-sm md:text-base">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
                  <MessageSquareQuote size={16} />
                </div>
                <span>{lang === 'id' ? 'Mari Berbincang & Berkolaborasi' : "Let's Connect & Collaborate"}</span>
              </div>
              <button
                onClick={closeOverlays}
                className="paper-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-earth-800"
              >
                <X size={14} />
                <span>{lang === 'id' ? 'Tutup (Esc)' : 'Close'}</span>
              </button>
            </div>

            <ContactForm lang={lang} />
          </div>
        </div>
      )}

      {/* PAPER-BASED SEGMENTED TAB BAR */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-8">
        <div className="paper-well p-2 rounded-2xl md:rounded-full flex flex-wrap md:flex-nowrap items-center justify-between gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key && !showPortfolioGen && !showContact;
            return (
              <button
                key={tab.key}
                onClick={() => selectMainTab(tab.key)}
                className={`flex-1 min-w-[150px] md:min-w-0 py-3.5 px-4 md:px-6 rounded-xl md:rounded-full font-bold text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-2.5 focus:outline-none select-none ${
                  isActive
                    ? 'paper-btn text-brand-brown font-extrabold scale-[1.02]'
                    : 'text-earth-700 hover:text-earth-900 hover:bg-white/40'
                }`}
              >
                <span className={isActive ? 'text-brand-brown' : 'text-earth-500'}>
                  {tab.icon}
                </span>
                <span className="truncate">{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-brand-brown/10 text-brand-brown'
                        : 'bg-white/60 text-earth-600'
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

      {/* DYNAMIC CONTENT CONTAINER */}
      {!showPortfolioGen && !showContact && (
        <div className="min-h-[500px]">
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
            <div className="animate-fade-in">
              <TechGrid lang={lang} />
            </div>
          )}
        </div>
      )}

    </div>
  );
};
