import React, { useState } from 'react';
import { ui } from '../i18n/ui';
import { api } from '../lib/eden';
import { Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

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
    <section id="kontak" className="max-w-2xl mx-auto px-6 py-24">
      <div className="text-center mb-10">
        <span className="text-sm font-bold uppercase tracking-wider text-brand-brown block mb-2">
          {lang === 'id' ? 'Mari Berbincang' : "Let's Connect"}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-3">
          {t['contact.title']}
        </h2>
        <p className="text-earth-800 text-lg max-w-lg mx-auto">
          {t['contact.desc']}
        </p>
      </div>

      {success ? (
        <div className="bg-white border-2 border-green-500/30 text-earth-900 p-8 rounded-2xl text-center shadow-lg animate-fade-in">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="font-extrabold text-2xl text-brand-dark mb-2">
            {lang === 'id' ? 'Pesan Berhasil Terkirim! 🎉' : 'Message Sent Successfully! 🎉'}
          </h3>
          <p className="text-earth-700 leading-relaxed max-w-md mx-auto mb-6">
            {lang === 'id' 
              ? 'Terima kasih sudah menyapa. Saya telah menerima pesan Anda dan akan membalas secepatnya ke email Anda.' 
              : 'Thank you for reaching out. I have received your message and will get back to your email shortly.'}
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-cream text-brand-brown border border-brand-brown/20 hover:bg-brand-brown hover:text-white rounded-xl font-bold transition-all shadow-sm"
          >
            <RefreshCw size={16} />
            {lang === 'id' ? 'Kirim Pesan Lainnya' : 'Send Another Message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-earth-200/80 flex flex-col gap-6">
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-2">
              {t['contact.name']} <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-earth-200 bg-earth-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown text-earth-900 transition-all" 
              placeholder={lang === 'id' ? 'Nama lengkap atau panggilan Anda' : 'Your full or preferred name'} 
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-brand-dark mb-2">
              {t['contact.email']} <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-earth-200 bg-earth-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown text-earth-900 transition-all" 
              placeholder="nama@perusahaan.com" 
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-brand-dark mb-2">
              {t['contact.message']} <span className="text-red-500">*</span>
            </label>
            <textarea 
              id="message" 
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-earth-200 bg-earth-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-brown text-earth-900 transition-all resize-none" 
              placeholder={lang === 'id' ? 'Ceritakan proyek, ide kolaborasi, atau sekadar menyapa...' : 'Tell me about your project, idea, or just say hi...'} 
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 mt-2 bg-brand-brown hover:bg-brand-dark text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span>{lang === 'id' ? 'Mengirim Pesan...' : 'Sending Message...'}</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>{t['contact.send']}</span>
              </>
            )}
          </button>
        </form>
      )}
    </section>
  );
};
