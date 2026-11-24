import React from "react";
import {useState} from "react";
import newEvents from "~/siteSettings/hotevents.json";
import { Link } from "@remix-run/react";
import { useAverageColor } from "~/lib/useAverageColor";

const NewEventsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextEvent = () =>{
    setCurrentIndex((prev)=>
    prev === newEvents.length-1 ? 0:prev+1);
  };

  const prevEvent = () =>{
    setCurrentIndex((prev)=>
    prev === 0 ? newEvents.length-1 :prev-1);
  };
  
  const event = newEvents[currentIndex];
  const frameColor = useAverageColor(event?.img);

  return (
    <section className="md:mx-20 mx-6 my-24">
      <h2 className="font-ls sm:text-6xl text-4xl font-bold text-dark-purple uppercase md:mx-10 text-center md:text-left">
        Spotlight Events
      </h2>

      <p className="text-md sm:text-xl mt-4 font-corbert font-semibold text-dark-purple/80 text-center md:text-left md:mx-10">
        Don’t miss our latest happenings!
      </p>

      <div className="mt-10 flex items-center justify-center gap-4">

        <button onClick={prevEvent}
          aria-label="Previous Event"
            className="
              flex items-center justify-center
              w-12 h-12 md:w-14 md:h-14
              rounded-full

              bg-white/40 backdrop-blur-md
              border border-[#f2c5d3]/70
              text-dark-purple text-2xl md:text-3xl font-bold
              shadow-md
              hover:shadow-lg
              hover:scale-110
              hover:bg-[#f2c5d3]/40
              transition-all duration-300">
               ❮
        </button>

        <Link
          to={event.link}
          target={event.target}
          key={event.id}
          className="
            relative
            w-full max-w-4xl
            flex items-center gap-4 md:flex-row flex-col
            rounded-3xl overflow-hidden
            group

            bg-white/35 backdrop-blur-xl
            border border-[#f2c5d3]/70
            hover:-translate-y-1 hover:shadow-xl
            hover:rotate-[0.5deg]
            transition-all duration-300
            px-4 py-4">
          <div
            className="
              absolute inset-0
              rounded-3xl
              opacity-0
              blur-2xl
              scale-110
              transition-all duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(242,197,211,0.4), transparent 70%)",
            }}
          />

          {event.img && (
            <div
              className="overflow-hidden rounded-2xl w-full md:w-56 lg:w-64 xl:w-96 aspect-[4/3] xl:aspect-[5/3] shrink-0 relative ring-1 ring-white/50 shadow-md transition-colors duration-300"
              style={{ backgroundColor: frameColor }}
            >
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-full object-contain object-top group-hover:scale-110 hover:scale-110 transition duration-300"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex flex-col justify-start self-start relative z-10 gap-2 md:py-4">
            <h3 className="title text-3xl sm:text-4xl text-cgd-pink/85 text-left uppercase">
              {event.title}
            </h3>

            {event.date && (
              <span
                className="
                  inline-block w-fit
                  px-3 py-1 rounded-full
                  text-xs sm:text-sm font-corbert font-semibold
                  bg-[#f2c5d3]/50 text-dark-purple/85
                  shadow-sm">
                {event.date}
              </span>
            )}
          </div>
        </Link>

        <button onClick={nextEvent} aria-label="Next Event"
          className="
            flex items-center justify-center
            w-12 h-12 md:w-14 md:h-14
            rounded-full

            bg-white/40 backdrop-blur-md
            border border-[#f2c5d3]/70

            text-dark-purple text-2xl md:text-3xl font-bold

            shadow-md
            hover:shadow-lg
            hover:scale-110
            hover:bg-[#f2c5d3]/40

            transition-all duration-300">
            ❯
        </button>
      </div>
    </section>
  );
};

export default NewEventsSection;
