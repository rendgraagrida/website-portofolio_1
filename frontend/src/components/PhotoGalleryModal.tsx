import React from 'react';
import { useStore } from '@nanostores/react';
import { $showGallery, toggleGallery } from '../stores/navigation';
import { personalProfile } from '../data/resume';
import { X, Camera, Award, MapPin, Briefcase, Sparkles, ShieldCheck } from 'lucide-react';

interface PhotoGalleryModalProps {
  lang: 'id' | 'en';
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ lang }) => {
  const showGallery = useStore($showGallery);

  if (!showGallery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
      <div className="paper-card rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fade-in max-h-[90vh] flex flex-col">
        
        {/* Header with Close */}
        <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-base">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
              <Camera size={16} />
            </div>
            <span>{lang === 'id' ? 'Galeri Profil & Rekam Jejak' : 'Profile Gallery & Career Showcase'}</span>
          </div>

          <button
            onClick={toggleGallery}
            className="paper-btn w-8 h-8 rounded-xl flex items-center justify-center text-earth-700 hover:text-brand-brown focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* Main Profile Highlight Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-6 rounded-3xl border border-[#ECE7DF] shadow-sm">
            
            {/* Profile Image with Paper Frame */}
            <div className="relative group flex-shrink-0">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden paper-card p-1.5 bg-[#FAF8F5]">
                <img 
                  src="/profile.png" 
                  alt={personalProfile.name} 
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to stylized initial avatar if image path fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-brand-brown text-white p-1.5 rounded-xl shadow-md">
                <Sparkles size={14} />
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-brown mb-1">
                {personalProfile.title[lang]}
              </span>
              <h3 className="text-2xl font-black text-earth-900 tracking-tight mb-2">
                {personalProfile.name}
              </h3>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-earth-700 font-medium mb-3">
                <span className="inline-flex items-center gap-1 bg-[#ECE7DF] px-2.5 py-1 rounded-full shadow-inner">
                  <MapPin size={12} className="text-brand-brown" />
                  <span>{personalProfile.location}</span>
                </span>
                <span className="inline-flex items-center gap-1 bg-[#ECE7DF] px-2.5 py-1 rounded-full shadow-inner">
                  <Briefcase size={12} className="text-brand-brown" />
                  <span>8+ Years Exp</span>
                </span>
              </div>

              <p className="text-xs md:text-sm text-earth-800 leading-relaxed">
                {lang === 'id' 
                  ? 'Berfokus pada rekayasa keandalan sistem telekomunikasi, otomatisasi data pipeline, tuning database Oracle, dan kepemimpinan teknis enterprise.'
                  : 'Specializing in enterprise telecom system reliability, data automation pipelines, high-throughput Oracle tuning, and technical leadership.'}
              </p>
            </div>

          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="paper-card p-4 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl paper-well flex items-center justify-center text-brand-brown flex-shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-earth-900 mb-0.5">
                  {lang === 'id' ? '8+ Tahun di Telkomsigma' : '8+ Years at Telkomsigma'}
                </h4>
                <p className="text-xs text-earth-700 leading-relaxed">
                  {lang === 'id' 
                    ? 'Memimpin manajemen operasional database Siebel CRM & Oracle enterprise skala nasional.'
                    : 'Led national-scale Siebel CRM and Oracle enterprise database administration.'}
                </p>
              </div>
            </div>

            <div className="paper-card p-4 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl paper-well flex items-center justify-center text-emerald-700 flex-shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-earth-900 mb-0.5">
                  {lang === 'id' ? 'Zero Fatal Downtime' : 'Zero Fatal Downtime'}
                </h4>
                <p className="text-xs text-earth-700 leading-relaxed">
                  {lang === 'id' 
                    ? 'Rekam jejak pemeliharaan sistem dengan tingkat ketersediaan tinggi (high availability).'
                    : 'Consistent track record of mission-critical system availability and disaster recovery readiness.'}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#ECE7DF] flex justify-between items-center flex-shrink-0">
          <span className="text-xs font-semibold text-earth-600">
            Rendgra Agrida • Official Profile
          </span>
          <button
            onClick={toggleGallery}
            className="paper-btn px-4 py-1.5 rounded-xl text-xs font-extrabold text-earth-900 hover:text-brand-brown"
          >
            {lang === 'id' ? 'Tutup Galeri' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
