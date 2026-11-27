import React, { useEffect, useRef, useState } from "react";
import type { ZeffyCampaign } from "~/lib/merch/models";
import type { MerchOrderSectionDTO } from "~/lib/merch/types";

interface ZeffyOrderSectionProps {
  section: MerchOrderSectionDTO;
  campaign: ZeffyCampaign;
}

export const ZeffyOrderSection: React.FC<ZeffyOrderSectionProps> = ({
  section,
  campaign,
}) => {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setUseFallback(false);
    let isMounted = true;
    let fallbackTimer: number | undefined;

    const script = document.createElement("script");
    script.src = campaign.scriptUrl;
    script.async = true;
    script.dataset.cgdZeffyEmbed = "true";

    script.onerror = () => {
      if (isMounted) {
        setUseFallback(true);
      }
    };

    script.onload = () => {
      fallbackTimer = window.setTimeout(() => {
        if (
          isMounted &&
          embedContainerRef.current &&
          embedContainerRef.current.childElementCount === 0
        ) {
          setUseFallback(true);
        }
      }, 2500);
    };

    document.body.appendChild(script);

    return () => {
      isMounted = false;
      if (fallbackTimer !== undefined) {
        window.clearTimeout(fallbackTimer);
      }
      script.remove();
      if (embedContainerRef.current) {
        embedContainerRef.current.innerHTML = "";
      }
    };
  }, [campaign.scriptUrl, campaign.formPath]);

  return (
    <section
      id={section.id}
      className="scroll-mt-24 rounded-3xl bg-white/35 backdrop-blur-xl border border-[#f2c5d3]/70 p-6 sm:p-8 shadow-sm"
    >
      <h2 className="font-ls uppercase text-3xl sm:text-4xl text-dark-purple">
        {section.title}
      </h2>

      <p className="font-corbert font-semibold text-sm sm:text-base text-dark-purple/80 mt-1">
        {section.subtitle}
      </p>

      <div className="mt-4 mb-6 rounded-2xl bg-[#f2c5d3]/40 border border-white/50 px-4 py-3 text-xs sm:text-sm font-corbert font-semibold text-dark-purple/85">
        {section.zeffyNote}
      </div>

      <div>
        <div
          ref={embedContainerRef}
          data-zeffy-embed=""
          data-form-url={campaign.formPath}
          className={useFallback ? "hidden" : "min-h-[450px] w-full"}
        />

        {useFallback && (
          <div
            className="relative overflow-hidden w-full rounded-2xl bg-white/60"
            style={{ height: campaign.fallbackHeightPx }}
          >
            <iframe
              title={campaign.iframeTitle}
              src={campaign.embedUrl}
              allow="payment"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        )}
      </div>
    </section>
  );
};
