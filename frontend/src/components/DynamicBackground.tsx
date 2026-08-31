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
      
      {/* 1. Lined Paper Journal Background Lines */}
      <div 
        className="absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(217, 83, 79, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(121, 85, 72, 0.09) 1px, transparent 1px)
          `,
          backgroundSize: '100% 32px, 100% 32px',
          backgroundPosition: '50px 0, 0 0'
        }}
      />

      {/* 2. Soft Pop-Art Halftone Dot Field */}
      <div 
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(121, 85, 72, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* 3. Warm Pop-Art Geometric Paper Shapes (Warm Mustard, Terracotta, Coral, Olive) */}
      {/* Shape 1: Top Right Mustard Sun Wheel */}
      <div 
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full border-8 border-dashed border-[#E5A93C]/25 bg-[#F9E2AF]/20 blur-[1px] transform rotate-12 animate-pulse" 
        style={{ animationDuration: '8s' }}
      />

      {/* Shape 2: Middle Left Terracotta Paper Pill */}
      <div 
        className="absolute top-1/3 -left-16 w-52 h-28 rounded-full bg-[#E07A5F]/15 border-2 border-dashed border-[#E07A5F]/30 -rotate-12 transform"
      />

      {/* Shape 3: Bottom Right Coral Star Burst */}
      <div 
        className="absolute bottom-24 -right-10 w-72 h-72 rounded-3xl bg-[#DDA15E]/15 border-4 border-white/60 rotate-45 transform shadow-sm"
      />

      {/* Shape 4: Floating Soft Pop Dots */}
      <div className="absolute top-2/3 left-10 w-16 h-16 rounded-full bg-[#BC6C25]/15 border border-[#BC6C25]/30"></div>
      <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full bg-[#E76F51]/20"></div>
      <div className="absolute bottom-1/3 left-1/3 w-12 h-12 rounded-2xl bg-[#606C38]/15 rotate-12"></div>

    </div>
  );
};
