/**
 * Utility untuk memproses foto menjadi stiker kontur transparan
 * dengan garis luar putih tebal (die-cut contour stroke) langsung di browser,
 * serta merekonstruksi kolase stiker bersatu secara dinamis.
 */

export async function processImageToContourSticker(
  file: File,
  onProgress?: (step: string) => void
): Promise<string> {
  onProgress?.('Menganalisis dan memotong latar belakang foto...');

  let cutoutBlob: Blob;

  try {
    // Dynamic import to keep initial bundle ultra lightweight
    const { removeBackground } = await import('@imgly/background-removal');
    cutoutBlob = await removeBackground(file, {
      progress: (key: string, current: number, total: number) => {
        if (total > 0) {
          const pct = Math.round((current / total) * 100);
          onProgress?.(`Memotong kontur foto (${pct}%)...`);
        }
      }
    });
  } catch (err) {
    console.warn('AI background removal fallback to canvas:', err);
    cutoutBlob = file;
  }

  onProgress?.('Melapisi garis luar stiker putih tebal...');

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(cutoutBlob);

    img.onload = () => {
      try {
        const strokeSize = 16;
        const padding = strokeSize * 2 + 10;
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        // Step 1: Create silhouette mask for the solid white stroke
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = width;
        maskCanvas.height = height;
        const mCtx = maskCanvas.getContext('2d');
        if (!mCtx) throw new Error('Canvas not supported');

        mCtx.drawImage(img, 0, 0);
        mCtx.globalCompositeOperation = 'source-in';
        mCtx.fillStyle = '#FFFFFF';
        mCtx.fillRect(0, 0, width, height);

        // Step 2: Render dilated white outer contour on final canvas
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = width + padding * 2;
        finalCanvas.height = height + padding * 2;
        const fCtx = finalCanvas.getContext('2d');
        if (!fCtx) throw new Error('Canvas not supported');

        fCtx.imageSmoothingEnabled = true;
        fCtx.imageSmoothingQuality = 'high';

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

        // Step 3: Draw the original sharp cutout over the white contour
        fCtx.drawImage(img, padding, padding);

        // Convert to high-quality PNG data URL
        const stickerDataUrl = finalCanvas.toDataURL('image/png', 0.95);
        URL.revokeObjectURL(url);
        resolve(stickerDataUrl);
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Gagal memuat gambar'));
    };

    img.src = url;
  });
}

/**
 * Merekonstruksi ulang seluruh stiker yang tersimpan menjadi satu
 * kolase banner bersatu (side-by-side overlapping collage) secara dinamis di browser.
 */
export async function reconstructStickerCollage(
  stickerSrcs: string[]
): Promise<string> {
  if (!stickerSrcs || stickerSrcs.length === 0) return '';

  const loadedImages = await Promise.all(
    stickerSrcs.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
          img.src = src;
        })
    )
  );

  const validImages = loadedImages.filter(
    (img) => img.naturalWidth > 0 && img.naturalHeight > 0
  );

  if (validImages.length === 0) return '';

  const targetHeight = 450;
  const scaled = validImages.map((img) => {
    const ratio = targetHeight / img.naturalHeight;
    const w = img.naturalWidth * ratio;
    return { img, w, h: targetHeight };
  });

  const overlapFactor = 0.75;
  let totalWidth = 0;
  scaled.forEach((s, idx) => {
    if (idx === 0) {
      totalWidth += s.w;
    } else {
      totalWidth += s.w * overlapFactor;
    }
  });
  totalWidth += 80;

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(900, Math.round(totalWidth));
  canvas.height = targetHeight + 60;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  let currentX = 40;
  scaled.forEach((item, idx) => {
    const y = canvas.height - item.h - 15 + (idx % 2 === 0 ? 0 : 10);
    ctx.drawImage(item.img, currentX, y, item.w, item.h);
    currentX += item.w * overlapFactor;
  });

  return canvas.toDataURL('image/png', 0.95);
}
