import React from 'react';
import { ui } from '../i18n/ui';
import { personalProfile } from '../data/resume';
import { FileText, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface HeroProps {
  lang: 'id' | 'en';
}

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const JobstreetIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = ui[lang];
  const cvPath = lang === 'en' ? '/en/cv' : '/cv';

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 md:py-32 flex flex-col items-start">
      
      {/* Top Greeting Badge & Social Links */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="inline-block py-1.5 px-4 rounded-full bg-tuku-cream text-tuku-brown text-sm font-bold border border-tuku-brown/20 shadow-sm">
          {t['hero.greeting']}
        </span>

        <div className="flex items-center gap-2 ml-1">
          <a 
            href={personalProfile.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white hover:bg-tuku-brown hover:text-white text-earth-700 border border-earth-200 rounded-full transition-all shadow-sm"
            title="LinkedIn Profile"
          >
            <LinkedinIcon size={16} />
          </a>
          <a 
            href={personalProfile.socials.jobstreet} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white hover:bg-tuku-brown hover:text-white text-earth-700 border border-earth-200 rounded-full transition-all shadow-sm"
            title="JobStreet Profile"
          >
            <JobstreetIcon size={16} />
          </a>
          <a 
            href={personalProfile.socials.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white hover:bg-tuku-brown hover:text-white text-earth-700 border border-earth-200 rounded-full transition-all shadow-sm"
            title="GitHub Profile"
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-tuku-dark leading-tight mb-6 tracking-tight">
        {t['hero.title']} <br className="hidden md:block" />
        <span className="text-tuku-brown">{t['hero.titleHighlight']}</span>
      </h1>

      <p className="text-lg md:text-xl text-earth-800 max-w-2xl leading-relaxed mb-10">
        {t['hero.desc']}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <a 
          href="#proyek" 
          className="inline-flex items-center gap-2 bg-tuku-brown hover:bg-tuku-dark text-earth-100 font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <span>{t['hero.cta']}</span>
          <ArrowRight size={18} />
        </a>

        <a 
          href={cvPath}
          className="inline-flex items-center gap-2 bg-white hover:bg-earth-50 text-tuku-dark border-2 border-earth-300 font-bold py-3.5 px-6 rounded-xl shadow-sm hover:shadow transition-all"
        >
          <FileText size={18} className="text-tuku-brown" />
          <span>{t['hero.downloadCv']}</span>
        </a>

        <a 
          href="#cover-letter"
          className="inline-flex items-center gap-2 bg-tuku-cream hover:bg-earth-200 text-tuku-brown border border-tuku-brown/20 font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all"
        >
          <Sparkles size={18} />
          <span>{t['hero.generateLetter']}</span>
        </a>
      </div>

    </section>
  );
};
