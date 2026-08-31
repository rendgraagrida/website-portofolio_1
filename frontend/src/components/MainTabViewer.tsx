import React from 'react';
import { useStore } from '@nanostores/react';
import { 
  $navMode,
  $activeProfTab,
  $activePersonalTab,
  $showPortfolioGen,
  $showContact,
  selectProfTab,
  selectPersonalTab
} from '../stores/navigation';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ProjectSlider } from './ProjectSlider';
import { TechGrid } from './TechGrid';
import { PersonalityView } from './PersonalityView';
import { HobbiesView } from './HobbiesView';
import { EmbeddedGalleryView } from './EmbeddedGalleryView';
import { CoverLetterGenerator } from './CoverLetterGenerator';
import { ContactForm } from './ContactForm';
import { 
  Briefcase, 
  FolderGit2, 
  Cpu, 
  User, 
  Compass, 
  Camera
} from 'lucide-react';

interface MainTabViewerProps {
  lang: 'id' | 'en';
}

export const MainTabViewer: React.FC<MainTabViewerProps> = ({ lang }) => {
  const navMode = useStore($navMode);
  const isPersonal = navMode === 'personal';
  const activeProfTab = useStore($activeProfTab);
  const activePersonalTab = useStore($activePersonalTab);
  const showPortfolioGen = useStore($showPortfolioGen);
  const showContact = useStore($showContact);

  return (
    <section id="main-tab-navigator" className="max-w-5xl mx-auto px-6 py-8 select-none relative z-10">
      
      {/* OVERLAY 1: Portfolio Generator */}
      {showPortfolioGen && (
        <div className="mb-12 animate-fade-in">
          <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-xl">
            <CoverLetterGenerator lang={lang} />
          </div>
        </div>
      )}

      {/* OVERLAY 2: Contact Form */}
      {showContact && (
        <div className="mb-12 animate-fade-in">
          <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-xl">
            <ContactForm lang={lang} />
          </div>
        </div>
      )}

      {/* MASTER SEGMENTED TABS NAVIGATOR (Dual Styled: Paper vs Neo-Brutalism) */}
      <div className="flex flex-col items-center mb-10">
        
        <div className={`p-1.5 flex items-center gap-1.5 w-full max-w-2xl transition-all duration-300 ${
          isPersonal 
            ? 'bg-[#00F0FF] border-3 border-black shadow-[6px_6px_0px_0px_#000] rounded-none' 
            : 'paper-well rounded-2xl border border-[#E6E0D5]'
        }`}>
          {navMode === 'professional' ? (
            // PROFESSIONAL TABS
            <>
              <button
                onClick={() => selectProfTab('experience')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 ${
                  activeProfTab === 'experience'
                    ? 'paper-card bg-[#FAF8F5] text-brand-brown shadow-md transform scale-[1.02]'
                    : 'text-earth-700 hover:text-earth-900'
                }`}
              >
                <Briefcase size={16} className={activeProfTab === 'experience' ? 'text-brand-brown' : 'text-earth-500'} />
                <span>{lang === 'id' ? 'Jejak Profesional' : 'Experience'}</span>
              </button>

              <button
                onClick={() => selectProfTab('projects')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 ${
                  activeProfTab === 'projects'
                    ? 'paper-card bg-[#FAF8F5] text-brand-brown shadow-md transform scale-[1.02]'
                    : 'text-earth-700 hover:text-earth-900'
                }`}
              >
                <FolderGit2 size={16} className={activeProfTab === 'projects' ? 'text-brand-brown' : 'text-earth-500'} />
                <span>{lang === 'id' ? 'Showcase Repositori' : 'Projects'}</span>
              </button>

              <button
                onClick={() => selectProfTab('stack')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 ${
                  activeProfTab === 'stack'
                    ? 'paper-card bg-[#FAF8F5] text-brand-brown shadow-md transform scale-[1.02]'
                    : 'text-earth-700 hover:text-earth-900'
                }`}
              >
                <Cpu size={16} className={activeProfTab === 'stack' ? 'text-brand-brown' : 'text-earth-500'} />
                <span>{lang === 'id' ? 'Core Tech Stack' : 'Tech Stack'}</span>
              </button>
            </>
          ) : (
            // PERSONAL TABS (Pop Art Neo-Brutalist Tabs)
            <>
              <button
                onClick={() => selectPersonalTab('personality')}
                className={`flex-1 py-3 px-2 text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 ${
                  activePersonalTab === 'personality'
                    ? 'bg-[#FF007F] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000] transform -translate-x-0.5 -translate-y-0.5'
                    : 'text-black hover:bg-white/60'
                }`}
              >
                <User size={16} />
                <span className="font-comic text-base tracking-wider uppercase">Personality</span>
              </button>

              <button
                onClick={() => selectPersonalTab('hobbies')}
                className={`flex-1 py-3 px-2 text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 ${
                  activePersonalTab === 'hobbies'
                    ? 'bg-[#FF007F] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000] transform -translate-x-0.5 -translate-y-0.5'
                    : 'text-black hover:bg-white/60'
                }`}
              >
                <Compass size={16} />
                <span className="font-comic text-base tracking-wider uppercase">Hobbies</span>
              </button>

              <button
                onClick={() => selectPersonalTab('gallery')}
                className={`flex-1 py-3 px-2 text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 ${
                  activePersonalTab === 'gallery'
                    ? 'bg-[#FF007F] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000] transform -translate-x-0.5 -translate-y-0.5'
                    : 'text-black hover:bg-white/60'
                }`}
              >
                <Camera size={16} />
                <span className="font-comic text-base tracking-wider uppercase">Gallery</span>
              </button>
            </>
          )}
        </div>

      </div>

      {/* TAB CONTENT AREA */}
      <div className="transition-all duration-300">
        {navMode === 'professional' ? (
          <>
            {activeProfTab === 'experience' && <ExperienceTimeline lang={lang} />}
            {activeProfTab === 'projects' && <ProjectSlider lang={lang} />}
            {activeProfTab === 'stack' && <TechGrid lang={lang} />}
          </>
        ) : (
          <>
            {activePersonalTab === 'personality' && <PersonalityView lang={lang} />}
            {activePersonalTab === 'hobbies' && <HobbiesView lang={lang} />}
            {activePersonalTab === 'gallery' && <EmbeddedGalleryView lang={lang} />}
          </>
        )}
      </div>

    </section>
  );
};
