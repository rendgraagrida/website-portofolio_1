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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700 opacity-100 bg-[#F8ECD2]">
      
      {/* 1. Full Vintage Paper Base Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9EED5] via-[#F6E6C7] to-[#F3DEC0] opacity-90" />

      {/* 2. Authentic Scrapbook Ruled Notebook Lines (Red Margin + Cyan Lines) */}
      <div 
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(230, 57, 70, 0.35) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(74, 144, 226, 0.22) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '100% 32px, 100% 32px',
          backgroundPosition: '60px 0, 0 0'
        }}
      />

      {/* 3. Ben-Day Comic Halftone Dot Matrix Field */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle, #E63946 2.5px, transparent 2.5px),
            radial-gradient(circle, #457B9D 2px, transparent 2px)
          `,
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px'
        }}
      />

      {/* 4. TOP-RIGHT: Comic Sunburst & Pop Art Color Block Panel */}
      <div className="absolute -top-12 -right-12 w-96 h-96 opacity-60 transform rotate-12">
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: 'repeating-conic-gradient(#F4A261 0deg 15deg, #E76F51 15deg 30deg, #E9C46A 30deg 45deg, #2A9D8F 45deg 60deg)',
            maskImage: 'radial-gradient(circle, black 45%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 80%)'
          }}
        />
      </div>

      {/* 5. LEFT-SIDE: Retro Pop Comic Scrapbook Collage Panels */}
      <div className="absolute top-1/4 -left-10 opacity-60 transform -rotate-6 space-y-6">
        {/* Cyan Pop Strip with Comic Dots */}
        <div className="w-64 h-40 bg-[#00B4D8]/25 border-4 border-black/40 rounded-2xl shadow-xl p-3 flex flex-col justify-between overflow-hidden relative backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-black uppercase tracking-wider bg-[#FFD166] px-2 py-0.5 rounded shadow-sm border border-black/30">
              RETRO POP #1
            </span>
            <div className="flex gap-1">
              <span className="w-3 h-3 rounded-full bg-[#EF476F]"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFD166]"></span>
              <span className="w-3 h-3 rounded-full bg-[#06D6A0]"></span>
            </div>
          </div>
          
          <div 
            className="w-full h-16 opacity-50 my-1"
            style={{
              backgroundImage: 'radial-gradient(circle, #118AB2 2px, transparent 2px)',
              backgroundSize: '10px 10px'
            }}
          />

          <span className="text-sm font-black text-black/70 tracking-widest self-end">WOW!</span>
        </div>

        {/* Washi Tape Scrapbook Bar */}
        <div className="w-56 h-10 bg-[#EF476F]/35 border-2 border-dashed border-black/40 rounded-lg transform rotate-3 shadow-md flex items-center justify-center">
          <span className="text-[10px] font-black text-black/70 tracking-widest uppercase">★ SCRAPBOOK ART ★</span>
        </div>
      </div>

      {/* 6. BOTTOM-RIGHT: Retro Comic Starburst & Pop Art Color Frame */}
      <div className="absolute bottom-16 -right-10 opacity-55 transform rotate-6">
        <div className="w-72 h-72 bg-[#FFD166]/35 border-4 border-black/35 rounded-3xl p-5 shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-xs">
          {/* Halftone Pattern */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, #D90429 3px, transparent 3px)',
              backgroundSize: '14px 14px'
            }}
          />
          <div className="relative z-10 text-xs font-black text-black uppercase tracking-wider bg-white/90 px-3 py-1 rounded-full inline-block self-start shadow-md border-2 border-black/40">
            KAPOW! #2026
          </div>
          <div className="relative z-10 self-end text-4xl font-black text-[#D90429]/60">
            ★ ★ ★
          </div>
        </div>
      </div>

      {/* 7. Floating Retro Comic Geometric Shapes */}
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-[#EF476F]/25 border-3 border-black/30 animate-pulse shadow-md" style={{ animationDuration: '5s' }} />
      <div className="absolute top-2/3 left-1/4 w-12 h-12 rounded-xl bg-[#06D6A0]/30 border-2 border-black/30 rotate-12 shadow-sm" />
      <div className="absolute top-20 left-1/3 w-8 h-8 rounded-full bg-[#FFD166]/40" />

    </div>
  );
};
