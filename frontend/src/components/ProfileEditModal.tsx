import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { 
  $showProfileEditModal, 
  closeProfileEditModal, 
  $isOwner 
} from '../stores/auth';
import { 
  $profileData, 
  updateProfileData, 
  resetProfileData, 
  type ProfileData 
} from '../stores/profile';
import { 
  X, 
  Edit3, 
  Save, 
  RotateCcw, 
  Check, 
  User, 
  Quote, 
  FileText,
  Sparkles
} from 'lucide-react';

interface ProfileEditModalProps {
  lang: 'id' | 'en';
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ lang }) => {
  const showModal = useStore($showProfileEditModal);
  const isOwner = useStore($isOwner);
  const profile = useStore($profileData);

  const [form, setForm] = useState<ProfileData>(profile);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile, showModal]);

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileData(form);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      closeProfileEditModal();
    }, 800);
  };

  const handleReset = () => {
    if (confirm(lang === 'id' ? 'Kembalikan data profil ke setelan awal?' : 'Reset profile data to defaults?')) {
      resetProfileData();
      closeProfileEditModal();
    }
  };

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="paper-card rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl bg-[#FAF8F5] border border-white/90 animate-fade-in max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-sm md:text-base">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
              <Edit3 size={16} />
            </div>
            <span>{lang === 'id' ? 'Edit Profil & Informasi Utama' : 'Edit Profile & Main Info'}</span>
          </div>

          <button
            onClick={closeProfileEditModal}
            className="paper-btn w-8 h-8 rounded-xl flex items-center justify-center text-earth-700 hover:text-brand-brown focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 overflow-y-auto flex-1">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-extrabold text-earth-900 mb-1.5">
              {lang === 'id' ? 'Nama Lengkap' : 'Full Name'}
            </label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="paper-well w-full py-2 px-3.5 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-1 focus:ring-brand-brown"
            />
          </div>

          {/* Headline Title & Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-earth-900 mb-1.5">
                {lang === 'id' ? 'Judul Utama (Headline)' : 'Main Headline'}
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="paper-well w-full py-2 px-3.5 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-1 focus:ring-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-earth-900 mb-1.5">
                {lang === 'id' ? 'Teks Sorotan (Highlight Cokelat)' : 'Highlight Text'}
              </label>
              <input
                type="text"
                required
                value={form.titleHighlight}
                onChange={(e) => setForm({ ...form, titleHighlight: e.target.value })}
                className="paper-well w-full py-2 px-3.5 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-1 focus:ring-brand-brown"
              />
            </div>
          </div>

          {/* Bio Description */}
          <div>
            <label className="block text-xs font-extrabold text-earth-900 mb-1.5">
              {lang === 'id' ? 'Deskripsi Ringkas (Hero Bio)' : 'Hero Bio Description'}
            </label>
            <textarea
              rows={3}
              required
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className="paper-well w-full py-2 px-3.5 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-1 focus:ring-brand-brown resize-none"
            />
          </div>

          {/* Quote / Philosophy */}
          <div>
            <label className="block text-xs font-extrabold text-earth-900 mb-1.5">
              {lang === 'id' ? 'Kutipan Filosofi Kerja' : 'Work Philosophy Quote'}
            </label>
            <textarea
              rows={2}
              required
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="paper-well w-full py-2 px-3.5 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-1 focus:ring-brand-brown resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#ECE7DF] flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-earth-700 hover:text-brand-brown flex items-center gap-1.5"
            >
              <RotateCcw size={12} />
              <span>{lang === 'id' ? 'Reset Default' : 'Reset Defaults'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeProfileEditModal}
                className="paper-btn px-4 py-2 rounded-xl text-xs font-bold text-earth-800"
              >
                {lang === 'id' ? 'Batal' : 'Cancel'}
              </button>

              <button
                type="submit"
                className="bg-brand-brown hover:bg-earth-900 text-white px-5 py-2 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
              >
                {isSaved ? <Check size={14} /> : <Save size={14} />}
                <span>{isSaved ? (lang === 'id' ? 'Tersimpan! ✅' : 'Saved! ✅') : (lang === 'id' ? 'Simpan Perubahan' : 'Save Changes')}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
