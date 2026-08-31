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
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move
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
  y: number; // px
  rotation: number; // deg
  scale: number; // 0.5 - 2.2
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

const STORAGE_STICKERS_KEY = 'rendgra_gallery_stickers_v6';

export const EmbeddedGalleryView: React.FC<EmbeddedGalleryViewProps> = ({ lang }) => {
  const [stickers, setStickers] = useState<ContourStickerItem[]>(DEFAULT_STICKERS);
  const [activeImage, setActiveImage] = useState<ContourStickerItem | null>(null);
  
  // Interactive Draggable & Transform Board State
  const [dragStates, setDragStates] = useState<Record<string, DraggableStickerState>>({});
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Interaction References
  const boardRef = useRef<HTMLDivElement>(null);
  const dragModeRef = useRef<'move' | 'rotate' | 'resize' | null>(null);
  const activeStickerRef = useRef<string | null>(null);
  const initialTouchRef = useRef<{
    startX: number;
    startY: number;
    initX: number;
    initY: number;
    initRot: number;
    initScale: number;
    initDist?: number;
    initAngle?: number;
    centerX?: number;
    centerY?: number;
  } | null>(null);

  // Manual Editor Modal State
  const [editingSticker, setEditingSticker] = useState<ContourStickerItem | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize interactive positions & scale across the canvas
  const initDraggablePositions = (items: ContourStickerItem[]) => {
    const states: Record<string, DraggableStickerState> = {};
    const count = items.length;
    items.forEach((item, index) => {
      const step = count > 1 ? 66 / (count - 1) : 0;
      const x = 10 + index * step + (Math.random() * 4 - 2);
      const y = Math.round(15 + Math.random() * 20);
      const rotation = Math.round(Math.random() * 10 - 5);
      states[item.id] = {
        id: item.id,
        x: Math.max(4, Math.min(75, x)),
        y,
        rotation,
        scale: 1.0,
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

  // Scale (Minimize / Maximize) helper per sticker
  const handleScaleSinglePhoto = (id: string, delta: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDragStates((prev) => {
      const current = prev[id] || { id, x: 20, y: 20, rotation: 0, scale: 1, zIndex: 1 };
      const nextScale = Math.max(0.5, Math.min(2.0, parseFloat((current.scale + delta).toFixed(2))));
      return {
        ...prev,
        [id]: {
          ...current,
          scale: nextScale
        }
      };
    });
  };

  // Rotate single photo helper
  const handleRotateSinglePhoto = (id: string, deltaDegrees: number = 15, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDragStates((prev) => {
      const current = prev[id] || { id, x: 20, y: 20, rotation: 0, scale: 1, zIndex: 1 };
      return {
        ...prev,
        [id]: {
          ...current,
          rotation: (current.rotation + deltaDegrees + 360) % 360
        }
      };
    });
  };

  // ==========================================
  // MULTI-TOUCH & GESTURE INTERACTION ENGINE
  // ==========================================
  
  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    const board = boardRef.current;
    if (!board) return;

    // Bring sticker to top
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setSelectedStickerId(id);
    setDragStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ }
    }));

    activeStickerRef.current = id;
    const current = dragStates[id] || { id, x: 20, y: 20, rotation: 0, scale: 1, zIndex: nextZ };

    if (e.touches.length === 1) {
      // 1 Finger Drag
      dragModeRef.current = 'move';
      initialTouchRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        initX: current.x,
        initY: current.y,
        initRot: current.rotation,
        initScale: current.scale
      };
    } else if (e.touches.length >= 2) {
      // 2 Fingers Pinch-to-Zoom + Rotate Gesture!
      dragModeRef.current = 'rotate';
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const angle = (Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * 180) / Math.PI;

      initialTouchRef.current = {
        startX: (t1.clientX + t2.clientX) / 2,
        startY: (t1.clientY + t2.clientY) / 2,
        initX: current.x,
        initY: current.y,
        initRot: current.rotation,
        initScale: current.scale,
        initDist: dist,
        initAngle: angle
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const id = activeStickerRef.current;
    const init = initialTouchRef.current;
    const board = boardRef.current;
    if (!id || !init || !board) return;

    const boardRect = board.getBoundingClientRect();

    if (e.touches.length === 1 && dragModeRef.current === 'move') {
      // 1 Finger Move
      const dxPx = e.touches[0].clientX - init.startX;
      const dyPx = e.touches[0].clientY - init.startY;
      const dxPercent = (dxPx / boardRect.width) * 100;

      const nextX = Math.max(2, Math.min(80, init.initX + dxPercent));
      const nextY = Math.max(0, Math.min(220, init.initY + dyPx));

      setDragStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], x: nextX, y: nextY }
      }));
    } else if (e.touches.length >= 2 && init.initDist && init.initAngle !== undefined) {
      // 2 Fingers: Pinch Zoom + Two-Finger Rotation
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const currentAngle = (Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * 180) / Math.PI;

      // Scale ratio
      const scaleFactor = currentDist / init.initDist;
      const nextScale = Math.max(0.5, Math.min(2.2, parseFloat((init.initScale * scaleFactor).toFixed(2))));

      // Angle delta
      const deltaAngle = currentAngle - init.initAngle;
      const nextRotation = Math.round((init.initRot + deltaAngle + 360) % 360);

      setDragStates((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          scale: nextScale,
          rotation: nextRotation
        }
      }));
    }
  };

  const handleTouchEnd = () => {
    activeStickerRef.current = null;
    initialTouchRef.current = null;
    dragModeRef.current = null;
  };

  // ==========================================
  // DESKTOP POINTER & HANDLE DRAG INTERACTION
  // ==========================================

  const startPointerDrag = (id: string, mode: 'move' | 'rotate' | 'resize', e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const board = boardRef.current;
    if (!board) return;

    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setSelectedStickerId(id);
    setDragStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ }
    }));

    activeStickerRef.current = id;
    dragModeRef.current = mode;

    const current = dragStates[id] || { id, x: 20, y: 20, rotation: 0, scale: 1, zIndex: nextZ };
    
    // Find center of sticker element for rotation knob calculations
    const targetEl = (e.currentTarget.closest('.sticker-item-wrapper') as HTMLElement);
    const rect = targetEl ? targetEl.getBoundingClientRect() : e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    initialTouchRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: current.x,
      initY: current.y,
      initRot: current.rotation,
      initScale: current.scale,
      centerX,
      centerY
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleGlobalPointerMove = (e: React.PointerEvent) => {
    const id = activeStickerRef.current;
    const init = initialTouchRef.current;
    const board = boardRef.current;
    if (!id || !init || !board) return;

    const boardRect = board.getBoundingClientRect();

    if (dragModeRef.current === 'move') {
      const dxPx = e.clientX - init.startX;
      const dyPx = e.clientY - init.startY;
      const dxPercent = (dxPx / boardRect.width) * 100;
      const nextX = Math.max(2, Math.min(80, init.initX + dxPercent));
      const nextY = Math.max(0, Math.min(220, init.initY + dyPx));

      setDragStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], x: nextX, y: nextY }
      }));
    } else if (dragModeRef.current === 'rotate' && init.centerX && init.centerY) {
      // Rotate by calculating angle between pointer and sticker center
      const angleRad = Math.atan2(e.clientY - init.centerY, e.clientX - init.centerX);
      const angleDeg = Math.round((angleRad * 180) / Math.PI + 90);
      const nextRot = (angleDeg + 360) % 360;

      setDragStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], rotation: nextRot }
      }));
    } else if (dragModeRef.current === 'resize') {
      // Resize by dragging corner outward/inward
      const dy = e.clientY - init.startY;
      const scaleDelta = dy / 150;
      const nextScale = Math.max(0.5, Math.min(2.2, parseFloat((init.initScale + scaleDelta).toFixed(2))));

      setDragStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], scale: nextScale }
      }));
    }
  };

  const handleGlobalPointerUp = (e: React.PointerEvent) => {
    if (activeStickerRef.current) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      activeStickerRef.current = null;
      initialTouchRef.current = null;
      dragModeRef.current = null;
    }
  };

  // Mouse wheel on sticker to zoom in / out
  const handleWheelOnSticker = (id: string, e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    handleScaleSinglePhoto(id, delta);
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
      
      {/* SECTION 1: MASTER CANVAS WITH MULTI-TOUCH & GESTURE CONTROLS */}
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
                {lang === 'id' ? 'Geser, putar dengan 2 jari, dan perbesar/perkecil foto bebas' : 'Drag, pinch/2-finger rotate, & zoom freely'}
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

        {/* Interactive Canvas Board with Multi-Touch & Gesture Support */}
        <div
          ref={boardRef}
          onPointerMove={handleGlobalPointerMove}
          onPointerUp={handleGlobalPointerUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-80 sm:h-96 md:h-[420px] relative bg-gradient-to-b from-[#EFEBE4]/70 to-[#ECE7DF] rounded-2xl p-4 overflow-hidden border border-[#E6E0D5] shadow-inner select-none touch-none"
        >
          {stickers.map((item) => {
            const pos = dragStates[item.id] || { id: item.id, x: 20, y: 20, rotation: 0, scale: 1.0, zIndex: 1 };
            const isSelected = selectedStickerId === item.id;

            return (
              <div
                key={item.id}
                onTouchStart={(e) => handleTouchStart(item.id, e)}
                onWheel={(e) => handleWheelOnSticker(item.id, e)}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}px`,
                  transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                  zIndex: pos.zIndex
                }}
                className={`sticker-item-wrapper absolute transition-transform duration-75 select-none touch-none ${
                  isSelected ? 'ring-2 ring-brand-brown/60 rounded-3xl' : ''
                }`}
              >
                {/* 1. Circular Rotation Knob (Drag to rotate freely on desktop) */}
                <div
                  onPointerDown={(e) => startPointerDrag(item.id, 'rotate', e)}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-md border border-brand-brown text-brand-brown flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-125 transition-transform z-20"
                  title={lang === 'id' ? 'Tahan & putar kursor untuk memutar foto' : 'Drag to rotate'}
                >
                  <RotateCw size={11} />
                </div>

                {/* Main Sticker Image (Drag to move) */}
                <div
                  onPointerDown={(e) => startPointerDrag(item.id, 'move', e)}
                  onDoubleClick={() => handleScaleSinglePhoto(item.id, pos.scale > 1.2 ? -0.4 : 0.4)}
                  className="cursor-grab active:cursor-grabbing relative"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    draggable={false}
                    className="h-44 sm:h-52 md:h-60 max-w-none object-contain pointer-events-none filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.25)]"
                  />
                </div>

                {/* 2. Corner Resize / Scale Handle (Drag to minimize/maximize) */}
                <div
                  onPointerDown={(e) => startPointerDrag(item.id, 'resize', e)}
                  className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md border border-brand-brown text-brand-brown flex items-center justify-center cursor-nwse-resize hover:scale-125 transition-transform z-20"
                  title={lang === 'id' ? 'Tahan & tarik untuk memperbesar / memperkecil' : 'Drag to resize'}
                >
                  <Maximize2 size={10} />
                </div>

                {/* 3. Interactive Quick Controls Badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/95 px-2.5 py-0.5 rounded-full text-[10px] font-black text-brand-brown shadow-md border border-[#ECE7DF] z-20 whitespace-nowrap">
                  <span>{item.title.split(' ')[0]}</span>
                  
                  {/* Minimize / Zoom Out */}
                  <button
                    onClick={(e) => handleScaleSinglePhoto(item.id, -0.15, e)}
                    className="p-0.5 hover:bg-[#ECE7DF] rounded text-earth-700 hover:text-brand-brown transition-colors"
                    title={lang === 'id' ? 'Perkecil Foto' : 'Minimize'}
                  >
                    <ZoomOut size={11} />
                  </button>

                  {/* Maximize / Zoom In */}
                  <button
                    onClick={(e) => handleScaleSinglePhoto(item.id, 0.15, e)}
                    className="p-0.5 hover:bg-[#ECE7DF] rounded text-earth-700 hover:text-brand-brown transition-colors"
                    title={lang === 'id' ? 'Perbesar Foto' : 'Maximize'}
                  >
                    <ZoomIn size={11} />
                  </button>

                  {/* Rotate +15° */}
                  <button
                    onClick={(e) => handleRotateSinglePhoto(item.id, 15, e)}
                    className="p-0.5 hover:bg-[#ECE7DF] rounded text-earth-700 hover:text-brand-brown transition-colors"
                    title={lang === 'id' ? 'Putar +15°' : 'Rotate +15°'}
                  >
                    <RotateCw size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-earth-700">
          <span className="flex items-center gap-1.5">
            <Hand size={13} className="text-brand-brown" />
            <span>{lang === 'id' ? '🖐️ Sentuh 2 jari di HP untuk memutar & zoom (pinch). Di desktop: gunakan tombol putar/knob atas & sudut bawah.' : '🖐️ 2 fingers on mobile to pinch & rotate. Desktop: use top knob & corner handle.'}</span>
          </span>
          <span className="text-[11px] text-brand-brown font-bold">
            {lang === 'id' ? 'Double-click foto untuk zoom cepat' : 'Double click to zoom'}
          </span>
        </div>

      </div>

      {/* SECTION 2: INDIVIDUAL STICKER COLLECTION WITH ROTATE, ZOOM, & MANUAL CLEAN */}
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
              {/* Top Action Buttons */}
              <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                {/* Rotate Single Photo Button */}
                <button
                  onClick={(e) => handleRotateSinglePhoto(item.id, 15, e)}
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

              {/* Contour Sticker Container */}
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
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white text-white hover:text-black w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              <X size={18} />
            </button>

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
                    onClick={() => handleRotateSinglePhoto(activeImage.id, 15)}
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
