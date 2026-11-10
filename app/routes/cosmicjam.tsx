import type { MetaFunction } from "@remix-run/node";
import "app/css/background-animation.css";
import "app/css/cosmic-jam.css";
import Timetable from "../components/game-jam/Timetable";
import Venue from "../components/game-jam/Venue";
import { useState } from "react";
import cgdpink from "assets/icons/cgd-transp-pink.png";
import MentorsSection from "~/components/game-jam/MentorsSection";
import PartnersSection from "~/components/game-jam/PartnersSection";
import Judging from "../components/game-jam/Judging"
import Winners from "../components/game-jam/Winners";
import PhotoGallery from "~/components/game-jam/PhotoGallery";
import {
  cosmicJamGallery,
  cosmicJamJudging,
  cosmicJamMentors,
  cosmicJamPartners,
  cosmicJamSchedule,
  cosmicJamVenue,
  cosmicJamWinners,
} from "~/components/game-jam/config";

const cosmicJamPoster = "/assets/NewEvents/CosmicJam_Square.png";
const themeRevealVideo = "/assets/CosmicJam/HellDiver_Parody_CMJ.mp4";
const themeLayersIdeas = [
  "67 THOUSAND YEARS LATER... [1]",
  "THE GROUND IS OPTIONAL [2]",
  "PLANETARY ALIGNMENT [2]",
  "AURA FARMING? [1]",
  "ALL ROADS LEAD TO THE BLACK HOLE [1]",
  "THE DROID WE'RE LOOKING FOR [2]",
  "HYPERSPACE JUMP! [1]",
  "COSMICJAM❌ COSMIC BOOGEYMAN✅ [1]",
  "WHO NEEDS ROADS WHEN YOU HAVE HOLES? [1]",
  "IT'S 9 PLANETS, RIGHT? [2]"
];

export const meta: MetaFunction = () => {
  return [
    { title: "Cosmic Jam 2026 | CGD" },
    {
      name: "description",
      content: "Official Cosmic Jam 2026 event page by Concordia Game Dev.",
    },
    { icon: "./favicon.ico" },
  ];
};
export default function CosmicJam() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="cosmic-jam-page relative px-4 py-32 bg-[linear-gradient(180deg,#050006_0%,#260018_52%,#080042_100%)] flex-grow overflow-hidden font-corbert">
      <div className="background h-full" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>
            <img src={cgdpink} alt="" className="floaties" />
          </span>
        ))}
      </div>
      <div className="relative z-10">
      <header className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 mb-24 max-w-6xl mx-auto">
        <div className="flex-shrink-0">
          <img
            src={cosmicJamPoster}
            alt="Cosmic Jam 2026 Poster"
            className="w-64 md:w-80 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.35)] transform hover:scale-[1.03] transition-all duration-500 ease-out"
            onClick={() => setIsOpen(true)}
          />
        </div>

        <div className="text-center md:text-left font-corbert font-bold">
          <h1 className="text-5xl sm:text-6xl font-bold text-dark-purple mb-4">
            <span>Cosmic Jam 2026</span>
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            October 9–11, 2026 • Concordia University, Montreal
          </p>
          <p className="text-lg text-gray-600 mb-6">
            October 9 at 5:00 p.m. - October 11 at 8:00 p.m. (EST)
          </p>

          <a
            href="https://itch.io/jam/cosmic-jam-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-dark-purple hover:brightness-100 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-md transition"
          >
            🚀 Join Cosmic Jam on itch.io
          </a>

          <p className="text-lg text-gray-600 mb-6">
            
          </p>
          
          <a
            href="https://www.twitch.tv/concordiagamedevelopment"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-dark-purple hover:brightness-100 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-md transition"
          >
            📺 Follow Concordia Game Development on Twitch
          </a>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={cosmicJamPoster}
            alt="Cosmic Jam 2026 Full Poster"
            className="max-w-3xl w-11/12 rounded-2xl shadow-2xl transition-all duration-300"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-gray-300"
          >
            ×
          </button>
        </div>
      )}

      <section className="max-w-6xl mx-auto mb-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(246,232,239,0.92),rgba(232,245,224,0.88))] shadow-[0_24px_80px_rgba(78,47,81,0.16)]">
          <div className="absolute -left-20 top-8 h-44 w-44 rounded-full bg-[rgba(130,180,92,0.25)] blur-3xl" />
          <div className="absolute -right-16 bottom-6 h-48 w-48 rounded-full bg-[rgba(255,196,126,0.24)] blur-3xl" />

          <div className="relative grid items-start gap-10 px-6 pb-8 pt-9 sm:px-8 sm:pb-10 sm:pt-11 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-10">
            <div className="text-center md:text-left lg:pt-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-dark-purple">
                Theme Reveal
              </h2>

              <p className="mt-4 text-lg sm:text-xl leading-relaxed text-gray-700">
                Cosmic Jam&apos;s theme is {" "}
                <span className="inline-block rounded-full bg-[rgba(130,180,92,0.18)] px-4 py-1 text-dark-purple">
                  ORBIT 🛰️
                </span>
                .
              </p>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
                Below are some modifiers to the theme that you can use to inspire your game ideas. You can use one, some, or all of them in your game jam submission! You will be awarded bonus points for their successful implementation in your game. The modifiers are:
              </p>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {themeLayersIdeas.map((idea) => (
                  <div
                    key={idea}
                    className="rounded-2xl border border-dark-purple/10 bg-white/70 px-4 py-4 text-base leading-relaxed text-gray-700 shadow-sm backdrop-blur-sm"
                  >
                    {idea}
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[320px]">
              <div className="rounded-[2rem] bg-[#2b182d] p-3 shadow-[0_25px_55px_rgba(43,24,45,0.35)] ring-1 ring-white/20">
                <div className="mb-3 flex items-center justify-between px-2 text-xs uppercase tracking-[0.24em] text-pink-100">
                  
                </div>

                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={cosmicJamPoster}
                  className="aspect-[9/16] w-full rounded-[1.4rem] bg-black object-cover shadow-inner"
                >
                  <source src={themeRevealVideo} type="video/mp4" />
                  Your browser does not support the theme reveal video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mb-20 text-center md:text-left font-corbert font-bold">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-purple mb-6">
          Description
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to Cosmic Jam, Concordia Game Development Club’s 48-hour game jam happening from October 9th to October 11th!



          For two full days, participants will work in teams (or solo!) to design, develop, and bring a game to life from scratch. Whether you’re a programmer, artist, designer, writer, sound designer, or just someone who loves creative chaos, this is your chance to build something incredible in a fun, high-energy environment.

        </p>
      </section>

      <section className="max-w-5xl mx-auto mb-24 text-center md:text-left font-corbert font-bold">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-purple mb-6">
          Mentors
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Our mentors are industry professionals and creators who will guide you
          through every stage of the development process: from concept and
          design to final implementation. Stuck on a problem? Need feedback on your game idea? Our mentors are here to help you succeed and make the most of your Cosmic Jam experience.
        </p>
      </section>
      <MentorsSection mentors={cosmicJamMentors} />
      <Venue venue={cosmicJamVenue} />
      <Timetable schedule={cosmicJamSchedule} />
      <Judging judging={cosmicJamJudging} />
      <Winners winners={cosmicJamWinners} />
        <PhotoGallery gallery={cosmicJamGallery} />
        <PartnersSection partners={cosmicJamPartners} />
        <section className="max-w-5xl mx-auto mb-24 px-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-purple mb-6">
            Special Thanks
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            A huge thank you to Ubisoft Montreal and Michel Kunta for their
            support of Cosmic Jam and for welcoming our community. We
            couldn&apos;t have done it without you!
          </p>
          <img
            src="/assets/CosmicJam/UbisoftThanks.jpg"
            alt="Cosmic Jam participants with Ubisoft Montreal"
            className="block w-full max-w-2xl mx-auto rounded-2xl border-[3px] border-white shadow-lg"
            loading="lazy"
          />
        </section>
      </div>
    </div>
  );
}
