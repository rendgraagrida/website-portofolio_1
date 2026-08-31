import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $navMode } from '../stores/navigation';

export const DynamicBackground: React.FC = () => {
  const navMode = useStore($navMode);

  useEffect(() => {
    if (navMode === 'personal') {
      document.body.classList.add('paper-lined-popart-mode');
    } else {
      document.body.classList.remove('paper-lined-popart-mode');
    }
  }, [navMode]);

  if (navMode !== 'personal') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700 opacity-100">
      
      {/* 1. Scrapbook Paper Lined Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(235, 94, 85, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(121, 85, 72, 0.10) 1px, transparent 1px)
          `,
          backgroundSize: '100% 28px, 100% 28px',
          backgroundPosition: '40px 0, 0 0'
        }}
      />

      {/* 2. Ben-Day Comic Halftone Dot Matrix Field */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            radial-gradient(circle, #E76F51 2px, transparent 2px),
            radial-gradient(circle, #F4A261 1.5px, transparent 1.5px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      {/* 3. Top-Right Retro Pop Art Comic Sunburst & Panel Collage */}
      <div className="absolute -top-16 -right-16 w-80 h-80 opacity-40 transform rotate-12">
        {/* Comic Radial Sunburst */}
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'repeating-conic-gradient(#F39C12 0deg 15deg, #F1C40F 15deg 30deg, #E67E22 30deg 45deg)',
            maskImage: 'radial-gradient(circle, black 40%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 75%)'
          }}
        />
      </div>

      {/* 4. Left-Side Scrapbook Comic Frame Strips */}
      <div className="absolute top-1/4 -left-12 opacity-35 transform -rotate-6 space-y-4">
        {/* Frame 1: Cyan / Pop Blue Comic Strip */}
        <div className="w-56 h-36 bg-[#2A9D8F]/20 border-3 border-black/30 rounded-2xl shadow-md p-2 flex flex-col justify-between overflow-hidden relative">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E76F51]/60"></span>
            <span className="w-3 h-3 rounded-full bg-[#E9C46A]/60"></span>
          </div>
          <div 
            className="w-full h-16 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, #264653 2px, transparent 2px)',
              backgroundSize: '8px 8px'
            }}
          />
          <span className="text-[10px] font-black text-black/50 uppercase tracking-widest self-end">POP!</span>
        </div>

        {/* Frame 2: Vintage Red Washi Tape */}
        <div className="w-48 h-10 bg-[#E76F51]/30 border-2 border-dashed border-black/20 rounded-lg transform rotate-6 shadow-sm flex items-center justify-center">
          <span className="text-[9px] font-black text-black/40 tracking-widest uppercase">★ SCRAPBOOK ART ★</span>
        </div>
      </div>

      {/* 5. Bottom-Right Pop Art Comic Starburst & Pastel Elements */}
      <div className="absolute bottom-20 -right-8 opacity-35 transform rotate-6">
        <div className="w-64 h-64 bg-[#E9C46A]/25 border-4 border-black/25 rounded-3xl p-4 shadow-lg flex flex-col justify-between relative overflow-hidden">
          {/* Halftone Overlay */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, #D62828 2.5px, transparent 2.5px)',
              backgroundSize: '12px 12px'
            }}
          />
          <div className="relative z-10 text-[11px] font-black text-black/60 uppercase tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full inline-block self-start shadow-sm border border-black/20">
            POW! #2026
          </div>
          <div className="relative z-10 self-end text-3xl font-black text-[#D62828]/40">
            ★ ★ ★
          </div>
        </div>
      </div>

      {/* 6. Subtle Floating Pop Art Comic Dots & Speech Bursts */}
      <div className="absolute top-1/2 left-1/4 w-14 h-14 rounded-full bg-[#E76F51]/15 border-2 border-dashed border-[#E76F51]/30 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-3/4 left-1/3 w-10 h-10 rounded-xl bg-[#2A9D8F]/20 border border-[#2A9D8F]/30 rotate-45" />
      <div className="absolute top-20 right-1/3 w-8 h-8 rounded-full bg-[#F4A261]/25" />

    </div>
  );
};
