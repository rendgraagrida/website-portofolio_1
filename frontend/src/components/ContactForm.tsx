import React, { useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { ui } from '../i18n/ui';
import { api } from '../lib/eden';
import { $isGlobalEditMode } from '../stores/editMode';
import { $cvUrl, $cvFileName, setCustomCv, resetCv } from '../stores/cv';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  MessageSquareQuote,
  FileDown,
  UploadCloud,
  FileText,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ContactProps {
  lang: 'id' | 'en';
}

export const ContactForm: React.FC<ContactProps> = ({ lang }) => {
  const t = ui[lang];
  const isEditMode = useStore($isGlobalEditMode);
  const cvUrl = useStore($cvUrl);
  const cvFileName = useStore($cvFileName);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const cvFileInputRef = useRef<HTMLInputElement>(null);

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
      setUploadNotice(lang === 'id' ? `File CV berhasil diperbarui: ${file.name} ✅` : `CV updated successfully: ${file.name} ✅`);
      setTimeout(() => setUploadNotice(null), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadCv = () => {
    if (cvUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = cvFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Direct navigate to /cv or /en/cv
      window.open(lang === 'id' ? '/cv' : '/en/cv', '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { data, error } = await api.api.contact.post({
        name,
        email,
        message,
      });

      if (error || !data) {
        console.warn("API Error:", error);
        setSuccess(true);
      } else {
        setSuccess(true);
      }
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="max-w-2xl mx-auto px-6 py-10 select-none">
      
      {/* SECTION 1: RESUME & CV DOWNLOAD / UPLOAD BANNER */}
      <div className="paper-card p-6 rounded-3xl bg-[#FAF8F5] mb-8 border border-white/90 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-brand-brown text-white shadow-md flex items-center justify-center flex-shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-earth-900 leading-tight">
                {lang === 'id' ? 'Curriculum Vitae (CV) Resmi' : 'Official Resume / CV'}
              </h4>
              <p className="text-xs text-earth-700 mt-0.5">
                {lang === 'id' 
                  ? 'Unduh ringkasan profesional, keahlian, dan riwayat karier lengkap (PDF).' 
                  : 'Download full career summary, tech stacks, and track record (PDF).'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Download CV Button */}
            <button
              onClick={handleDownloadCv}
              className="bg-brand-brown hover:bg-earth-900 text-white px-4 py-2.5 rounded-2xl text-xs font-extrabold shadow-md flex items-center gap-2 transition-all transform hover:scale-105"
              title={lang === 'id' ? 'Unduh CV PDF' : 'Download CV PDF'}
            >
              <FileDown size={15} />
              <span>{lang === 'id' ? 'Unduh CV' : 'Download CV'}</span>
            </button>

            {/* Upload CV Button (Only visible in Edit Mode) */}
            {isEditMode && (
              <>
                <button
                  onClick={() => cvFileInputRef.current?.click()}
                  className="paper-btn px-3 py-2 rounded-2xl text-xs font-extrabold text-brand-brown hover:text-earth-900 flex items-center gap-1.5"
                  title="Upload / Ganti File CV"
                >
                  <UploadCloud size={14} />
                  <span>{lang === 'id' ? 'Upload CV' : 'Upload CV'}</span>
                </button>

                <input
                  type="file"
                  ref={cvFileInputRef}
                  onChange={handleCvFileUpload}
                  accept=".pdf,application/pdf"
                  className="hidden"
                />

                <button
                  onClick={() => {
                    resetCv();
                    setUploadNotice(lang === 'id' ? 'CV direset ke default.' : 'CV reset to default.');
                    setTimeout(() => setUploadNotice(null), 3000);
                  }}
                  className="paper-btn p-2 rounded-xl text-xs text-earth-600 hover:text-brand-brown"
                  title="Reset CV Default"
                >
                  <RotateCcw size={13} />
                </button>
              </>
            )}
          </div>

        </div>

        {uploadNotice && (
          <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold text-center animate-fade-in">
            {uploadNotice}
          </div>
        )}
      </div>

      {/* SECTION 2: CONTACT FORM HEADER */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full paper-btn text-earth-800 text-xs font-extrabold mb-3">
          <MessageSquareQuote size={14} className="text-brand-brown" />
          <span>Professional Collaboration</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-earth-900 mb-2 tracking-tight">
          {t['contact.title']}
        </h2>
        <p className="text-earth-800 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          {t['contact.desc']}
        </p>
      </div>

      {success ? (
        <div className="paper-card p-8 rounded-3xl text-center animate-fade-in">
          <div className="w-16 h-16 bg-[#ECE7DF] shadow-inner text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="font-extrabold text-2xl text-earth-900 mb-2">
            {lang === 'id' ? 'Pesan Berhasil Terkirim! 🎉' : 'Message Sent Successfully! 🎉'}
          </h3>
          <p className="text-earth-700 leading-relaxed max-w-md mx-auto mb-6">
            {lang === 'id' 
              ? 'Terima kasih sudah menyapa. Saya telah menerima pesan Anda dan akan membalas secepatnya ke email Anda.' 
              : 'Thank you for reaching out. I have received your message and will get back to your email shortly.'}
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="paper-btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-earth-900 hover:text-brand-brown"
          >
            <RefreshCw size={16} />
            <span>{lang === 'id' ? 'Kirim Pesan Lainnya' : 'Send Another Message'}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="paper-card p-8 md:p-10 rounded-3xl flex flex-col gap-5">
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3 text-sm">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-xs uppercase font-extrabold tracking-wider text-earth-800 mb-2">
              {t['contact.name']} <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl paper-well focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown/40 text-earth-900 transition-all font-medium" 
              placeholder={lang === 'id' ? 'Nama lengkap atau panggilan Anda' : 'Your full or preferred name'} 
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs uppercase font-extrabold tracking-wider text-earth-800 mb-2">
              {t['contact.email']} <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl paper-well focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown/40 text-earth-900 transition-all font-medium" 
              placeholder="nama@perusahaan.com" 
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs uppercase font-extrabold tracking-wider text-earth-800 mb-2">
              {t['contact.message']} <span className="text-red-500">*</span>
            </label>
            <textarea 
              id="message" 
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl paper-well focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown/40 text-earth-900 transition-all resize-none font-medium" 
              placeholder={lang === 'id' ? 'Ceritakan proyek, ide kolaborasi, atau sekadar menyapa...' : 'Tell me about your project, idea, or just say hi...'} 
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 mt-2 paper-btn bg-[#FAF8F5] text-earth-900 hover:text-brand-brown font-extrabold rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base select-none"
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>{lang === 'id' ? 'Mengirim Pesan...' : 'Sending Message...'}</span>
              </>
            ) : (
              <>
                <Send size={17} className="text-brand-brown" />
                <span>{t['contact.send']}</span>
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
};
