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
    }
  ];

  return (
    <div id="main-tab-navigator" className="w-full pt-4 pb-20 scroll-mt-20">
      
      {/* CASE 1: PORTFOLIO GENERATOR OVERLAY (Triggered by clicking Rendgra.Dev logo) */}
      {showPortfolioGen && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 mb-12 animate-fade-in transition-all duration-400">
          <div className="bg-white rounded-3xl border-2 border-brand-brown/30 shadow-xl overflow-hidden">
            {/* Overlay Header with Close Button */}
            <div className="bg-brand-cream/80 px-6 py-4 border-b border-earth-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-extrabold text-brand-dark text-sm md:text-base">
                <Sparkles size={18} className="text-brand-brown animate-pulse" />
                <span>{lang === 'id' ? 'Portofolio & Cover Letter Generator' : 'Portfolio & Cover Letter Generator'}</span>
              </div>
              <button
                onClick={closeOverlays}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-brand-brown hover:text-white text-earth-800 rounded-xl text-xs font-bold transition-all shadow-sm border border-earth-200"
              >
                <X size={14} />
                <span>{lang === 'id' ? 'Tutup (Esc)' : 'Close'}</span>
              </button>
            </div>

            <CoverLetterGenerator lang={lang} />
          </div>
        </div>
      )}

      {/* CASE 2: CONTACT FORM OVERLAY (Triggered by clicking Hubungi Saya button) */}
      {showContact && (
        <div className="max-w-4xl mx-auto px-4 md:px-6 mb-12 animate-fade-in transition-all duration-400">
          <div className="bg-white rounded-3xl border-2 border-brand-brown/30 shadow-xl overflow-hidden">
            {/* Overlay Header with Close Button */}
            <div className="bg-brand-cream/80 px-6 py-4 border-b border-earth-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-extrabold text-brand-dark text-sm md:text-base">
                <MessageSquareQuote size={18} className="text-brand-brown" />
                <span>{lang === 'id' ? 'Mari Berbincang & Berkolaborasi' : "Let's Connect & Collaborate"}</span>
              </div>
              <button
                onClick={closeOverlays}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-brand-brown hover:text-white text-earth-800 rounded-xl text-xs font-bold transition-all shadow-sm border border-earth-200"
              >
                <X size={14} />
                <span>{lang === 'id' ? 'Tutup (Esc)' : 'Close'}</span>
              </button>
            </div>

            <ContactForm lang={lang} />
          </div>
        </div>
      )}

      {/* MAIN 3-SEGMENTED TAB BAR */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-8">
        <div className="bg-earth-100 p-2 rounded-2xl md:rounded-full border border-earth-200 shadow-inner flex flex-wrap md:flex-nowrap items-center justify-between gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key && !showPortfolioGen && !showContact;
            return (
              <button
                key={tab.key}
                onClick={() => selectMainTab(tab.key)}
                className={`flex-1 min-w-[150px] md:min-w-0 py-3.5 px-4 md:px-6 rounded-xl md:rounded-full font-bold text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none select-none ${
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

      {/* DYNAMIC CONTENT FOR ACTIVE TAB (WHEN OVERLAYS ARE CLOSED) */}
      {!showPortfolioGen && !showContact && (
        <div className="min-h-[500px] transition-opacity duration-400 ease-in-out">
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
        </div>
      )}

    </div>
  );
};
