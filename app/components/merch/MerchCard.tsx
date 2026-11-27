import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import type { MerchProduct } from "~/lib/merch/models";

interface MerchCardProps {
  product: MerchProduct;
  onSelect: (product: MerchProduct, initialColourway?: string) => void;
}

export const MerchCard: React.FC<MerchCardProps> = ({ product, onSelect }) => {
  const [selectedColourway, setSelectedColourway] = useState<string | undefined>(
    product.swatches[0]?.name
  );

  const displayImage = product.getPrimaryImageForColourway(selectedColourway);

  return (
    <article
      onClick={() => onSelect(product, selectedColourway)}
      className="relative flex flex-col w-full h-full rounded-3xl overflow-hidden group cursor-pointer bg-white/35 backdrop-blur-xl border border-[#f2c5d3]/70 hover:-translate-y-1 hover:shadow-xl hover:rotate-[0.5deg] transition-all duration-300 p-4"
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 blur-2xl scale-110 transition-all duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(242,197,211,0.4), transparent 70%)",
        }}
      />

      <div className="relative z-10 overflow-hidden rounded-2xl w-full h-48 shrink-0 ring-1 ring-white/50 shadow-md flex items-center justify-center">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-dark-purple/90 text-wfull text-[10px] font-corbert font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}

        <img
          src={displayImage.src}
          alt={displayImage.alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 gap-2 pt-3 px-1">
        <span className="text-[11px] font-corbert font-bold uppercase tracking-wider text-dark-purple/70">
          {product.category}
        </span>

        <h3 className="font-corbert font-extrabold text-lg text-dark-purple leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <span className="font-corbert font-extrabold text-base text-cgd-pfull">
            {product.formattedPrice}
          </span>

          {product.hasSwatches && (
            <div className="flex items-center gap-1.5">
              {product.swatches.map((swatch) => {
                const isSelected = swatch.name === selectedColourway;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColourway(swatch.name);
                    }}
                    className={`w-4 h-4 rounded-full border border-dark-purple/25 shadow-sm transition-transform ${
                      isSelected
                        ? "ring-2 ring-offset-1 ring-dark-purple scale-110"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                    aria-label={swatch.name}
                    aria-pressed={isSelected}
                  />
                );
              })}
            </div>
          )}
        </div>

        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product, selectedColourway);
          }}
          className="w-full mt-2 rounded-full bg-dark-purple hover:bg-dark-purple/90 text-wfull font-corbert font-bold text-sm active:scale-95 transition-all"
        >
          {product.ctaLabel}
        </Button>
      </div>
    </article>
  );
};
