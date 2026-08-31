import React from 'react';
import { ui } from '../i18n/ui';

// Props standar untuk UI yang menerima konfigurasi bahasa
export interface ComponentProps {
  lang: 'id' | 'en';
  // Tambahkan props tambahan di bawah ini
}

export const StandardComponent: React.FC<ComponentProps> = ({ lang }) => {
  const t = ui[lang];

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-earth-100">
      <h2 className="text-2xl font-bold text-tuku-dark mb-4">
        {/* Gunakan t['kunci.translasi'] */}
        Placeholder Title
      </h2>
      <p className="text-earth-800 leading-relaxed">
        Placeholder description.
      </p>
    </div>
  );
};
