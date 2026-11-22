import React from "react";
import { Button } from "~/components/ui/button";
import type { MerchProduct } from "~/lib/merch/models";
import type { MerchHeroDTO } from "~/lib/merch/types";

interface MerchHeroProps {
  hero: MerchHeroDTO;
  featuredProduct?: MerchProduct;
  onShopClick: () => void;
  onSizeGuideClick: () => void;
  onSelectProduct: (product: MerchProduct) => void;
}

export const MerchHero: React.FC<MerchHeroProps> = ({
  hero,
  featuredProduct,
  onShopClick,
  onSizeGuideClick,
  onSelectProduct,
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
      <div className="lg:col-span-7 flex flex-col items-start gap-4">
        <h1 className="font-ls uppercase text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-dark-purple">
          {hero.title}
        </h1>

        <p className="font-corbert font-semibold text-base sm:text-lg text-dark-purple/80 max-w-xl r1">
          {hero.subtitle}
        </p>

        <div className="r2 flex flex-wrap gap-3 pt-1">
          <Button
            type="button"
            onClick={onShopClick}
            className="rounded-full bg-dark-purple hover:bg-dark-purple/90 text-wfull font-corbert font-bold px-6 py-6 text-sm sm:text-base shadow-md active:scale-95 transition-all"
          >
            {hero.primaryCtaLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSizeGuideClick}
            className="rounded-full bg-white/45 hover:bg-white/75 backdrop-blur-md border border-[#f2c5d3]/80 text-dark-purple font-corbert font-bold px-6 py-6 text-sm sm:text-base shadow-sm active:scale-95 transition-all"
          >
            {hero.secondaryCtaLabel}
          </Button>
        </div>

        <div className="r3 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          {hero.trustPoints.map((point) => (
            <span
              key={point}
              className="inline-flex items-center gap-1.5 font-corbert font-semibold text-xs sm:text-sm text-dark-purple/80"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-cgd-pfull"
              />
              {point}
            </span>
          ))}
        </div>
      </div>

      {featuredProduct && (
        <div className="lg:col-span-5">
          <button
            type="button"
            onClick={() => onSelectProduct(featuredProduct)}
            className="relative w-full text-left rounded-3xl overflow-hidden group bg-white/35 backdrop-blur-xl border border-[#f2c5d3]/70 p-4 hover:-translate-y-1 hover:shadow-xl hover:rotate-[0.5deg] transition-all duration-300"
          >
            <div className="relative rounded-2xl aspect-[1/0.92] w-full overflow-hidden ring-1 ring-white/50 shadow-md flex flex-col justify-between p-5">
              <img
                src={featuredProduct.primaryImage.src}
                alt={featuredProduct.primaryImage.alt}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-300"
                loading="eager"
              />

              <div className="relative z-10 mt-auto bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl px-4 py-3 shadow-sm">
                <span className="block text-[11px] font-corbert font-extrabold uppercase tracking-wider text-cgd-pfull">
                  {featuredProduct.featuredBannerText}
                </span>
                <strong className="block font-corbert font-extrabold text-base text-dark-purple">
                  {featuredProduct.name} — {featuredProduct.formattedPrice}
                </strong>
              </div>
            </div>
          </button>
        </div>
      )}
    </section>
  );
};
