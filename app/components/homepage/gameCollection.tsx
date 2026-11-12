import React from "react";
import { homeGames } from "~/siteSettings/homepageGames.json";

const GameCollection: React.FC = () => {
  return (
    <div className="md:mx-20 mx-5 my-16">
      <h2 className="font-ls sm:text-6xl text-4xl md:my-14 my-6 text-center md:text-left md:mx-10 text-dark-purple uppercase">
        Game Collection
      </h2>
      <div className="flex text-md sm:text-xl my-6 text-center md:text-left justify-center md:justify-start md:mx-10 font-bold font-corbert text-dark-purple">
        Here are some member-made games during our game jam events!
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-5 2xl:gap-8 w-full min-h-[40vh] lg:min-h-[50vh]">
        {homeGames.map((game) => (
          <div
            className="relative flex w-full h-full rounded-3xl overflow-hidden group bg-white/35 backdrop-blur-xl border border-[#f2c5d3]/70 hover:-translate-y-1 hover:shadow-xl hover:rotate-[0.5deg] transition-all duration-300 px-4 py-4"
            key={game.id}
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-0 blur-2xl scale-110 transition-all duration-300"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(242,197,211,0.4), transparent 70%)",
              }}
            />
            <a
              className="relative z-10 w-full h-full flex flex-col"
              href={game.gamelink}
              target={game.target}
            >
              <div className="overflow-hidden rounded-2xl w-full h-[32vw] md:h-[20vw] xl:h-[15vw] 2xl:h-[20vw] shrink-0 relative ring-1 ring-white/50 shadow-md">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 hover:scale-110 transition duration-300"
                  src={game.img}
                  alt={game.alt}
                  loading="lazy"
                />
              </div>
              <div className="justify-start flex-col mt-2 xl:m-2">
                <div className="text-dark-purple font-extrabold font-corbert text-md sm:text-lg md:text-xl lg:text-2xl line-clamp-3">
                  {game.name}
                </div>
                <div className="text-dark-purple font-semibold font-corbert text-xs sm:text-sm md:text-md lg:text-lg xl:text-md 2xl:text-lg">
                  {game.info}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCollection;
