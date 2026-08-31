import React, { useState, useEffect, useRef } from 'react';
import { processImageToContourSticker } from '../utils/stickerProcessor';
import { StickerEditorModal } from './StickerEditorModal';
import { 
  Camera, 
  Sparkles, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Loader2, 
  Hand, 
  RotateCw, 
  Shuffle, 
  Edit3,
  X,
  Maximize2
} from 'lucide-react';

interface EmbeddedGalleryViewProps {
  lang: 'id' | 'en';
}

export interface ContourStickerItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  rawSrc?: string;
  tag: string;
  isCustom?: boolean;
}

interface DraggableStickerState {
  id: string;
  x: number; // percentage (0 - 100)
  y: number; // px from top
  rotation: number; // deg
  zIndex: number;
}

const DEFAULT_STICKERS: ContourStickerItem[] = [
  {
    id: 'studio',
    title: 'Keluarga Ceria di Studio',
    subtitle: 'Momen penuh tawa dan kehangatan keluarga',
    src: '/gallery/sticker-studio.png',
    rawSrc: '/gallery/photo-studio.jpg',
    tag: 'Family'
  },
  {
    id: 'bromo',
    title: 'Eksplorasi Gunung Bromo',
    subtitle: 'Sunrise dan petualangan alam terbuka',
    src: '/gallery/sticker-bromo.png',
    rawSrc: '/gallery/photo-bromo.jpg',
    tag: 'Adventure'
  },
  {
    id: 'supermarket',
    title: 'Supermarket Creative Session',
    subtitle: 'Eksplorasi konsep ruangan pop-art biru',
    src: '/gallery/sticker-supermarket.png',
    rawSrc: '/gallery/photo-supermarket.jpg',
    tag: 'Creative'
  },
  {
    id: 'profile',
    title: 'Rendgra Agrida',
    subtitle: 'Senior Software Engineer & Tech Lead',
    src: '/gallery/sticker-profile.png',
    rawSrc: '/gallery/photo-profile.png',
    tag: 'Tech Lead'
  }
];

const STORAGE_STICKERS_KEY = 'rendgra_gallery_stickers_v5';

export const EmbeddedGalleryView: React.FC<EmbeddedGalleryViewProps> = ({ lang }) => {
  const [stickers, setStickers] = useState<ContourStickerItem[]>(DEFAULT_STICKERS);
  const [activeImage, setActiveImage] = useState<ContourStickerItem | null>(null);
  
  // Interactive Draggable Board State
  const [dragStates, setDragStates] = useState<Record<string, DraggableStickerState>>({});
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Manual Editor Modal State
  const [editingSticker, setEditingSticker] = useState<ContourStickerItem | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize interactive positions across the canvas
  const initDraggablePositions = (items: ContourStickerItem[]) => {
    const states: Record<string, DraggableStickerState> = {};
    const count = items.length;
    items.forEach((item, index) => {
      const step = count > 1 ? 68 / (count - 1) : 0;
      const x = 10 + index * step + (Math.random() * 6 - 3);
      const y = Math.round(15 + Math.random() * 25);
      const rotation = Math.round(Math.random() * 12 - 6);
      states[item.id] = {
        id: item.id,
        x: Math.max(5, Math.min(75, x)),
        y,
        rotation,
        zIndex: index + 1
      };
    });
    setDragStates(states);
    setMaxZIndex(count + 5);
  };

  useEffect(() => {
    try {
      const savedStickers = localStorage.getItem(STORAGE_STICKERS_KEY);
      let currentItems = DEFAULT_STICKERS;
      if (savedStickers) {
        const parsed = JSON.parse(savedStickers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentItems = parsed;
          setStickers(parsed);
        }
      }
      initDraggablePositions(currentItems);
    } catch (e) {
      console.warn('Gagal membaca localStorage stickers:', e);
    }
  }, []);

  const saveStickers = (items: ContourStickerItem[]) => {
    setStickers(items);
    initDraggablePositions(items);
    try {
      localStorage.setItem(STORAGE_STICKERS_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Gagal menyimpan localStorage stickers:', e);
    }
  };

  // SINGLE Sync & Acak Button Handler
  const handleSingleSync = () => {
    if (stickers.length === 0) return;
    setIsSyncing(true);
    const shuffled = [...stickers].sort(() => Math.random() - 0.5);
    initDraggablePositions(shuffled);
    setTimeout(() => setIsSyncing(false), 250);
  };

  // ROTATE INDIVIDUAL PHOTO (Hanya memutar foto yang dipilih!)
  const handleRotateSinglePhoto = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDragStates((prev) => {
      const current = prev[id] || { id, x: 20, y: 20, rotation: 0, zIndex: 1 };
      return {
        ...prev,
        [id]: {
          ...current,
          rotation: (current.rotation + 15) % 360
        }
      };
    });
  };

  // Drag & Drop Handlers for Manual Canvas Manipulation
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    const board = boardRef.current;
    if (!board) return;

    const current = dragStates[id] || { id, x: 20, y: 20, rotation: 0, zIndex: maxZIndex + 1 };
    
    // Bring dragged sticker to front layer
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setDragStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ }
    }));

    setDraggingId(id);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: current.x,
      initY: current.y
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId || !dragStartRef.current || !boardRef.current) return;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    const dxPx = e.clientX - dragStartRef.current.startX;
    const dyPx = e.clientY - dragStartRef.current.startY;

    const dxPercent = (dxPx / boardRect.width) * 100;
    const nextX = Math.max(2, Math.min(80, dragStartRef.current.initX + dxPercent));
    const nextY = Math.max(0, Math.min(180, dragStartRef.current.initY + dyPx));

    setDragStates((prev) => ({
      ...prev,
      [draggingId]: {
        ...prev[draggingId],
        x: nextX,
        y: nextY
      }
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingId) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      setDraggingId(null);
      dragStartRef.current = null;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setProgressText(lang === 'id' ? 'Memotong kontur foto otomatis...' : 'Cutting sticker contour...');

    try {
      const rawUrl = URL.createObjectURL(file);
      const stickerDataUrl = await processImageToContourSticker(file, (step) => {
        setProgressText(step);
      });

      const newSticker: ContourStickerItem = {
        id: `custom-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, '').slice(0, 30) || (lang === 'id' ? 'Stiker Baru' : 'New Sticker'),
        subtitle: lang === 'id' ? 'Stiker die-cut kontur' : 'Auto contour die-cut sticker',
        src: stickerDataUrl,
        rawSrc: rawUrl,
        tag: 'New Sticker',
        isCustom: true
      };

      const updated = [newSticker, ...stickers];
      saveStickers(updated);
    } catch (err) {
      console.error('Gagal memproses stiker:', err);
      alert(lang === 'id' ? 'Gagal memproses gambar menjadi stiker.' : 'Failed to process image into sticker.');
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
    if (confirm(lang === 'id' ? 'Hapus stiker ini dari galeri?' : 'Delete this sticker?')) {
      const updated = stickers.filter((s) => s.id !== id);
      saveStickers(updated);
      if (activeImage?.id === id) {
        setActiveImage(null);
      }
    }
  };

  const handleSaveEditedSticker = (newStickerSrc: string) => {
    if (!editingSticker) return;

    const updated = stickers.map((item) => {
      if (item.id === editingSticker.id) {
        return {
          ...item,
          src: newStickerSrc
        };
      }
      return item;
    });

    saveStickers(updated);
    setEditingSticker(null);
  };

  const handleResetDefaults = () => {
    if (confirm(lang === 'id' ? 'Kembalikan stiker ke koleksi default?' : 'Reset to default sticker presets?')) {
      saveStickers(DEFAULT_STICKERS);
      try {
        localStorage.removeItem(STORAGE_STICKERS_KEY);
      } catch {}
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* SECTION 1: MASTER CANVAS & SINGLE CONSOLIDATED TOOLBAR */}
      <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] relative overflow-hidden border border-white/80 shadow-md">
        
        {/* Toolbar with Non-Duplicated Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#ECE7DF]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
              <Camera size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm md:text-base text-earth-900 leading-tight">
                {lang === 'id' ? 'Papan Stiker Interaktif' : 'Interactive Sticker Canvas'}
              </h3>
              <p className="text-[11px] text-earth-600 font-medium">
                {lang === 'id' ? 'Geser bebas & tumpuk stiker langsung di kanvas' : 'Drag & overlap stickers freely'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* SINGLE Sync & Acak Button */}
            <button
              onClick={handleSingleSync}
              disabled={isSyncing}
              className="paper-btn px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-brand-brown hover:text-earth-900 flex items-center gap-1.5 disabled:opacity-50"
              title={lang === 'id' ? 'Acak Posisi & Saling Menimpa Ulang' : 'Shuffle & Overlap Positions'}
            >
              <Shuffle size={13} className={isSyncing ? 'animate-spin' : ''} />
              <span>{lang === 'id' ? 'Sync & Acak' : 'Sync & Shuffle'}</span>
            </button>

            {/* SINGLE Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="paper-btn px-3.5 py-1.5 rounded-xl text-xs font-bold text-earth-900 hover:text-brand-brown flex items-center gap-1.5 disabled:opacity-50"
              title={lang === 'id' ? 'Unggah Foto Baru & Potong Kontur Otomatis' : 'Upload & Auto Cutout'}
            >
              {isProcessing ? <Loader2 size={13} className="animate-spin text-brand-brown" /> : <Plus size={13} />}
              <span>{lang === 'id' ? 'Upload Foto' : 'Upload'}</span>
            </button>

            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*" 
              className="hidden" 
            />
          </div>
        </div>

        {/* Processing Indicator Banner */}
        {isProcessing && (
          <div className="bg-brand-brown/10 px-4 py-2.5 rounded-2xl mb-4 border border-brand-brown/20 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2 text-brand-brown text-xs font-bold">
              <Loader2 size={15} className="animate-spin" />
              <span>{progressText || (lang === 'id' ? 'Sedang memproses pemotongan kontur...' : 'Processing contour...')}</span>
            </div>
            <span className="text-[10px] font-semibold text-earth-600">AI Background Removal &amp; Dilation</span>
          </div>
        )}

        {/* Interactive Canvas Board */}
        <div
          ref={boardRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-72 sm:h-80 md:h-96 relative bg-gradient-to-b from-[#EFEBE4]/70 to-[#ECE7DF] rounded-2xl p-4 overflow-hidden border border-[#E6E0D5] shadow-inner select-none touch-none"
        >
          {stickers.map((item) => {
            const pos = dragStates[item.id] || { id: item.id, x: 20, y: 20, rotation: 0, zIndex: 1 };
            const isBeingDragged = draggingId === item.id;

            return (
              <div
                key={item.id}
                onPointerDown={(e) => handlePointerDown(item.id, e)}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}px`,
                  transform: `rotate(${pos.rotation}deg) scale(${isBeingDragged ? 1.08 : 1})`,
                  zIndex: pos.zIndex
                }}
                className={`absolute cursor-grab active:cursor-grabbing transition-transform duration-75 select-none group ${
                  isBeingDragged ? 'filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]' : 'filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  draggable={false}
                  className="h-44 sm:h-52 md:h-60 max-w-none object-contain pointer-events-none"
                />

                {/* Individual Rotate & Action Badge on Sticker */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full text-[10px] font-black text-brand-brown shadow-md border border-[#ECE7DF]">
                  <span>{item.title.split(' ')[0]}</span>
                  {/* Single photo rotate button on sticker */}
                  <button
                    onClick={(e) => handleRotateSinglePhoto(item.id, e)}
                    className="p-0.5 hover:bg-[#ECE7DF] rounded text-earth-700 hover:text-brand-brown transition-colors pointer-events-auto"
                    title={lang === 'id' ? 'Putar foto ini (+15°)' : 'Rotate this photo (+15°)'}
                  >
                    <RotateCw size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip Bar */}
        <div className="mt-3 flex items-center justify-between text-xs font-semibold text-earth-700">
          <span className="flex items-center gap-1.5">
            <Hand size={13} className="text-brand-brown" />
            <span>{lang === 'id' ? 'Klik & geser stiker bebas untuk menimpa foto lain.' : 'Click & drag stickers freely to overlap.'}</span>
          </span>
          <span className="text-[11px] text-earth-500 hidden sm:inline">
            {lang === 'id' ? 'Gunakan tombol putar pada tiap stiker untuk memutar foto' : 'Use rotate button on each sticker'}
          </span>
        </div>

      </div>

      {/* SECTION 2: INDIVIDUAL STICKER COLLECTION WITH ROTATE & MANUAL CLEAN TOOLS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-brand-brown" />
            <h3 className="text-sm md:text-base font-black text-earth-900">
              {lang === 'id' ? 'Koleksi Stiker' : 'Sticker Collection'} ({stickers.length})
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
              className="paper-card p-4 rounded-3xl flex flex-col items-center text-center cursor-pointer group hover:paper-btn transition-all duration-300 transform hover:-translate-y-1 select-none relative"
            >
              {/* Top Action Buttons: Rotate Single, Edit Brush, Delete */}
              <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                {/* Rotate Single Photo Button */}
                <button
                  onClick={(e) => handleRotateSinglePhoto(item.id, e)}
                  className="w-7 h-7 rounded-xl bg-white/90 hover:bg-brand-brown hover:text-white text-earth-700 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all opacity-85 hover:opacity-100"
                  title={lang === 'id' ? 'Putar foto ini (+15°)' : 'Rotate photo (+15°)'}
                >
                  <RotateCw size={12} />
                </button>

                {/* Manual Clean & Restore Edit Brush Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingSticker(item);
                  }}
                  className="w-7 h-7 rounded-xl bg-white/90 hover:bg-brand-brown hover:text-white text-earth-700 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all opacity-85 hover:opacity-100"
                  title={lang === 'id' ? 'Koreksi & Bersihkan Stiker Manual' : 'Manual Clean & Restore'}
                >
                  <Edit3 size={12} />
                </button>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteSticker(item.id, e)}
                  className="w-7 h-7 rounded-xl bg-white/90 hover:bg-rose-600 hover:text-white text-earth-600 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all opacity-85 hover:opacity-100"
                  title={lang === 'id' ? 'Hapus stiker ini' : 'Delete this sticker'}
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Contour Sticker Container (Click to view full lightbox) */}
              <div 
                onClick={() => setActiveImage(item)}
                className="w-full h-40 sm:h-48 flex items-center justify-center p-2 rounded-2xl bg-[#ECE7DF]/50 shadow-inner mb-3 overflow-hidden"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <h4 
                onClick={() => setActiveImage(item)}
                className="font-extrabold text-xs md:text-sm text-earth-900 leading-tight mb-1 group-hover:text-brand-brown transition-colors"
              >
                {item.title}
              </h4>

              <span className="mt-auto text-[10px] font-black uppercase tracking-wider text-brand-brown bg-white px-2.5 py-0.5 rounded-full shadow-sm border border-[#ECE7DF]">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX PREVIEW */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
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
              <div className="pt-4 text-center flex flex-wrap items-center justify-center gap-3">
                <div>
                  <h4 className="font-extrabold text-lg text-earth-900">{activeImage.title}</h4>
                  <p className="text-xs text-earth-600 mt-0.5">{activeImage.subtitle}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRotateSinglePhoto(activeImage.id)}
                    className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-earth-800 flex items-center gap-1.5"
                  >
                    <RotateCw size={13} />
                    <span>{lang === 'id' ? 'Putar Foto' : 'Rotate'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingSticker(activeImage);
                      setActiveImage(null);
                    }}
                    className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-brand-brown flex items-center gap-1.5"
                  >
                    <Edit3 size={13} />
                    <span>{lang === 'id' ? 'Koreksi Kuas' : 'Manual Brush'}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteSticker(activeImage.id)}
                    className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-600 hover:text-white flex items-center gap-1.5"
                  >
                    <Trash2 size={13} />
                    <span>{lang === 'id' ? 'Hapus' : 'Delete'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MANUAL CLEANUP & RESTORE STICKER MODAL */}
      {editingSticker && (
        <StickerEditorModal
          isOpen={!!editingSticker}
          onClose={() => setEditingSticker(null)}
          onSave={handleSaveEditedSticker}
          sourceImageUrl={editingSticker.rawSrc || editingSticker.src}
          initialCutoutUrl={editingSticker.src}
          lang={lang}
        />
      )}

    </div>
  );
};
