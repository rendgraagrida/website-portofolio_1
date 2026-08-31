import React, { useRef } from 'react';
import { useStore } from '@nanostores/react';
import { $showPortfolioGen, $showContact, togglePortfolioGen, toggleContact } from '../stores/navigation';
import { $isGlobalEditMode } from '../stores/editMode';
import { $cvUrl, $cvFileName, setCustomCv } from '../stores/cv';
import { Terminal, Sparkles, Send, X, FileDown, UploadCloud } from 'lucide-react';
import { ui } from '../i18n/ui';

interface NavbarProps {
  lang: 'id' | 'en';
}

export const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const t = ui[lang];
  const isPortfolioGenOpen = useStore($showPortfolioGen);
  const isContactOpen = useStore($showContact);
  const isEditMode = useStore($isGlobalEditMode);
  const cvUrl = useStore($cvUrl);
  const cvFileName = useStore($cvFileName);

  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const toggleUrl = lang === 'id' ? '/en/' : '/';

  const handleDownloadCv = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cvUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = cvFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(lang === 'id' ? '/cv' : '/en/cv', '_blank');
    }
  };

  const handleCvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert(lang === 'id' ? 'Mohon unggah file berformat PDF.' : 'Please upload a PDF file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCustomCv(dataUrl, file.name);
      alert(lang === 'id' ? `File CV berhasil diunggah: ${file.name}` : `CV uploaded successfully: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#E6E0D5]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Paper-Embossed Clickable Logo/Brand to Toggle Portfolio Generator */}
        <button
          onClick={togglePortfolioGen}
          className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-2xl font-extrabold text-lg transition-all duration-300 select-none focus:outline-none ${
            isPortfolioGenOpen 
              ? 'paper-well text-brand-brown scale-[0.98]' 
              : 'paper-btn text-earth-900 hover:text-brand-brown'
          }`}
          title={lang === 'id' ? 'Klik untuk Buka / Tutup Portofolio Generator' : 'Click to Toggle Portfolio Generator'}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 ${
            isPortfolioGenOpen 
              ? 'bg-brand-brown text-white shadow-inner' 
              : 'bg-[#ECE7DF] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] text-brand-brown group-hover:scale-105'
          }`}>
            <Terminal size={17} />
          </div>
          <span>
            Rendgra.<span className="text-brand-brown">Dev</span>
          </span>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full transition-all duration-300 hidden sm:inline-flex items-center gap-1 ${
            isPortfolioGenOpen
              ? 'bg-brand-brown text-white'
              : 'bg-[#ECE7DF] text-earth-700 shadow-inner'
          }`}>
            <Sparkles size={10} />
            <span>{isPortfolioGenOpen ? (lang === 'id' ? 'Tutup' : 'Close') : 'Gen'}</span>
          </span>
        </button>

        {/* Right Actions: Download CV + Hubungi Saya + Language Switcher */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Download CV Bar (Positioned with / under Hubungi Saya) */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleDownloadCv}
              className="paper-btn px-3 md:px-3.5 py-2 rounded-2xl text-xs font-extrabold text-brand-brown hover:text-earth-900 flex items-center gap-1.5 shadow-sm select-none"
              title={lang === 'id' ? 'Unduh Resume / CV (PDF)' : 'Download Resume / CV (PDF)'}
            >
              <FileDown size={14} />
              <span>{lang === 'id' ? 'Unduh CV' : 'Download CV'}</span>
            </button>

            {/* Upload CV button in Edit Mode */}
            {isEditMode && (
              <>
                <button
                  onClick={() => cvFileInputRef.current?.click()}
                  className="paper-btn p-2 rounded-xl text-xs font-bold text-brand-brown hover:text-earth-900 shadow-sm"
                  title="Upload CV PDF Baru"
                >
                  <UploadCloud size={13} />
                </button>
                <input
                  type="file"
                  ref={cvFileInputRef}
                  onChange={handleCvFileUpload}
                  accept=".pdf,application/pdf"
                  className="hidden"
                />
              </>
            )}
          </div>

          {/* Hubungi Saya Toggle Button */}
          <button
            onClick={toggleContact}
            className={`px-3.5 md:px-4 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 focus:outline-none select-none ${
              isContactOpen
                ? 'paper-well text-brand-brown font-extrabold scale-[0.98]'
                : 'paper-btn text-earth-900 hover:text-brand-brown'
            }`}
            title={lang === 'id' ? 'Klik untuk Buka / Tutup Form Kontak' : 'Click to Toggle Contact Form'}
          >
            {isContactOpen ? <X size={15} /> : <Send size={15} className="text-brand-brown" />}
            <span className="hidden sm:inline">{isContactOpen ? (lang === 'id' ? 'Tutup Kontak' : 'Close Contact') : t['nav.contact']}</span>
          </button>

          {/* Paper Language Toggle */}
          <a
            href={toggleUrl}
            className="flex items-center px-2.5 md:px-3 py-1.5 paper-btn rounded-xl text-xs font-extrabold select-none text-earth-700 hover:text-brand-brown"
          >
            <span className={lang === 'id' ? 'text-brand-brown font-black' : 'text-earth-400'}>ID</span>
            <span className="mx-1 text-earth-300">|</span>
            <span className={lang === 'en' ? 'text-brand-brown font-black' : 'text-earth-400'}>EN</span>
          </a>

        </div>

      </div>
    </header>
  );
};
