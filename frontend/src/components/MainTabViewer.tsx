import React from 'react';
import { useStore } from '@nanostores/react';
import { 
  $navMode,
  $activeProfTab,
  $activePersonalTab,
  $showPortfolioGen,
  $showContact,
  selectProfTab,
  selectPersonalTab,
  setNavigationMode,
  type ProfessionalTab,
  type PersonalTab
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
  Sparkles, 
  Mail, 
  User, 
  Compass, 
  Camera,
  Heart
} from 'lucide-react';

interface MainTabViewerProps {
  lang: 'id' | 'en';
}

export const MainTabViewer: React.FC<MainTabViewerProps> = ({ lang }) => {
  const navMode = useStore($navMode);
  const activeProfTab = useStore($activeProfTab);
  const activePersonalTab = useStore($activePersonalTab);
  const showPortfolioGen = useStore($showPortfolioGen);
  const showContact = useStore($showContact);

  return (
    <section id="main-tab-navigator" className="max-w-5xl mx-auto px-6 py-8 select-none">
      
      {/* OVERLAY 1: Portfolio Generator (Active when Rendgra.Dev clicked) */}
      {showPortfolioGen && (
        <div className="mb-12 animate-fade-in">
          <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-xl">
            <CoverLetterGenerator lang={lang} />
          </div>
        </div>
      )}

      {/* OVERLAY 2: Contact Form (Active when Hubungi Saya clicked) */}
      {showContact && (
        <div className="mb-12 animate-fade-in">
          <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-xl">
            <ContactForm lang={lang} />
          </div>
        </div>
      )}

      {/* MASTER SEGMENTED TABS NAVIGATOR */}
      <div className="flex flex-col items-center mb-10">
        
        {/* Mode Indicator & Switcher */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setNavigationMode('professional')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
              navMode === 'professional'
                ? 'paper-card bg-brand-brown text-white shadow-md'
                : 'paper-btn text-earth-700 hover:text-brand-brown'
            }`}
          >
            <Briefcase size={13} />
            <span>{lang === 'id' ? 'Karier & Engineering' : 'Professional Engineering'}</span>
          </button>

          <button
            onClick={() => setNavigationMode('personal')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
              navMode === 'personal'
                ? 'paper-card bg-brand-brown text-white shadow-md'
                : 'paper-btn text-earth-700 hover:text-brand-brown'
            }`}
          >
            <User size={13} />
            <span>{lang === 'id' ? 'Personal & Galeri' : 'Personal & Gallery'}</span>
          </button>
        </div>

        {/* PAPER SEGMENTED CONTROL TABS */}
        <div className="paper-well p-1.5 rounded-2xl flex items-center gap-1 w-full max-w-2xl border border-[#E6E0D5]">
          {navMode === 'professional' ? (
            // PROFESSIONAL TABS: Jejak Profesional, Showcase, Core Tech
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
            // PERSONAL TABS: Personality, Hobbies, Gallery
            <>
              <button
                onClick={() => selectPersonalTab('personality')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 ${
                  activePersonalTab === 'personality'
                    ? 'paper-card bg-[#FAF8F5] text-brand-brown shadow-md transform scale-[1.02]'
                    : 'text-earth-700 hover:text-earth-900'
                }`}
              >
                <User size={16} className={activePersonalTab === 'personality' ? 'text-brand-brown' : 'text-earth-500'} />
                <span>Personality</span>
              </button>

              <button
                onClick={() => selectPersonalTab('hobbies')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 ${
                  activePersonalTab === 'hobbies'
                    ? 'paper-card bg-[#FAF8F5] text-brand-brown shadow-md transform scale-[1.02]'
                    : 'text-earth-700 hover:text-earth-900'
                }`}
              >
                <Compass size={16} className={activePersonalTab === 'hobbies' ? 'text-brand-brown' : 'text-earth-500'} />
                <span>Hobbies</span>
              </button>

              <button
                onClick={() => selectPersonalTab('gallery')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 ${
                  activePersonalTab === 'gallery'
                    ? 'paper-card bg-[#FAF8F5] text-brand-brown shadow-md transform scale-[1.02]'
                    : 'text-earth-700 hover:text-earth-900'
                }`}
              >
                <Camera size={16} className={activePersonalTab === 'gallery' ? 'text-brand-brown' : 'text-earth-500'} />
                <span>Gallery</span>
              </button>
            </>
          )}
        </div>

      </div>

      {/* TAB CONTENT AREA */}
      <div className="transition-all duration-300">
        {navMode === 'professional' ? (
          // Professional Tab Views
          <>
            {activeProfTab === 'experience' && <ExperienceTimeline lang={lang} />}
            {activeProfTab === 'projects' && <ProjectSlider lang={lang} />}
            {activeProfTab === 'stack' && <TechGrid lang={lang} />}
          </>
        ) : (
          // Personal Tab Views
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
