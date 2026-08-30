import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="kontak" className="bg-tuku-dark text-earth-200 py-12 mt-auto">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-tuku-cream mb-2">Mari Ngobrol!</h3>
          <p className="text-earth-200/80 max-w-sm">
            Punya ide menarik atau sekadar ingin menyapa? Jangan sungkan mampir ke "kedai" sosial media saya.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="p-3 bg-earth-800 rounded-full hover:bg-tuku-brown transition-colors">
            <span className="sr-only">GitHub</span>
            GH
          </a>
          <a href="#" className="p-3 bg-earth-800 rounded-full hover:bg-tuku-brown transition-colors">
            <span className="sr-only">LinkedIn</span>
            IN
          </a>
          <a href="#" className="p-3 bg-earth-800 rounded-full hover:bg-tuku-brown transition-colors">
            <span className="sr-only">Email</span>
            @
          </a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-12 pt-8 border-t border-earth-800 text-center text-sm text-earth-500">
        &copy; {new Date().getFullYear()} Dibuat dengan cinta dan kopi Tuku.
      </div>
    </footer>
  );
};
