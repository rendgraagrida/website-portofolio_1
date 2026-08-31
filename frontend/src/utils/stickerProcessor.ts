/**
 * Utility untuk memproses foto menjadi stiker kontur transparan
 * dengan garis luar putih tebal (die-cut contour stroke) langsung di browser,
 * serta merekonstruksi dan mengacak kolase stiker bersatu secara dinamis.
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
 * Merekonstruksi ulang seluruh stiker menjadi kolase bersatu
 * dengan pengacakan posisi (*random shuffle*), tumpukan saling menimpa (*deep overlap*),
 * dan kemiringan stiker (*random rotation angle*).
 */
export async function reconstructStickerCollage(
  stickerSrcs: string[],
  shuffleOrder: boolean = true
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

  let validImages = loadedImages.filter(
    (img) => img.naturalWidth > 0 && img.naturalHeight > 0
  );

  if (validImages.length === 0) return '';

  // Randomize / shuffle the layering order when requested
  if (shuffleOrder && validImages.length > 1) {
    validImages = [...validImages].sort(() => Math.random() - 0.5);
  }

  const targetHeight = 460;
  const scaled = validImages.map((img) => {
    const ratio = targetHeight / img.naturalHeight;
    const w = img.naturalWidth * ratio;
    // Random tilt angle between -6deg and +6deg
    const angle = (Math.random() * 12 - 6) * (Math.PI / 180);
    // Random height variation
    const yOffset = Math.round(Math.random() * 30 - 15);
    return { img, w, h: targetHeight, angle, yOffset };
  });

  // Overlap factor (0.58 = deep overlapping / saling menimpa)
  const overlapFactor = validImages.length > 3 ? 0.60 : 0.68;
  let totalWidth = 0;
  scaled.forEach((s, idx) => {
    if (idx === 0) {
      totalWidth += s.w;
    } else {
      totalWidth += s.w * overlapFactor;
    }
  });
  totalWidth += 120; // extra padding

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(960, Math.round(totalWidth));
  canvas.height = targetHeight + 100;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  let currentX = 60;
  scaled.forEach((item) => {
    ctx.save();
    
    // Position center of image
    const centerX = currentX + item.w / 2;
    const centerY = canvas.height - item.h / 2 - 25 + item.yOffset;
    
    ctx.translate(centerX, centerY);
    ctx.rotate(item.angle);
    
    // Draw with slight shadow for depth between overlapping layers
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;
    
    ctx.drawImage(item.img, -item.w / 2, -item.h / 2, item.w, item.h);
    ctx.restore();

    currentX += item.w * overlapFactor;
  });

  return canvas.toDataURL('image/png', 0.95);
}
