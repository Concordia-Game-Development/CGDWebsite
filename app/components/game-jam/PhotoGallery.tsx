import { useState } from "react";
import { useAverageColor } from "~/lib/useAverageColor";
import type { GalleryData } from "./types";

export default function PhotoGallery({ gallery }: { gallery: GalleryData }) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const activeImage = gallery.images[activeGalleryIndex];
  const frameColor = useAverageColor(activeImage);

  const showPreviousImage = () => {
    setActiveGalleryIndex((currentIndex) =>
      currentIndex === 0 ? gallery.images.length - 1 : currentIndex - 1
    );
  };

  const showNextImage = () => {
    setActiveGalleryIndex((currentIndex) =>
      currentIndex === gallery.images.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <section className="max-w-6xl mx-auto mb-24 font-corbert font-bold">
      <h2 className="text-3xl md:text-4xl font-bold text-dark-purple mb-6 text-center md:text-left">
        {gallery.title}
      </h2>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(246,232,239,0.9),rgba(232,245,224,0.88))] p-4 shadow-[0_24px_80px_rgba(78,47,81,0.16)] sm:p-6">
        <div
          className="relative overflow-hidden rounded-[1.5rem] transition-[background-color] duration-500"
          style={{ backgroundColor: frameColor }}
        >
          <img
            src={activeImage}
            alt={`${gallery.eventName} photo ${activeGalleryIndex + 1}`}
            className="h-[220px] w-full rounded-[1.5rem] bg-transparent object-contain shadow-[0_16px_40px_rgba(78,47,81,0.2)] sm:h-[320px] lg:h-[440px]"
            style={{ backgroundColor: "transparent" }}
          />

          {gallery.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
                aria-label={`Show previous ${gallery.eventName} photo`}
              >
                <span aria-hidden="true" className="text-2xl">‹</span>
              </button>
              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
                aria-label={`Show next ${gallery.eventName} photo`}
              >
                <span aria-hidden="true" className="text-2xl">›</span>
              </button>
            </>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-[0.18em] text-dark-purple/80">
            Photo {activeGalleryIndex + 1} of {gallery.images.length}
          </p>
          {gallery.images.length > 1 && (
            <div className="flex gap-2">
              {gallery.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveGalleryIndex(index)}
                  className={`h-3 w-3 rounded-full transition ${
                    index === activeGalleryIndex
                      ? "bg-dark-purple scale-110"
                      : "bg-dark-purple/25 hover:bg-dark-purple/50"
                  }`}
                  aria-label={`Show ${gallery.eventName} photo ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
