import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { $showGallery, toggleGallery } from '../stores/navigation';
import { processImageToContourSticker, reconstructStickerCollage } from '../utils/stickerProcessor';
import { 
  X, 
  Camera, 
  Heart, 
  Sparkles, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Loader2, 
  Maximize2,
  Layers,
  RefreshCw,
  Check
} from 'lucide-react';

interface PhotoGalleryModalProps {
  lang: 'id' | 'en';
}

export interface ContourStickerItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  tag: string;
  isCustom?: boolean;
}

const DEFAULT_STICKERS: ContourStickerItem[] = [
  {
    id: 'studio',
    title: 'Keluarga Ceria di Studio',
    subtitle: 'Momen penuh tawa dan kehangatan keluarga',
    src: '/gallery/sticker-studio.png',
    tag: 'Family'
  },
  {
    id: 'bromo',
    title: 'Eksplorasi Gunung Bromo',
    subtitle: 'Sunrise dan petualangan alam terbuka',
    src: '/gallery/sticker-bromo.png',
    tag: 'Adventure'
  },
  {
    id: 'supermarket',
    title: 'Supermarket Creative Session',
    subtitle: 'Eksplorasi konsep ruangan pop-art biru',
    src: '/gallery/sticker-supermarket.png',
    tag: 'Creative'
  },
  {
    id: 'profile',
    title: 'Rendgra Agrida',
    subtitle: 'Senior Software Engineer & Tech Lead',
    src: '/gallery/sticker-profile.png',
    tag: 'Tech Lead'
  }
];

const STORAGE_STICKERS_KEY = 'rendgra_gallery_stickers_v2';
const STORAGE_COLLAGE_KEY = 'rendgra_gallery_collage_v2';

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ lang }) => {
  const showGallery = useStore($showGallery);
  const [stickers, setStickers] = useState<ContourStickerItem[]>(DEFAULT_STICKERS);
  const [collageUrl, setCollageUrl] = useState<string>('/gallery/sticker-collage.png');
  const [activeImage, setActiveImage] = useState<ContourStickerItem | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted stickers & custom collage on mount
  useEffect(() => {
    try {
      const savedStickers = localStorage.getItem(STORAGE_STICKERS_KEY);
      if (savedStickers) {
        const parsed = JSON.parse(savedStickers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStickers(parsed);
        }
      }
      const savedCollage = localStorage.getItem(STORAGE_COLLAGE_KEY);
      if (savedCollage) {
        setCollageUrl(savedCollage);
      }
    } catch (e) {
      console.warn('Gagal membaca localStorage stickers:', e);
    }
  }, []);

  const saveStickers = (items: ContourStickerItem[]) => {
    setStickers(items);
    try {
      localStorage.setItem(STORAGE_STICKERS_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Gagal menyimpan localStorage stickers:', e);
    }
  };

  // Reconstruct unified collage from all current stored stickers
  const handleSyncCollage = async (currentItems = stickers) => {
    if (currentItems.length === 0) return;
    setIsSyncing(true);
    try {
      const srcs = currentItems.map((s) => s.src);
      const newCollage = await reconstructStickerCollage(srcs);
      if (newCollage) {
        setCollageUrl(newCollage);
        try {
          localStorage.setItem(STORAGE_COLLAGE_KEY, newCollage);
        } catch (e) {
          console.warn('LocalStorage limit reached for collage, keeping in memory:', e);
        }
        setSyncSuccess(true);
        setTimeout(() => setSyncSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Gagal merekonstruksi kolase:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProgressText(lang === 'id' ? 'Memulai ekstraksi kontur...' : 'Starting contour extraction...');

    try {
      const stickerDataUrl = await processImageToContourSticker(file, (step) => {
        setProgressText(step);
      });

      const newSticker: ContourStickerItem = {
        id: `custom-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, '').slice(0, 30) || (lang === 'id' ? 'Stiker Baru' : 'New Sticker'),
        subtitle: lang === 'id' ? 'Stiker die-cut kontur otomatis' : 'Auto contour die-cut sticker',
        src: stickerDataUrl,
        tag: 'New Sticker',
        isCustom: true
      };

      const updated = [newSticker, ...stickers];
      saveStickers(updated);
      setActiveImage(newSticker);

      // Auto trigger sync collage with the newly added sticker
      handleSyncCollage(updated);
    } catch (err) {
      console.error('Gagal memproses stiker:', err);
      alert(lang === 'id' ? 'Gagal memproses gambar menjadi stiker. Silakan coba gambar lain.' : 'Failed to process image into sticker.');
    } finally {
      setIsProcessing(false);
      setProgressText('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteSticker = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm(lang === 'id' ? 'Apakah Anda yakin ingin menghapus stiker ini dari galeri?' : 'Are you sure you want to delete this sticker?')) {
      const updated = stickers.filter((s) => s.id !== id);
      saveStickers(updated);
      if (activeImage?.id === id) {
        setActiveImage(null);
      }
      // Reconstruct collage after deleting
      handleSyncCollage(updated);
    }
  };

  const handleResetDefaults = () => {
    if (confirm(lang === 'id' ? 'Kembalikan stiker ke koleksi default?' : 'Reset to default sticker presets?')) {
      saveStickers(DEFAULT_STICKERS);
      setCollageUrl('/gallery/sticker-collage.png');
      try {
        localStorage.removeItem(STORAGE_COLLAGE_KEY);
      } catch {}
    }
  };

  if (!showGallery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/55 backdrop-blur-md animate-fade-in">
      <div className="paper-card rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl animate-fade-in max-h-[92vh] flex flex-col">
        
        {/* Header with Title, Sync, Upload & Close */}
        <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-sm md:text-base">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
              <Camera size={16} />
            </div>
            <span>{lang === 'id' ? 'Galeri Stiker Kontur Personil' : 'Personnel Contour Sticker Gallery'}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Sync / Reconstruct Button */}
            <button
              onClick={() => handleSyncCollage()}
              disabled={isSyncing}
              className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-earth-900 hover:text-brand-brown flex items-center gap-1.5 disabled:opacity-50"
              title={lang === 'id' ? 'Sinkronisasi & Rekonstruksi Kolase dari Semua Foto' : 'Sync & Reconstruct Collage'}
            >
              {isSyncing ? (
                <Loader2 size={13} className="animate-spin text-brand-brown" />
              ) : syncSuccess ? (
                <Check size={13} className="text-emerald-700" />
              ) : (
                <RefreshCw size={13} className="text-brand-brown" />
              )}
              <span>
                {isSyncing
                  ? (lang === 'id' ? 'Menyinkronkan...' : 'Syncing...')
                  : syncSuccess
                  ? (lang === 'id' ? 'Tersinkronisasi! ✅' : 'Synced! ✅')
                  : (lang === 'id' ? 'Sync Kolase' : 'Sync Collage')}
              </span>
            </button>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="paper-btn px-3.5 py-1.5 rounded-xl text-xs font-bold text-brand-brown hover:text-earth-900 flex items-center gap-1.5 disabled:opacity-50"
              title={lang === 'id' ? 'Unggah Foto Baru & Potong Kontur Otomatis' : 'Upload & Auto Cutout'}
            >
              {isProcessing ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
              <span>{lang === 'id' ? 'Upload Foto' : 'Upload Photo'}</span>
            </button>

            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*" 
              className="hidden" 
            />

            {/* Close Modal */}
            <button
              onClick={toggleGallery}
              className="paper-btn w-8 h-8 rounded-xl flex items-center justify-center text-earth-700 hover:text-brand-brown focus:outline-none ml-1"
              title="Tutup (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Processing Indicator Banner */}
        {isProcessing && (
          <div className="bg-brand-brown/10 px-6 py-3 border-b border-brand-brown/20 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2.5 text-brand-brown text-xs md:text-sm font-bold">
              <Loader2 size={16} className="animate-spin" />
              <span>{progressText || (lang === 'id' ? 'Sedang memproses pemotongan kontur & garis stiker...' : 'Processing contour & white outline...')}</span>
            </div>
            <span className="text-[11px] font-semibold text-earth-600">AI Background Removal &amp; Dilation</span>
          </div>
        )}

        {/* Scrollable Gallery Area */}
        <div className="p-6 md:p-8 overflow-y-auto bg-[#F4F1EA] space-y-8">
          
          {/* SECTION 1: DYNAMIC RECONSTRUCTED MASTER COLLAGE BANNER */}
          <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full paper-btn text-brand-brown text-xs font-black">
                <Layers size={13} />
                <span>{lang === 'id' ? 'Kolase Bersatu (Dynamic Collage)' : 'Unified Reconstructed Banner'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSyncCollage()}
                  disabled={isSyncing}
                  className="paper-btn px-3 py-1 rounded-xl text-[11px] font-extrabold text-brand-brown flex items-center gap-1.5"
                >
                  <RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />
                  <span>{lang === 'id' ? 'Rekonstruksi Kolase' : 'Reconstruct Collage'}</span>
                </button>
                <span className="text-[11px] font-bold text-earth-600 bg-[#ECE7DF] px-2.5 py-1 rounded-full shadow-inner hidden sm:inline-block">
                  {lang === 'id' ? 'Die-Cut White Outline' : 'Die-Cut White Outline'}
                </span>
              </div>
            </div>

            {/* Wide Master Collage Image */}
            <div 
              onClick={() => setActiveImage({
                id: 'active-collage',
                title: lang === 'id' ? 'Kolase Stiker Bersatu' : 'Unified Sticker Collage',
                subtitle: lang === 'id' ? 'Gabungan seluruh stiker yang tersimpan tanpa latar belakang' : 'All stored stickers merged seamlessly without background',
                src: collageUrl,
                tag: 'Master Banner'
              })}
              className="w-full h-48 sm:h-64 md:h-72 flex items-end justify-center bg-gradient-to-b from-[#EFEBE4]/60 to-[#ECE7DF] rounded-2xl p-4 transition-all duration-300 cursor-pointer group hover:shadow-inner"
            >
              <img
                src={collageUrl}
                alt="Rendgra Agrida & Family Sticker Collage"
                className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-400"
              />
            </div>

            {/* Banner Footer Info */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#ECE7DF]">
              <span className="text-xs font-bold text-earth-800">
                {lang === 'id' 
                  ? `Kolase otomatis disinkronkan dari ${stickers.length} foto stiker yang tersimpan.`
                  : `Collage dynamically synced from all ${stickers.length} stored contour stickers.`}
              </span>
              <button
                onClick={() => setActiveImage({
                  id: 'active-collage',
                  title: lang === 'id' ? 'Kolase Stiker Bersatu' : 'Unified Sticker Collage',
                  subtitle: lang === 'id' ? 'Gabungan seluruh stiker yang tersimpan tanpa latar belakang' : 'All stored stickers merged seamlessly without background',
                  src: collageUrl,
                  tag: 'Master Banner'
                })}
                className="paper-btn px-3 py-1 rounded-xl text-xs font-extrabold text-brand-brown flex items-center gap-1.5"
              >
                <Maximize2 size={12} />
                <span>{lang === 'id' ? 'Lihat Ukuran Penuh' : 'View Full Size'}</span>
              </button>
            </div>
          </div>

          {/* SECTION 2: INDIVIDUAL DIE-CUT CONTOUR STICKERS */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-brand-brown" />
                <h3 className="text-sm md:text-base font-black text-earth-900">
                  {lang === 'id' ? 'Daftar Stiker Tersimpan' : 'Stored Sticker Collection'} ({stickers.length})
                </h3>
              </div>

              {stickers.length !== DEFAULT_STICKERS.length && (
                <button
                  onClick={handleResetDefaults}
                  className="paper-btn px-3 py-1 rounded-xl text-[11px] font-bold text-earth-700 hover:text-brand-brown flex items-center gap-1"
                >
                  <RotateCcw size={11} />
                  <span>{lang === 'id' ? 'Reset Stiker' : 'Reset Defaults'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {stickers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImage(item)}
                  className="paper-card p-4 rounded-3xl flex flex-col items-center text-center cursor-pointer group hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 select-none relative"
                >
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDeleteSticker(item.id, e)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-xl bg-white/90 hover:bg-rose-600 hover:text-white text-earth-600 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all opacity-80 hover:opacity-100 z-10"
                    title={lang === 'id' ? 'Hapus stiker ini' : 'Delete this sticker'}
                  >
                    <Trash2 size={12} />
                  </button>

                  {/* Contour Sticker Container */}
                  <div className="w-full h-40 sm:h-48 flex items-center justify-center p-2 rounded-2xl bg-[#ECE7DF]/50 shadow-inner mb-3 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="font-extrabold text-xs md:text-sm text-earth-900 leading-tight mb-1 group-hover:text-brand-brown transition-colors">
                    {item.title}
                  </h4>

                  <span className="mt-auto text-[10px] font-black uppercase tracking-wider text-brand-brown bg-white px-2.5 py-0.5 rounded-full shadow-sm border border-[#ECE7DF]">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#ECE7DF] flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-earth-600">
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span>Rendgra Agrida • Die-Cut Contour Sticker Collection</span>
          </div>

          <button
            onClick={toggleGallery}
            className="paper-btn px-4 py-1.5 rounded-xl text-xs font-extrabold text-earth-900 hover:text-brand-brown"
          >
            {lang === 'id' ? 'Tutup Galeri' : 'Close'}
          </button>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX PREVIEW */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Lightbox */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white text-white hover:text-black w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              <X size={18} />
            </button>

            {/* High-Resolution Die-Cut Sticker Card */}
            <div className="paper-card p-6 md:p-8 rounded-3xl max-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#F4F1EA]">
              <img 
                src={activeImage.src} 
                alt={activeImage.title} 
                className="max-h-[60vh] max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
              />
              <div className="pt-4 text-center flex items-center gap-4">
                <div>
                  <h4 className="font-extrabold text-lg text-earth-900">{activeImage.title}</h4>
                  <p className="text-xs text-earth-600 mt-0.5">{activeImage.subtitle}</p>
                </div>
                {activeImage.id !== 'active-collage' && (
                  <button
                    onClick={() => handleDeleteSticker(activeImage.id)}
                    className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-600 hover:text-white flex items-center gap-1.5"
                  >
                    <Trash2 size={13} />
                    <span>{lang === 'id' ? 'Hapus Stiker' : 'Delete'}</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
