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

  return null;
};
