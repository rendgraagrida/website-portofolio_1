import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $navMode } from '../stores/navigation';

export const DynamicBackground: React.FC = () => {
  const navMode = useStore($navMode);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (navMode === 'personal') {
        document.documentElement.setAttribute('data-theme', 'personal');
        document.body.classList.add('paper-lined-popart-mode');
      } else {
        document.documentElement.setAttribute('data-theme', 'professional');
        document.body.classList.remove('paper-lined-popart-mode');
      }
    }
  }, [navMode]);

  if (navMode !== 'personal') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700 opacity-100 bg-[#FFE600]">
      
      {/* 1. Ben-Day Comic Halftone Dots Field */}
      <div 
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: 'radial-gradient(circle, #000000 2.5px, transparent 2.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 2. Comic Sunburst Rays in Corner */}
      <div className="absolute -top-20 -right-20 w-[420px] h-[420px] opacity-40 transform rotate-12">
        <div 
          className="w-full h-full rounded-full border-4 border-black"
          style={{
            background: 'repeating-conic-gradient(#FF007F 0deg 15deg, #00F0FF 15deg 30deg, #FFE600 30deg 45deg)',
            maskImage: 'radial-gradient(circle, black 50%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 85%)'
          }}
        />
      </div>

      {/* 3. Left Neo-Brutalist Comic Box */}
      <div className="absolute top-1/4 -left-8 opacity-40 transform -rotate-6 space-y-4">
        <div className="w-56 h-36 bg-[#00F0FF] border-4 border-black shadow-[6px_6px_0px_0px_#000] p-3 flex flex-col justify-between">
          <div className="flex gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF007F] border-2 border-black"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFE600] border-2 border-black"></span>
          </div>
          <span className="font-comic text-2xl font-black text-black tracking-widest self-end">POP ART!</span>
        </div>
      </div>

      {/* 4. Bottom-Right Neo-Brutalist Starburst Card */}
      <div className="absolute bottom-16 -right-8 opacity-40 transform rotate-6">
        <div className="w-64 h-64 bg-[#FF007F] border-4 border-black shadow-[8px_8px_0px_0px_#000] p-4 flex flex-col justify-between">
          <span className="font-comic text-lg font-black bg-white text-black px-2.5 py-0.5 border-2 border-black inline-block self-start shadow-[3px_3px_0px_0px_#000]">
            KAPOW! #2026
          </span>
          <span className="font-comic text-4xl font-black text-white self-end tracking-wider">
            ★ ★ ★
          </span>
        </div>
      </div>

    </div>
  );
};
