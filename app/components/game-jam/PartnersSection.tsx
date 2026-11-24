import React from "react";
import { shrekathonPartners } from "~/components/game-jam/config";
import type { Partner } from "~/components/game-jam/types";
const partnerStyles = [
    {
        shell: "h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36",
        tilt: "-rotate-3 md:-rotate-2",
        offset: "md:translate-y-2",
    },
    {
        shell: "h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40",
        tilt: "rotate-2 md:rotate-3",
        offset: "md:-translate-y-3",
    },
    {
        shell: "h-[7.5rem] w-[7.5rem] sm:h-[8.5rem] sm:w-[8.5rem] md:h-[9.5rem] md:w-[9.5rem]",
        tilt: "-rotate-1",
        offset: "md:translate-y-4",
    },
    {
        shell: "h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36",
        tilt: "rotate-3 md:rotate-2",
        offset: "md:-translate-y-1",
    },
];

const PartnersSection: React.FC<{ partners?: Partner[] }> = ({
    partners = shrekathonPartners,
}) => {
    return (
        <section className="relative max-w-6xl mx-auto mb-24 px-6 py-12 sm:px-8 md:px-12">
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/50 blur-3xl"></div>
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-[#f5c4b3]/35 blur-3xl"></div>

            <div className="relative">
                <div className="relative max-w-5xl mx-auto mb-10 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-purple">
                        Sponsors & Partners
                    </h2>
                    <p className="mt-3 text-base text-gray-700 md:text-lg">

                        
                    </p>
                </div>

                <ul className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-5 sm:gap-x-5 sm:gap-y-6 md:gap-x-6 md:gap-y-7">
                    {partners.map((partner, index) => {
                        const style = partnerStyles[index % partnerStyles.length];
                        const content = (
                            <div
                                className={`relative flex items-center justify-center ${style.shell} ${style.tilt} ${style.offset} transition-transform duration-300 group-hover:scale-105`}
                            >
                                <div
                                    className="absolute inset-0 rounded-full opacity-70 blur-2xl scale-110 transition-all duration-500 group-hover:opacity-100"
                                    style={{
                                        background:
                                            "radial-gradient(circle at center, #7fbf3f 0%, rgba(127,191,63,0.2) 60%, transparent 100%)",
                                    }}
                                ></div>
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="relative z-10 h-full w-full object-contain rounded-full border-[3px] border-white shadow-[0_0_20px_rgba(127,191,63,0.4)]"
                                />
                            </div>
                        );

                        return (
                            <li key={index} className="flex items-center justify-center">
                                <div className="group flex items-center justify-center">
                                    {content}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default PartnersSection;
