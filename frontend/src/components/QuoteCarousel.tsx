import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface QuoteCarouselProps {
  lang: 'id' | 'en';
}

const quotes = [
  {
    en: "The only way to do great work is to love what you do.",
    id: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah dengan mencintai apa yang Anda lakukan.",
    author: "Steve Jobs"
  },
  {
    en: "Innovation distinguishes between a leader and a follower.",
    id: "Inovasi membedakan antara seorang pemimpin dan pengikut.",
    author: "Steve Jobs"
  },
  {
    en: "Strive not to be a success, but rather to be of value.",
    id: "Berusahalah bukan untuk menjadi sukses, melainkan untuk menjadi bernilai.",
    author: "Albert Einstein"
  },
  {
    en: "I have not failed. I've just found 10,000 ways that won't work.",
    id: "Saya belum gagal. Saya baru saja menemukan 10.000 cara yang tidak akan berhasil.",
    author: "Thomas A. Edison"
  },
  {
    en: "The best way to predict the future is to create it.",
    id: "Cara terbaik untuk memprediksi masa depan adalah dengan menciptakannya.",
    author: "Peter Drucker"
  }
];

export const QuoteCarousel: React.FC<QuoteCarouselProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setFade(true); 
      }, 500); 
      
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="flex items-center overflow-hidden animate-fade-in select-none max-w-full pb-2">
      <div className="flex items-center bg-[#FF007F] border-2 border-black shadow-[4px_4px_0px_0px_#000] px-4 py-2 md:px-6 md:py-3 rounded-2xl rounded-bl-none md:rounded-3xl md:rounded-bl-none">
        <div className="flex items-center gap-2 md:gap-4 transition-opacity duration-500 ease-in-out" style={{ opacity: fade ? 1 : 0 }}>
          <Quote size={20} className="text-white flex-shrink-0" />
          <p className="font-comic text-sm md:text-base font-black text-white leading-snug tracking-wide">
            "{currentQuote[lang]}"
          </p>
          <span className="hidden sm:inline-block bg-white text-black px-2.5 py-1 font-sans font-bold text-[10px] md:text-xs uppercase tracking-widest flex-shrink-0">
            {currentQuote.author}
          </span>
        </div>
      </div>
    </div>
  );
};
