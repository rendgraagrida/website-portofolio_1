import React from 'react';
import { 
  Mountain, 
  Camera, 
  Coffee, 
  Heart, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface HobbiesViewProps {
  lang: 'id' | 'en';
}

export const HobbiesView: React.FC<HobbiesViewProps> = ({ lang }) => {
  const hobbies = [
    {
      icon: Mountain,
      title: lang === 'id' ? 'Eksplorasi Alam & Pegunungan' : 'Mountain Expeditions & Outdoor',
      location: 'Gunung Bromo, Jawa Timur',
      desc: lang === 'id'
        ? 'Menikmati udara sejuk pegunungan dan panorama matahari terbit. Aktivitas alam terbuka adalah cara terbaik untuk menyegarkan pikiran dan memicu ide-ide segar.'
        : 'Trekking mountain peaks, witnessing sunrises, and exploring national parks to rejuvenate the mind and spark creative clarity.',
      tag: 'Outdoor'
    },
    {
      icon: Camera,
      title: lang === 'id' ? 'Fotografi & Momen Kreatif' : 'Creative Visual Photography',
      location: 'Studio & Urban Exploration',
      desc: lang === 'id'
        ? 'Mengabadikan potret kebersamaan keluarga, konsep visual pop-art, dan estetika warna. Memadukan kepekaan komposisi visual dengan seni penceritaan.'
        : 'Capturing joyful family portraits, pop-art visual concepts, and harmonious color aesthetics through photography.',
      tag: 'Creative'
    },
    {
      icon: Coffee,
      title: lang === 'id' ? 'Kultur Kopi & Diskusi Teknologi' : 'Coffee Culture & Tech Talks',
      location: 'Artisan Coffee Spots',
      desc: lang === 'id'
        ? 'Menikmati seduhan kopi manual sembari membedah tren arsitektur software, open-source tooling, dan bertukar wawasan seputar dunia rekayasa perangkat lunak.'
        : 'Savoring artisan coffee while exploring modern software architecture, open-source innovations, and engineering discussions.',
      tag: 'Lifestyle'
    },
    {
      icon: Heart,
      title: lang === 'id' ? 'Waktu Hangat Bersama Keluarga' : 'Family Quality Time',
      location: 'Home & Travel',
      desc: lang === 'id'
        ? 'Menghabiskan waktu bersama keluarga tercinta, bermain bersama buah hati, dan menjelajahi destinasi baru sebagai sumber energi dan motivasi utama.'
        : 'Cherishing quality family moments, playing with little ones, and discovering new destinations as the ultimate source of energy.',
      tag: 'Family'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Intro Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full paper-btn text-brand-brown text-xs font-black mb-2">
          <Sparkles size={13} />
          <span>{lang === 'id' ? 'Di Luar Baris Kode' : 'Beyond The Code'}</span>
        </span>
        <p className="text-earth-800 text-xs md:text-sm leading-relaxed">
          {lang === 'id'
            ? 'Aktivitas, hobi, dan minat yang menjaga keseimbangan hidup, melatih kepekaan estetika, dan mengisi kembali energi dalam berkarya.'
            : 'Passions, hobbies, and pursuits that nurture life balance, refine aesthetic intuition, and energize engineering endeavors.'}
        </p>
      </div>

      {/* 4 Hobbies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hobbies.map((h, idx) => {
          const Icon = h.icon;
          return (
            <div
              key={idx}
              className="paper-card p-6 rounded-3xl bg-[#FAF8F5] border border-white/90 hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl paper-well flex items-center justify-center text-brand-brown">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-brown bg-white px-2.5 py-1 rounded-full shadow-sm border border-[#ECE7DF]">
                    {h.tag}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-earth-900 leading-snug mb-1">
                  {h.title}
                </h3>

                <p className="text-[11px] text-earth-600 flex items-center gap-1 mb-3 font-medium">
                  <MapPin size={12} className="text-brand-brown" />
                  <span>{h.location}</span>
                </p>

                <p className="text-xs md:text-sm text-earth-800 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
