import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import cgdpink from "assets/icons/cgd-transp-pink.png";
import "app/css/animations.css";
import "app/css/background-animation.css";
import "app/css/merch.css";
import { MerchAccessGate } from "~/components/merch/MerchAccessGate";
import { MerchCard } from "~/components/merch/MerchCard";
import { MerchDetailDrawer } from "~/components/merch/MerchDetailDrawer";
import { MerchHero } from "~/components/merch/MerchHero";
import { SizeGuideDrawer } from "~/components/merch/SizeGuideDrawer";
import { ZeffyOrderSection } from "~/components/merch/ZeffyOrderSection";
import { merchCatalog } from "~/lib/merch/config";
import type { MerchProduct } from "~/lib/merch/models";

export const meta: MetaFunction = () => {
  return [
    { title: "Merch | CGD" },
    { name: "description", content: "Welcome to Concordia Game Dev Club!" },
  ];
};

export default function Merch() {
  const [selectedProduct, setSelectedProduct] = useState<MerchProduct | null>(
    null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideReturnTarget, setSizeGuideReturnTarget] = useState<{
    product: MerchProduct;
    imageIndex: number;
  } | null>(null);

  const scrollToOrderForm = () => {
    document
      .getElementById(merchCatalog.orderSection.id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectProduct = (
    product: MerchProduct,
    initialColourway?: string
  ) => {
    const idx = initialColourway
      ? product.getImageIndexForColourway(initialColourway)
      : 0;
    setSizeGuideReturnTarget(null);
    setSelectedImageIndex(idx >= 0 ? idx : 0);
    setSelectedProduct(product);
  };

  const handleOrderFromDrawer = () => {
    setSizeGuideReturnTarget(null);
    setSelectedProduct(null);
    window.setTimeout(scrollToOrderForm, 220);
  };

  const handleOpenSizeGuideFromHero = () => {
    setSizeGuideReturnTarget(null);
    setIsSizeGuideOpen(true);
  };

  const handleOpenSizeGuideFromCard = (currentImageIndex: number) => {
    if (!selectedProduct) return;
    setSizeGuideReturnTarget({
      product: selectedProduct,
      imageIndex: currentImageIndex,
    });
    setSelectedProduct(null);
    setIsSizeGuideOpen(true);
  };

  const handleBackToCardFromSizeGuide = () => {
    if (!sizeGuideReturnTarget) return;
    setIsSizeGuideOpen(false);
    setSelectedImageIndex(sizeGuideReturnTarget.imageIndex);
    setSelectedProduct(sizeGuideReturnTarget.product);
    setSizeGuideReturnTarget(null);
  };

  return (
    <div className="merch-page">
      <MerchAccessGate gate={merchCatalog.accessGate}>
        <main className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 pb-20 space-y-16">
          <MerchHero
            hero={merchCatalog.hero}
            featuredProduct={merchCatalog.getFeaturedProduct()}
            onShopClick={scrollToOrderForm}
            onSizeGuideClick={handleOpenSizeGuideFromHero}
            onSelectProduct={handleSelectProduct}
          />

          <section>
            <div className="mb-6">
              <h2 className="font-ls uppercase text-4xl sm:text-5xl text-dark-purple">
                {merchCatalog.catalogSection.title}
              </h2>
              <p className="font-corbert font-semibold text-base text-dark-purple/80 mt-1">
                {merchCatalog.catalogSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
              {merchCatalog.getAllProducts().map((product) => (
                <MerchCard
                  key={product.id}
                  product={product}
                  onSelect={handleSelectProduct}
                />
              ))}
            </div>
          </section>

          <ZeffyOrderSection
            section={merchCatalog.orderSection}
            campaign={merchCatalog.campaign}
          />
        </main>

        <MerchDetailDrawer
          product={selectedProduct}
          initialImageIndex={selectedImageIndex}
          open={selectedProduct !== null}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProduct(null);
            }
          }}
          onOrderNow={handleOrderFromDrawer}
          onOpenSizeGuide={handleOpenSizeGuideFromCard}
        />

        <SizeGuideDrawer
          sizeGuide={merchCatalog.sizeGuide}
          open={isSizeGuideOpen}
          onOpenChange={(open) => {
            setIsSizeGuideOpen(open);
            if (!open) {
              setSizeGuideReturnTarget(null);
            }
          }}
          onBack={
            sizeGuideReturnTarget ? handleBackToCardFromSizeGuide : undefined
          }
        />
      </MerchAccessGate>

      <div className="background h-full">
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
        <span>
          <img
            src={cgdpink}
            alt="cgd pink alternate logo"
            className="floaties"
          />
        </span>
      </div>
    </div>
  );
}
