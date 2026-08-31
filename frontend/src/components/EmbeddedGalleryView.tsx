import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { $isGlobalEditMode } from '../stores/editMode';
import { processImageToContourSticker } from '../utils/stickerProcessor';
import { StickerEditorModal } from './StickerEditorModal';
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  Loader2, 
  RotateCw, 
  Shuffle, 
  Edit3, 
  X,
  Maximize2,
  Eye,
  EyeOff
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
  showLabel?: boolean;
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
    tag: 'Family',
    showLabel: true
  },
  {
    id: 'bromo',
    title: 'Eksplorasi Gunung Bromo',
    subtitle: 'Sunrise dan petualangan alam terbuka',
    src: '/gallery/sticker-bromo.png',
    rawSrc: '/gallery/photo-bromo.jpg',
    tag: 'Adventure',
    showLabel: true
  },
  {
    id: 'supermarket',
    title: 'Supermarket Creative Session',
    subtitle: 'Eksplorasi konsep ruangan pop-art biru',
    src: '/gallery/sticker-supermarket.png',
    rawSrc: '/gallery/photo-supermarket.jpg',
    tag: 'Creative',
    showLabel: true
  },
  {
    id: 'profile',
    title: 'Rendgra Agrida',
    subtitle: 'Senior Software Engineer & Tech Lead',
    src: '/gallery/sticker-profile.png',
    rawSrc: '/gallery/photo-profile.png',
    tag: 'Tech Lead',
    showLabel: true
  }
];

const STORAGE_STICKERS_KEY = 'rendgra_gallery_stickers_v7';
const STORAGE_DRAG_KEY = 'rendgra_gallery_drag_positions_v7';

export const EmbeddedGalleryView: React.FC<EmbeddedGalleryViewProps> = ({ lang }) => {
  const isEditMode = useStore($isGlobalEditMode);

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
  const initDraggablePositions = (items: ContourStickerItem[], forceNew: boolean = false) => {
    if (!forceNew) {
      try {
        const savedLayout = localStorage.getItem(STORAGE_DRAG_KEY);
        if (savedLayout) {
          const parsed = JSON.parse(savedLayout);
          if (parsed && typeof parsed === 'object') {
            setDragStates(parsed);
            return;
          }
        }
      } catch (e) {}
    }

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
      initDraggablePositions(currentItems, false);
    } catch (e) {
      console.warn('Gagal membaca localStorage stickers:', e);
    }
  }, []);

  const saveStickers = (items: ContourStickerItem[]) => {
    setStickers(items);
    try {
      localStorage.setItem(STORAGE_STICKERS_KEY, JSON.stringify(items));
    } catch (e) {}
  };

  const saveDragLayout = (states: Record<string, DraggableStickerState>) => {
    setDragStates(states);
    try {
      localStorage.setItem(STORAGE_DRAG_KEY, JSON.stringify(states));
    } catch (e) {}
  };

  // SINGLE Sync & Acak Button Handler (Only during edit mode)
  const handleSingleSync = () => {
    if (stickers.length === 0) return;
    setIsSyncing(true);
    const shuffled = [...stickers].sort(() => Math.random() - 0.5);
    initDraggablePositions(shuffled, true);
    setTimeout(() => setIsSyncing(false), 250);
  };

  // Rotate single photo helper
  const handleRotateSinglePhoto = (id: string, deltaDegrees: number = 15, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDragStates((prev) => {
      const current = prev[id] || { id, x: 20, y: 20, rotation: 0, scale: 1, zIndex: 1 };
      const updated = {
        ...prev,
        [id]: {
          ...current,
          rotation: (current.rotation + deltaDegrees + 360) % 360
        }
      };
      saveDragLayout(updated);
      return updated;
    });
  };

  // Toggle label visibility per sticker
  const handleToggleLabel = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = stickers.map((s) => {
      if (s.id === id) {
        return { ...s, showLabel: s.showLabel === false ? true : false };
      }
      return s;
    });
    saveStickers(updated);
  };

  // Edit label title inline
  const handleEditLabelTitle = (id: string, newTitle: string) => {
    const updated = stickers.map((s) => {
      if (s.id === id) {
        return { ...s, title: newTitle };
      }
      return s;
    });
    saveStickers(updated);
  };

  // Multi-Touch & Pointer Drag Handlers
  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    if (!isEditMode) {
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      setDragStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], zIndex: nextZ }
      }));
      return;
    }

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
    const current = dragStates[id] || { id, x: 20, y: 20, rotation: 0, scale: 1, zIndex: nextZ };

    if (e.touches.length === 1) {
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
    if (!isEditMode) return;
    const id = activeStickerRef.current;
    const init = initialTouchRef.current;
    const board = boardRef.current;
    if (!id || !init || !board) return;

    const boardRect = board.getBoundingClientRect();

    if (e.touches.length === 1 && dragModeRef.current === 'move') {
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
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const currentAngle = (Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * 180) / Math.PI;

      const scaleFactor = currentDist / init.initDist;
      const nextScale = Math.max(0.5, Math.min(2.2, parseFloat((init.initScale * scaleFactor).toFixed(2))));
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
    if (activeStickerRef.current) {
      saveDragLayout(dragStates);
    }
    activeStickerRef.current = null;
    initialTouchRef.current = null;
    dragModeRef.current = null;
  };

  const startPointerDrag = (id: string, mode: 'move' | 'rotate' | 'resize', e: React.PointerEvent) => {
    if (!isEditMode) return;
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
    if (!isEditMode) return;
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
      const angleRad = Math.atan2(e.clientY - init.centerY, e.clientX - init.centerX);
      const angleDeg = Math.round((angleRad * 180) / Math.PI + 90);
      const nextRot = (angleDeg + 360) % 360;

      setDragStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], rotation: nextRot }
      }));
    } else if (dragModeRef.current === 'resize') {
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
      saveDragLayout(dragStates);
      activeStickerRef.current = null;
      initialTouchRef.current = null;
      dragModeRef.current = null;
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
        showLabel: true,
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
        return { ...item, src: newStickerSrc };
      }
      return item;
    });
    saveStickers(updated);
    setEditingSticker(null);
  };

  const handleResetDefaults = () => {
    if (confirm(lang === 'id' ? 'Kembalikan stiker ke koleksi default?' : 'Reset to default sticker presets?')) {
      saveStickers(DEFAULT_STICKERS);
      initDraggablePositions(DEFAULT_STICKERS, true);
      try {
        localStorage.removeItem(STORAGE_STICKERS_KEY);
        localStorage.removeItem(STORAGE_DRAG_KEY);
      } catch {}
    }
  };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      
      {/* CONTROLS (ONLY VISIBLE IN GLOBAL EDIT MODE) */}
      {isEditMode && (
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-black text-brand-brown uppercase tracking-wider bg-[#ECE7DF] px-3 py-1 rounded-full shadow-inner animate-pulse">
            {lang === 'id' ? 'Mode Edit Galeri Aktif' : 'Gallery Edit Mode'}
          </span>

          <div className="flex items-center gap-2">
            {/* Single Sync & Acak Button */}
            <button
              onClick={handleSingleSync}
              disabled={isSyncing}
              className="paper-btn px-3 py-1.5 rounded-xl text-xs font-extrabold text-brand-brown hover:text-earth-900 flex items-center gap-1.5 disabled:opacity-50"
              title="Acak Posisi"
            >
              <Shuffle size={13} className={isSyncing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">{lang === 'id' ? 'Acak Posisi' : 'Shuffle'}</span>
            </button>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="paper-btn px-3 py-1.5 rounded-xl text-xs font-bold text-earth-900 hover:text-brand-brown flex items-center gap-1.5 disabled:opacity-50"
              title="Upload Foto Stiker"
            >
              {isProcessing ? <Loader2 size={13} className="animate-spin text-brand-brown" /> : <Plus size={13} />}
              <span>{lang === 'id' ? 'Upload' : 'Upload'}</span>
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
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="bg-brand-brown/10 px-4 py-2.5 rounded-2xl border border-brand-brown/20 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-brand-brown text-xs font-bold">
            <Loader2 size={15} className="animate-spin" />
            <span>{progressText || (lang === 'id' ? 'Sedang memproses pemotongan kontur...' : 'Processing contour...')}</span>
          </div>
          <span className="text-[10px] font-semibold text-earth-600">AI Background Removal &amp; Dilation</span>
        </div>
      )}

      {/* SEAMLESS CANVAS BOARD */}
      <div
        ref={boardRef}
        onPointerMove={handleGlobalPointerMove}
        onPointerUp={handleGlobalPointerUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-full h-80 sm:h-96 md:h-[440px] relative rounded-3xl p-4 overflow-hidden select-none touch-none transition-all duration-300 ${
          isEditMode
            ? 'bg-[#ECE7DF]/60 border-2 border-dashed border-brand-brown/40 shadow-inner'
            : 'bg-transparent border-0'
        }`}
      >
        {stickers.map((item) => {
          const pos = dragStates[item.id] || { id: item.id, x: 20, y: 20, rotation: 0, scale: 1.0, zIndex: 1 };
          const isSelected = selectedStickerId === item.id;
          const showItemLabel = item.showLabel !== false;

          return (
            <div
              key={item.id}
              onTouchStart={(e) => handleTouchStart(item.id, e)}
              onClick={() => {
                if (!isEditMode) {
                  setActiveImage(item);
                }
              }}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}px`,
                transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                zIndex: pos.zIndex
              }}
              className={`sticker-item-wrapper absolute transition-transform duration-75 select-none touch-none ${
                isEditMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer hover:scale-105'
              } ${isEditMode && isSelected ? 'ring-2 ring-brand-brown/60 rounded-3xl' : ''}`}
            >
              {/* EDIT CONTROLS: Only visible when in Edit Mode */}
              {isEditMode && (
                <>
                  {/* Circular Rotation Knob */}
                  <div
                    onPointerDown={(e) => startPointerDrag(item.id, 'rotate', e)}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-md border border-brand-brown text-brand-brown flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-125 transition-transform z-30"
                    title={lang === 'id' ? 'Tahan & putar kursor untuk memutar foto' : 'Drag to rotate'}
                  >
                    <RotateCw size={11} />
                  </div>

                  {/* Corner Resize / Scale Handle */}
                  <div
                    onPointerDown={(e) => startPointerDrag(item.id, 'resize', e)}
                    className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md border border-brand-brown text-brand-brown flex items-center justify-center cursor-nwse-resize hover:scale-125 transition-transform z-30"
                    title={lang === 'id' ? 'Tahan & tarik untuk memperbesar / memperkecil' : 'Drag to resize'}
                  >
                    <Maximize2 size={10} />
                  </div>
                </>
              )}

              {/* Main Sticker Image */}
              <div
                onPointerDown={(e) => {
                  if (isEditMode) {
                    startPointerDrag(item.id, 'move', e);
                  }
                }}
                className="relative"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  draggable={false}
                  className="h-44 sm:h-52 md:h-60 max-w-none object-contain pointer-events-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
                />
              </div>

              {/* STICKER LABEL */}
              {showItemLabel && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/95 px-3 py-1 rounded-full text-xs font-black text-brand-brown shadow-md border border-[#ECE7DF] z-20 whitespace-nowrap">
                  {isEditMode ? (
                    <>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleEditLabelTitle(item.id, e.target.value)}
                        className="bg-transparent border-b border-brand-brown/40 max-w-[100px] text-xs font-black text-brand-brown focus:outline-none px-0.5"
                      />
                      <button
                        onClick={(e) => handleToggleLabel(item.id, e)}
                        className="text-earth-500 hover:text-rose-600 ml-1"
                        title="Sembunyikan label ini"
                      >
                        <EyeOff size={11} />
                      </button>
                    </>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </div>
              )}

              {/* Restore Label in Edit Mode if hidden */}
              {isEditMode && !showItemLabel && (
                <button
                  onClick={(e) => handleToggleLabel(item.id, e)}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold text-earth-600 hover:text-brand-brown shadow-sm border border-[#ECE7DF] z-20 whitespace-nowrap"
                  title="Tampilkan kembali label"
                >
                  <Eye size={10} />
                  <span>{lang === 'id' ? 'Beri Label' : 'Show Label'}</span>
                </button>
              )}

            </div>
          );
        })}
      </div>

      {/* SECTION 2: STICKER COLLECTION & TOOLS (ONLY VISIBLE IN GLOBAL EDIT MODE) */}
      {isEditMode && (
        <div className="paper-card p-6 md:p-8 rounded-3xl bg-[#FAF8F5] border border-white/90 shadow-md animate-fade-in mt-8">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#ECE7DF]">
            <div className="flex items-center gap-2">
              <Edit3 size={15} className="text-brand-brown" />
              <h3 className="text-sm md:text-base font-black text-earth-900">
                {lang === 'id' ? 'Koreksi & Kelola Koleksi Stiker' : 'Sticker Collection & Tools'}
              </h3>
            </div>

            <button
              onClick={handleResetDefaults}
              className="paper-btn px-3 py-1 rounded-xl text-[11px] font-bold text-earth-700 hover:text-brand-brown flex items-center gap-1"
            >
              <RotateCcw size={11} />
              <span>{lang === 'id' ? 'Reset Stiker Default' : 'Reset Defaults'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stickers.map((item) => (
              <div
                key={item.id}
                className="paper-card p-4 rounded-3xl flex flex-col items-center text-center relative group"
              >
                {/* Action Buttons: Manual Brush & Delete */}
                <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                  <button
                    onClick={() => setEditingSticker(item)}
                    className="w-7 h-7 rounded-xl bg-white/90 hover:bg-brand-brown hover:text-white text-earth-700 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all opacity-85 hover:opacity-100"
                    title={lang === 'id' ? 'Koreksi Kuas Manual (Hapus / Pulihkan)' : 'Manual Brush Clean'}
                  >
                    <Edit3 size={12} />
                  </button>

                  <button
                    onClick={(e) => handleDeleteSticker(item.id, e)}
                    className="w-7 h-7 rounded-xl bg-white/90 hover:bg-rose-600 hover:text-white text-earth-600 shadow-sm border border-[#ECE7DF] flex items-center justify-center transition-all opacity-85 hover:opacity-100"
                    title="Hapus Stiker"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                {/* Sticker Thumbnail */}
                <div className="w-full h-36 flex items-center justify-center p-2 rounded-2xl bg-[#ECE7DF]/50 shadow-inner mb-3 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                    loading="lazy"
                  />
                </div>

                <h4 className="font-extrabold text-xs text-earth-900 leading-tight mb-1">
                  {item.title}
                </h4>

                <span className="mt-auto text-[10px] font-black uppercase tracking-wider text-brand-brown bg-white px-2.5 py-0.5 rounded-full shadow-sm border border-[#ECE7DF]">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

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
              <div className="pt-4 text-center">
                <h4 className="font-extrabold text-lg text-earth-900">{activeImage.title}</h4>
                <p className="text-xs text-earth-600 mt-0.5">{activeImage.subtitle}</p>
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
