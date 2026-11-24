import type { MetaFunction } from "@remix-run/node";
import cgdpink from "assets/icons/cgd-transp-pink.png";
import learnathonBanner from "public/assets/Learnathon/learnathon.png";
import { useState } from "react";
import MentorsSection from "~/components/game-jam/MentorsSection";
import ShadowersSection from "~/components/game-jam/ShadowersSection";
import Timetable from "~/components/game-jam/Timetable";
import Venue from "~/components/game-jam/Venue";
import {
  learnathonMentors,
  learnathonSchedule,
  learnathonShadowers,
  learnathonVenue,
} from "~/components/game-jam/config";

export const meta: MetaFunction = () => {
  return [
    { title: "Learnathon 2025 | CGD" },
    {
      name: "description",
      content: "Official Learnathon 2025 event page by Concordia Game Dev.",
    },
    { icon: "./favicon.ico" },
  ];
};

export default function Learnathon25() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative px-4 py-32 bg-gradient-to-b from-bg-tl to-bg-br flex-grow overflow-hidden">
      <header className="flex flex-col md:flex-row items-center justify-center gap-10 mb-24 max-w-6xl mx-auto">
        <div className="flex-shrink-0">
          <img
            src={learnathonBanner}
            alt="Learnathon 2025 Poster"
            className="w-64 md:w-80 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.35)] transform hover:scale-[1.03] transition-all duration-500 ease-out"
            onClick={() => setIsOpen(true)}
          />
        </div>

        <div className="text-center md:text-left font-corbert font-bold">
          <h1 className="text-5xl sm:text-6xl font-bold text-dark-purple mb-4">
            Learnathon 2025
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            November 8–9, 2025 • Concordia University, Montreal
          </p>
          <p className="text-lg text-gray-600 mb-6">
            8:00 a.m. November 8 – 8:00 p.m. November 9 (EST)
          </p>

          <a
            href="https://www.zeffy.com/en-CA/ticketing/learnathon--2025"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-dark-purple hover:brightness-150 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-md transition"
          >
            🎟️ Register on Zeffy
          </a>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={learnathonBanner}
            alt="Learnathon Full Poster"
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
      <section className="max-w-5xl mx-auto mb-20 text-center md:text-left font-corbert font-bold">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-purple mb-6">
          Description
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          During the Learnathon, you will be working on a video game from
          scratch, following the tutorials designed and led by our lecturers.
          The main objective is for everyone to dive into the fantastic realm of
          game development, and to build even more connections with your fellow
          participants! By nature, this is a non-competitive event, therefore no
          pressure will be put on yourself and projects, take your time, and
          most importantly, enjoy the process!
        </p>
      </section>

      <section className="max-w-5xl mx-auto mb-24 text-center md:text-left font-corbert font-bold">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-purple mb-6">
          Mentors
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          Our mentors are industry professionals and creators who will guide you
          through every stage of the development process — from concept and
          design to final implementation. Throughout the weekend, you’ll follow
          their curated workshops to learn core skills, build individual game
          components, and bring them together into your final playable project.
        </p>
      </section>
      <MentorsSection mentors={learnathonMentors} />

      <section className="max-w-5xl mx-auto mb-32 text-center md:text-left font-corbert font-bold">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-purple mb-6">
          Shadowers
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          Shadowers are people who will assist you with your technical problems,
          as well as your game ideas. If you have an idea on how to make your
          game even more exciting, but you are not sure how you should approach
          it, or you want to make sure it is viable, then asking shadowers
          should be the way to go.
        </p>
      </section>
      <ShadowersSection shadowers={learnathonShadowers} />

      <Timetable schedule={learnathonSchedule} />
      <Venue venue={learnathonVenue} />

      <div className="background h-full">
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <span key={i}>
              <img src={cgdpink} alt="CGD pink logo" className="floaties" />
            </span>
          ))}
      </div>
    </div>
  );
}
