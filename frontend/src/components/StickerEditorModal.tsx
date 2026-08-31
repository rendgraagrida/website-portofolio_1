import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Eraser, 
  Paintbrush, 
  RotateCw, 
  RotateCcw, 
  Check, 
  Undo2, 
  Sparkles,
  Sliders,
  ZoomIn
} from 'lucide-react';

interface StickerEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (finalStickerDataUrl: string, title?: string) => void;
  sourceImageUrl: string;
  initialCutoutUrl?: string;
  lang: 'id' | 'en';
}

export const StickerEditorModal: React.FC<StickerEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  sourceImageUrl,
  initialCutoutUrl,
  lang
}) => {
  const [tool, setTool] = useState<'erase' | 'restore'>('erase');
  const [brushSize, setBrushSize] = useState<number>(24);
  const [rotation, setRotation] = useState<number>(0);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const origImgRef = useRef<HTMLImageElement | null>(null);
  const cutoutImgRef = useRef<HTMLImageElement | null>(null);

  // Initialize and load images onto editor canvas
  useEffect(() => {
    if (!isOpen) return;

    const origImg = new Image();
    origImg.crossOrigin = 'anonymous';
    const cutoutImg = new Image();
    cutoutImg.crossOrigin = 'anonymous';

    origImg.onload = () => {
      origImgRef.current = origImg;
      if (initialCutoutUrl) {
        cutoutImg.src = initialCutoutUrl;
      } else {
        renderInitialCanvas(origImg, null);
      }
    };

    cutoutImg.onload = () => {
      cutoutImgRef.current = cutoutImg;
      if (origImgRef.current) {
        renderInitialCanvas(origImgRef.current, cutoutImg);
      }
    };

    origImg.src = sourceImageUrl;
  }, [isOpen, sourceImageUrl, initialCutoutUrl]);

  const renderInitialCanvas = (orig: HTMLImageElement, cutout: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scale to a comfortable working size (e.g. max 800px)
    const maxDim = 800;
    const scale = Math.min(1, maxDim / Math.max(orig.naturalWidth, orig.naturalHeight));
    const width = Math.round(orig.naturalWidth * scale);
    const height = Math.round(orig.naturalHeight * scale);

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    if (cutout) {
      // Draw initial transparent AI cutout
      ctx.drawImage(cutout, 0, 0, width, height);
    } else {
      // Draw original
      ctx.drawImage(orig, 0, 0, width, height);
    }

    // Save initial state for Undo
    const snapshot = ctx.getImageData(0, 0, width, height);
    setHistory([snapshot]);
  };

  const saveHistorySnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), snapshot]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const nextHistory = [...history];
    nextHistory.pop(); // Remove current
    const prevSnapshot = nextHistory[nextHistory.length - 1];
    ctx.putImageData(prevSnapshot, 0, 0);
    setHistory(nextHistory);
  };

  // Drawing Brush on Canvas (Erase vs Restore)
  const drawAtPointer = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !origImgRef.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    if (tool === 'erase') {
      // Manual Eraser: Remove pixels (make transparent)
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else {
      // Manual Restore: Paint back original pixels from source photo
      ctx.save();
      // Create brush clipping path
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(origImgRef.current, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    drawAtPointer(x, y);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    drawAtPointer(x, y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      setIsDrawing(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      saveHistorySnapshot();
    }
  };

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  // Generate Final Sticker with Solid White Outline
  const handleApplyAndSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const strokeSize = 16;
    const padding = strokeSize * 2 + 10;
    const width = canvas.width;
    const height = canvas.height;

    // Step 1: Create silhouette mask for the solid white stroke
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = width;
    maskCanvas.height = height;
    const mCtx = maskCanvas.getContext('2d');
    if (!mCtx) return;

    mCtx.drawImage(canvas, 0, 0);
    mCtx.globalCompositeOperation = 'source-in';
    mCtx.fillStyle = '#FFFFFF';
    mCtx.fillRect(0, 0, width, height);

    // Step 2: Render dilated white outer contour on final canvas
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = width + padding * 2;
    finalCanvas.height = height + padding * 2;
    const fCtx = finalCanvas.getContext('2d');
    if (!fCtx) return;

    fCtx.imageSmoothingEnabled = true;
    fCtx.imageSmoothingQuality = 'high';

    // Apply rotation if any
    fCtx.save();
    if (rotation !== 0) {
      fCtx.translate(finalCanvas.width / 2, finalCanvas.height / 2);
      fCtx.rotate((rotation * Math.PI) / 180);
      fCtx.translate(-finalCanvas.width / 2, -finalCanvas.height / 2);
    }

    // Draw radial white stroke passes
    for (let r = 2; r <= strokeSize; r += 2) {
      const stepAngle = r > 8 ? 10 : 15;
      for (let angle = 0; angle < 360; angle += stepAngle) {
        const rad = (angle * Math.PI) / 180;
        const x = padding + Math.cos(rad) * r;
        const y = padding + Math.sin(rad) * r;
        fCtx.drawImage(maskCanvas, x, y);
      }
    }

    // Draw the cleaned cutout on top of the white contour
    fCtx.drawImage(canvas, padding, padding);
    fCtx.restore();

    // Convert to PNG Data URL
    const finalDataUrl = finalCanvas.toDataURL('image/png', 0.95);
    onSave(finalDataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="paper-card rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl animate-fade-in max-h-[94vh] flex flex-col bg-[#FAF8F5]">
        
        {/* Header */}
        <div className="bg-[#ECE7DF] px-6 py-4 border-b border-[#E6E0D5] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 font-extrabold text-earth-900 text-sm md:text-base">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-brown">
              <Sparkles size={16} />
            </div>
            <span>{lang === 'id' ? 'Koreksi & Bersihkan Stiker Manual' : 'Manual Cleanup & Restore Sticker Tool'}</span>
          </div>

          <button
            onClick={onClose}
            className="paper-btn w-8 h-8 rounded-xl flex items-center justify-center text-earth-700 hover:text-brand-brown focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-[#FAF8F5] px-6 py-3 border-b border-[#ECE7DF] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          {/* Tools: Erase vs Restore */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTool('erase')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                tool === 'erase'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'paper-btn text-earth-800 hover:text-brand-brown'
              }`}
            >
              <Eraser size={14} />
              <span>{lang === 'id' ? 'Hapus Latar' : 'Erase Background'}</span>
            </button>

            <button
              onClick={() => setTool('restore')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                tool === 'restore'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'paper-btn text-earth-800 hover:text-brand-brown'
              }`}
            >
              <Paintbrush size={14} />
              <span>{lang === 'id' ? 'Pulihkan Foto' : 'Restore Photo'}</span>
            </button>

            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="paper-btn px-2.5 py-1.5 rounded-xl text-xs font-bold text-earth-700 disabled:opacity-40 flex items-center gap-1"
              title="Undo"
            >
              <Undo2 size={13} />
            </button>
          </div>

          {/* Brush Size & Rotation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sliders size={13} className="text-earth-600" />
              <span className="text-xs font-bold text-earth-700">{brushSize}px</span>
              <input
                type="range"
                min={6}
                max={80}
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-20 sm:w-28 accent-brand-brown cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleRotate(-90)}
                className="paper-btn p-1.5 rounded-xl text-earth-700 hover:text-brand-brown"
                title="Rotate -90°"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => handleRotate(90)}
                className="paper-btn p-1.5 rounded-xl text-earth-700 hover:text-brand-brown"
                title="Rotate +90°"
              >
                <RotateCw size={14} />
              </button>
              {rotation !== 0 && (
                <span className="text-[10px] font-black text-brand-brown bg-[#ECE7DF] px-2 py-0.5 rounded-full">
                  {rotation}°
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Canvas Editing Board with Checkered Background */}
        <div className="p-4 md:p-6 overflow-auto flex-1 flex items-center justify-center bg-[#24201D] select-none">
          <div 
            style={{ 
              backgroundImage: 'linear-gradient(45deg, #332E2A 25%, transparent 25%), linear-gradient(-45deg, #332E2A 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #332E2A 75%), linear-gradient(-45deg, transparent 75%, #332E2A 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}
            className="p-3 rounded-2xl shadow-2xl border border-white/10 relative overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{
                transform: `rotate(${rotation}deg)`,
                cursor: tool === 'erase' ? 'crosshair' : 'cell'
              }}
              className="max-h-[55vh] max-w-full object-contain touch-none transition-transform duration-200"
            />
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#ECE7DF] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-earth-700 font-semibold hidden sm:block">
            {lang === 'id' 
              ? '💡 Gunakan kuas untuk menghapus sisa background atau memulihkan bagian yang tercrop.'
              : '💡 Use brush to erase leftover background or restore over-cropped parts.'}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="paper-btn px-4 py-2 rounded-xl text-xs font-bold text-earth-800"
            >
              {lang === 'id' ? 'Batal' : 'Cancel'}
            </button>
            <button
              onClick={handleApplyAndSave}
              className="bg-brand-brown hover:bg-earth-900 text-white px-5 py-2 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
            >
              <Check size={14} />
              <span>{lang === 'id' ? 'Simpan & Terapkan Garis Stiker' : 'Save & Apply Sticker Outline'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
