import cgdpink from "assets/icons/cgd-transp-pink.png";
import type { MetaFunction } from "@remix-run/node";
import GameJamEvent from "~/components/events/gjcard";
import EventCard from "~/components/events/eventcard";
import events from "~/siteSettings/events.json";
import gj2024winner from "assets/icons/gj2024_winner.png";
import ggj from "assets/icons/ggj2024.png";
import ggjM from "assets/icons/ggj_banner.png";
import cgd2023 from "assets/icons/cgdfall2023.png";
import cgd2023M from "assets/icons/cgdfall2023_banner.png";
import cgd2022 from "assets/icons/cgdfall2022.png";
import cgd2022M from "assets/icons/cgdfall2022_banner.png";
import megamigs from "assets/icons/megamigs2022.png";
import megamigsM from "assets/icons/megamigs2022_banner.jpg";

export const meta: MetaFunction = () => {
  return [
    { title: "Events | CGD" },
    { name: "description", content: "Welcome to Concordia Game Dev Club!" },
    { icon: "./favicon.ico" },
  ];
};

export default function DashboardEvents() {
  return (
    <div className="px-4 py-32 bg-gradient-to-b from-bg-tl to-bg-br">
      <h1 className="sm:text-7xl text-5xl align-middle pb-11">Events</h1>

      <div className="flex flex-col gap-3 items-center mb-10 md:mx-8 xl:mx-16 2xl:mx-28 3xl:mx-44 4xl:mx-64 xl:px-12 2xl:px-24 3xl:px-32 4xl:px-52 mx-2">
        <GameJamEvent
          title={events[0].title}
          date={events[0].date}
          description={events[0].description}
          theme={events[0].theme}
          location={events[0].location}
          winners={events[0].winners}
          placeholder={gj2024winner}
          imageD={ggj}
          imageM={ggjM}
        />
        <GameJamEvent
          title={events[1].title}
          date={events[1].date}
          description={events[1].description}
          theme={events[1].theme}
          location={events[1].location}
          winners={events[1].winners}
          imageD={cgd2023}
          imageM={cgd2023M}
        />
        <EventCard
          title={events[2].title}
          date={events[2].date}
          description={events[2].description}
          location={events[2].location}
          imageD={megamigs}
          imageM={megamigsM}
        />
        <GameJamEvent
          title={events[3].title}
          date={events[3].date}
          description={events[3].description}
          theme={events[3].theme}
          location={events[3].location}
          winners={events[3].winners}
          imageD={cgd2022}
          imageM={cgd2022M}
        />
      </div>
      {/* <div className="background h-full">
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
      </div> */}
    </div>
  );
}
