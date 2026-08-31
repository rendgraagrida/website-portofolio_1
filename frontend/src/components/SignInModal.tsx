import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { 
  $showSignInModal, 
  closeSignInModal, 
  signIn, 
  OWNER_EMAIL 
} from '../stores/auth';
import { 
  X, 
  LogIn, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  UserCheck,
  KeyRound
} from 'lucide-react';

interface SignInModalProps {
  lang: 'id' | 'en';
}

export const SignInModal: React.FC<SignInModalProps> = ({ lang }) => {
  const showModal = useStore($showSignInModal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    signIn(email.trim());
  };

  const handleQuickOwnerSignIn = () => {
    signIn(OWNER_EMAIL, 'Rendgra Agrida');
  };

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="paper-card rounded-3xl max-w-md w-full overflow-hidden shadow-2xl bg-[#FAF8F5] border border-white/90 animate-fade-in">
        
        {/* Header */}
        <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-sm md:text-base">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
              <LogIn size={16} />
            </div>
            <span>{lang === 'id' ? 'Masuk ke Akun Portofolio' : 'Sign In to Portfolio'}</span>
          </div>

          <button
            onClick={closeSignInModal}
            className="paper-btn w-8 h-8 rounded-xl flex items-center justify-center text-earth-700 hover:text-brand-brown focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Quick Owner One-Click Sign In */}
          <div className="paper-well p-4 rounded-2xl border border-[#E6E0D5] text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-brand-brown uppercase tracking-wider mb-1">
              <ShieldCheck size={14} />
              <span>{lang === 'id' ? 'Akses Khusus Pemilik (Owner)' : 'Owner Direct Access'}</span>
            </div>
            <p className="text-xs text-earth-700 mb-3">
              {lang === 'id' 
                ? 'Buka akses penuh mode edit profil dan manajemen stiker galeri.'
                : 'Unlock full editing permissions for profile and gallery stickers.'}
            </p>
            <button
              onClick={handleQuickOwnerSignIn}
              className="w-full bg-brand-brown hover:bg-earth-900 text-white py-2.5 px-4 rounded-xl text-xs font-extrabold shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <UserCheck size={14} />
              <span>Masuk sebagai {OWNER_EMAIL}</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#ECE7DF] w-full" />
            <span className="bg-[#FAF8F5] px-3 text-[11px] font-bold text-earth-600 uppercase tracking-widest absolute">
              {lang === 'id' ? 'atau email lain' : 'or another email'}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-earth-900 mb-1.5">
                {lang === 'id' ? 'Alamat Email' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="contoh@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="paper-well w-full py-2.5 pl-9 pr-3 rounded-xl text-xs text-earth-900 placeholder:text-earth-500 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                />
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-600" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-earth-900 mb-1.5">
                {lang === 'id' ? 'Kata Sandi (Opsional)' : 'Password (Optional)'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="paper-well w-full py-2.5 pl-9 pr-3 rounded-xl text-xs text-earth-900 placeholder:text-earth-500 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                />
                <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-600" />
              </div>
            </div>

            <button
              type="submit"
              className="paper-btn w-full py-2.5 px-4 rounded-xl text-xs font-extrabold text-earth-900 hover:text-brand-brown transition-all"
            >
              {lang === 'id' ? 'Masuk' : 'Sign In'}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
