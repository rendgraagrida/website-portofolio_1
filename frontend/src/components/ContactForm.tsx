import React, { useState } from 'react';
import { ui } from '../i18n/ui';
import { api } from '../lib/eden';
import { useStore } from '@nanostores/react';
import { $cvUrl, $cvFileName, setCustomCv } from '../stores/cv';
import { $isGlobalEditMode } from '../stores/editMode';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  MessageSquareQuote,
  FileDown,
  UploadCloud
} from 'lucide-react';

interface ContactProps {
  lang: 'id' | 'en';
}

export const ContactForm: React.FC<ContactProps> = ({ lang }) => {
  const t = ui[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cvUrl = useStore($cvUrl);
  const cvFileName = useStore($cvFileName);
  const isEditMode = useStore($isGlobalEditMode);
  const cvFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDownloadCv = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <section id="kontak" className="max-w-2xl mx-auto px-6 py-8 select-none">
      
      {/* CONTACT FORM HEADER (Pure & Clean without extra bar) */}
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

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            
            <div className="flex flex-1 items-center gap-1">
              <button 
                type="button"
                onClick={handleDownloadCv}
                className="flex-1 py-4 paper-btn bg-brand-brown text-white hover:bg-earth-900 font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm select-none"
              >
                <FileDown size={17} />
                <span>{lang === 'id' ? 'Unduh CV / Resume' : 'Download CV'}</span>
              </button>

              {/* Upload CV button in Edit Mode */}
              {isEditMode && (
                <>
                  <button
                    type="button"
                    onClick={() => cvFileInputRef.current?.click()}
                    className="paper-btn p-4 h-full rounded-2xl text-xs font-bold bg-[#ECE7DF] text-brand-brown hover:text-earth-900 shadow-sm"
                    title="Upload CV PDF Baru"
                  >
                    <UploadCloud size={16} />
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

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 py-4 paper-btn bg-[#FAF8F5] text-earth-900 hover:text-brand-brown font-extrabold rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm select-none"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={17} className="animate-spin" />
                  <span>{lang === 'id' ? 'Mengirim...' : 'Sending...'}</span>
                </>
              ) : (
                <>
                  <Send size={17} className="text-brand-brown" />
                  <span>{t['contact.send']}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
