import { useState, useEffect } from "react";

const colorCache = new Map<string, string>();

/**
 * Extracts an average RGB color from an image and returns a soft tinted rgba() string.
 * Defaults to "rgba(0, 0, 0, 0.05)" (matching bg-black/5) while loading or on failure.
 */
export function useAverageColor(imageSrc?: string, opacity = 0.3): string {
  const fallback = "rgba(0, 0, 0, 0.05)"; // failure color
  const cacheKey = imageSrc ? `${imageSrc}__${opacity}` : ""; // saves average color for each image to memory

  const [color, setColor] = useState<string>(() => {
    if (cacheKey && colorCache.has(cacheKey)) {
      return colorCache.get(cacheKey)!;
    }
    return fallback;
  });

  // In case there's no imageSrc or if not running in a browser, just instantly return the fallback color.
  useEffect(() => {
    if (!imageSrc || typeof window === "undefined") {
      setColor(fallback);
      return;
    }

    if (cacheKey && colorCache.has(cacheKey)) {
      setColor(colorCache.get(cacheKey)!);
      return;
    }

    let isMounted = true; // To prevent state updates on unmounted (unassigned) components
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    const handleLoad = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;


        // Downscaling to 8x8 for fast sampling
        const size = 8;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha > 20) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }

        if (count > 0) {
          const avgR = Math.round(r / count);
          const avgG = Math.round(g / count);
          const avgB = Math.round(b / count);
          const computedColor = `rgba(${avgR}, ${avgG}, ${avgB}, ${opacity})`;

          if (cacheKey) {
            colorCache.set(cacheKey, computedColor);
          }
          if (isMounted) {
            setColor(computedColor);
          }
        }
      } catch (err) {
        // If there's an error, use the fallback color
        if (isMounted) {
          setColor(fallback);
        }
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      handleLoad();
    } else {
      setColor(fallback);
      img.onload = handleLoad;
    }

    return () => {
      isMounted = false;
    };
  }, [imageSrc, cacheKey, opacity]);

  return color;
}
