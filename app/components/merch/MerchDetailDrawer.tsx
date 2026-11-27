import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ClientOnly } from "remix-utils/client-only";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import type { MerchProduct } from "~/lib/merch/models";
import { useAverageColor } from "~/lib/useAverageColor";

interface MerchDetailDrawerProps {
  product: MerchProduct | null;
  initialImageIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderNow: () => void;
  onOpenSizeGuide: (currentImageIndex: number) => void;
}

export const MerchDetailDrawer: React.FC<MerchDetailDrawerProps> = ({
  product,
  initialImageIndex = 0,
  open,
  onOpenChange,
  onOrderNow,
  onOpenSizeGuide,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!product || !open) return;
    const clampedIndex = Math.max(
      0,
      Math.min(initialImageIndex, product.images.length - 1)
    );
    setActiveImageIndex(clampedIndex);
  }, [product, open, initialImageIndex]);

  const activeImage = product
    ? (product.images[activeImageIndex] ?? product.primaryImage)
    : undefined;
  const activeColourway = product?.getColourwayForImageIndex(activeImageIndex);
  const frameColor = useAverageColor(activeImage?.src);

  const showPreviousImage = () => {
    if (!product) return;
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? product.images.length - 1 : currentIndex - 1
    );
  };

  const showNextImage = () => {
    if (!product) return;
    setActiveImageIndex((currentIndex) =>
      currentIndex === product.images.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <ClientOnly fallback={null}>
      {() => (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            {product && activeImage && (
              <>
                <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-6 pb-4">
                  <div
                    className="relative overflow-hidden rounded-2xl h-56 sm:h-72 w-full ring-1 ring-white/60 shadow-md flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: frameColor }}
                  >
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-dark-purple/90 text-wfull text-[10px] font-corbert font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    <img
                      src={activeImage.src}
                      alt={activeImage.alt}
                      className="w-full h-full object-contain"
                    />

                    {product.hasMultipleImages && (
                      <>
                        <button
                          type="button"
                          onClick={showPreviousImage}
                          aria-label={`Show previous ${product.name} image`}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/75 hover:bg-white text-dark-purple shadow-md backdrop-blur-sm border border-[#f2c5d3]/70 rounded-full h-9 w-9 flex items-center justify-center transition"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={showNextImage}
                          aria-label={`Show next ${product.name} image`}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/75 hover:bg-white text-dark-purple shadow-md backdrop-blur-sm border border-[#f2c5d3]/70 rounded-full h-9 w-9 flex items-center justify-center transition"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {product.hasMultipleImages && (
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="text-xs font-corbert font-bold uppercase tracking-wider text-dark-purple/75">
                        Photo {activeImageIndex + 1} of {product.images.length}
                      </p>
                      <div className="flex items-center gap-2">
                        {product.images.map((img, idx) => (
                          <button
                            key={img.src}
                            type="button"
                            onClick={() => setActiveImageIndex(idx)}
                            aria-label={`View image ${idx + 1}`}
                            className={`h-2.5 w-2.5 rounded-full transition ${
                              idx === activeImageIndex
                                ? "bg-dark-purple scale-110"
                                : "bg-dark-purple/25 hover:bg-dark-purple/50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <DialogHeader className="px-0 pt-4 text-left gap-2">
                    <span className="inline-block w-fit px-3 py-1 rounded-full text-xs font-corbert font-bold uppercase tracking-wider bg-[#f2c5d3]/50 text-dark-purple">
                      {product.category}
                    </span>

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <DialogTitle className="font-ls uppercase text-3xl text-dark-purple">
                        {product.name}
                      </DialogTitle>
                      <span className="text-xl font-corbert font-extrabold text-cgd-pfull">
                        {product.formattedPrice}
                      </span>
                    </div>

                    <DialogDescription className="font-corbert font-semibold text-base text-dark-purple/85 pt-1">
                      {product.description}
                    </DialogDescription>
                  </DialogHeader>

                  <Separator className="my-4 bg-dark-purple/15" />

                  <div className="flex flex-col gap-4">
                    {product.hasSwatches && (
                      <div className="flex flex-col gap-2">
                        <span className="font-corbert font-bold text-xs uppercase tracking-wider text-dark-purple/70">
                          Colourways
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {product.swatches.map((swatch) => {
                            const isSelected = swatch.name === activeColourway;
                            return (
                              <button
                                key={swatch.name}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => {
                                  const targetIndex =
                                    product.getImageIndexForColourway(
                                      swatch.name
                                    );
                                  if (targetIndex !== -1) {
                                    setActiveImageIndex(targetIndex);
                                  }
                                }}
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-corbert font-semibold text-xs shadow-sm transition ${
                                  isSelected
                                    ? "bg-white border-dark-purple ring-2 ring-dark-purple/25 text-dark-purple"
                                    : "bg-white/70 border-[#f2c5d3]/80 hover:bg-white text-dark-purple/85"
                                }`}
                              >
                                <span
                                  className="w-3 h-3 rounded-full border border-dark-purple/20"
                                  style={{ backgroundColor: swatch.hex }}
                                />
                                {swatch.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {product.hasSizing && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-corbert font-bold text-xs uppercase tracking-wider text-dark-purple/70">
                            Available Sizes
                          </span>
                          <button
                            type="button"
                            onClick={() => onOpenSizeGuide(activeImageIndex)}
                            className="font-corbert font-bold text-xs text-cgd-pfull hover:underline"
                          >
                            View Size Guide
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.sizeOptions.map((size) => (
                            <span
                              key={size}
                              className="inline-flex items-center justify-center min-w-[2.5rem] px-3 py-1 rounded-full bg-white/80 border border-[#f2c5d3]/80 font-corbert font-bold text-xs text-dark-purple shadow-sm"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      {product.detailHighlights.map((highlight) => (
                        <p
                          key={highlight}
                          className="font-corbert text-sm font-semibold text-dark-purple/80"
                        >
                          {highlight}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter className="shrink-0 px-6 py-4 border-t border-[#f2c5d3]/40 bg-white/60 flex-col sm:flex-row gap-3 sm:space-x-0">
                  <Button
                    type="button"
                    onClick={onOrderNow}
                    className="w-full rounded-full bg-dark-purple hover:bg-dark-purple/90 text-wfull font-corbert font-bold py-6 text-base active:scale-95 transition-all"
                  >
                    {product.ctaLabel}
                  </Button>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto rounded-full border-[#f2c5d3] bg-white/70 hover:bg-white text-dark-purple font-corbert font-bold py-6 px-6"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  );
};
