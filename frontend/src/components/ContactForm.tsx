import React, { useState } from 'react';
import { ui } from '../i18n/ui';

interface ContactProps {
  lang: 'id' | 'en';
}

export const ContactForm: React.FC<ContactProps> = ({ lang }) => {
  const t = ui[lang];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Hubungkan dengan Elysia API Eden di Milestone 3
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <section className="max-w-xl mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-tuku-dark mb-2">{t['contact.title']}</h2>
        <p className="text-earth-800">{t['contact.desc']}</p>
      </div>

      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-xl text-center">
          <p className="font-bold text-lg mb-2">
            {lang === 'id' ? 'Pesan Terkirim! 🎉' : 'Message Sent! 🎉'}
          </p>
          <p>
            {lang === 'id' ? 'Terima kasih sudah menyapa, saya akan membalas secepatnya.' : 'Thank you for reaching out, I will reply as soon as possible.'}
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="mt-6 text-sm text-tuku-brown hover:underline font-semibold"
          >
            {lang === 'id' ? 'Kirim pesan lagi' : 'Send another message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-tuku-cream p-8 rounded-xl shadow-sm border border-earth-200 flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-earth-800 mb-1">{t['contact.name']}</label>
            <input 
              type="text" 
              id="name" 
              required
              className="w-full px-4 py-3 rounded-lg border border-earth-200 bg-earth-100 focus:outline-none focus:ring-2 focus:ring-tuku-brown text-earth-900" 
              placeholder={lang === 'id' ? 'Tetangga Baru' : 'New Friend'} 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-earth-800 mb-1">{t['contact.email']}</label>
            <input 
              type="email" 
              id="email" 
              required
              className="w-full px-4 py-3 rounded-lg border border-earth-200 bg-earth-100 focus:outline-none focus:ring-2 focus:ring-tuku-brown text-earth-900" 
              placeholder="sapa@tetangga.com" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-bold text-earth-800 mb-1">{t['contact.message']}</label>
            <textarea 
              id="message" 
              rows={4}
              required
              className="w-full px-4 py-3 rounded-lg border border-earth-200 bg-earth-100 focus:outline-none focus:ring-2 focus:ring-tuku-brown text-earth-900 resize-none" 
              placeholder={lang === 'id' ? 'Halo, mari kita...' : 'Hello, let us...'} 
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 mt-2 bg-tuku-brown hover:bg-tuku-dark text-white font-bold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting 
              ? (lang === 'id' ? 'Menyeduh Pesan...' : 'Sending Message...') 
              : t['contact.send']}
          </button>
        </form>
      )}
    </section>
  );
};
