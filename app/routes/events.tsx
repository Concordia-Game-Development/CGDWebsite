import cgdpink from "assets/icons/cgd-transp-pink.png";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import GameJamEvent from "~/components/events/gjcard";
import EventCard from "~/components/events/eventcard";
import events from "~/siteSettings/events.json";
import ggj2024winner from "assets/icons/gj2024_winner.png";
import cgdjam2023winner from "assets/icons/awayback.png";
import cgdjam2022winner from "assets/icons/smokingkills.png";
import ggj from "assets/icons/ggj2024.png";
import ggjM from "assets/icons/ggj_banner.png";
import cgd2023 from "assets/icons/cgdfall2023.png";
import cgd2023M from "assets/icons/cgdfall2023_banner.png";
import cgd2022 from "assets/icons/cgdfall2022.png";
import cgd2022M from "assets/icons/cgdfall2022_banner.png";
import megamigs from "assets/icons/megamigs2022.png";
import megamigsM from "assets/icons/megamigs2022_banner.jpg";
import ggj25 from "assets/icons/ggj25.png";
import ggj2025winner from "assets/icons/ggj25winner.png";
import gamenightaugust25 from "assets/icons/gamenightaugust25.jpg";
import learnathon25 from "public/assets/Learnathon/learnathon.png";
import lizard25 from "assets/icons/lizardlounge25.png";
import meetgeek25 from "assets/icons/meetgeek25.png";
import gamenightoct2025 from "assets/icons/gamenightoct.jpg";
import ZaidWorkshop from "assets/icons/zaidworkshop.png";
import zacharyworkshop from "assets/icons/zackaryworkshop.jpg";
import darioworkshop from "assets/icons/Dario Workshop.png";
import rosieworkshop from "assets/icons/Rose Workshop.png";
import shrekathon from "assets/icons/Shrekathonjam.jpg";
import gamenight from "assets/icons/gamenight-feb.png";
import GameSummit from "assets/icons/SGDS.jpg";
import CosmicJam from "assets/icons/CosmicJam.png";
import recurringevents from "~/siteSettings/recurringevents.json";
import MeetAndGeek from "assets/icons/MeetAndGeek2026.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const meta: MetaFunction = () => {
  return [
    { title: "Events | CGD" },
    { name: "description", content: "Welcome to Concordia Game Dev Club!" },
    { icon: "./favicon.ico" },
  ];
};

export default function DashboardEvents() {
  return (
    <div className="px-4 py-32 md:bg-none bg-gradient-to-b from-bg-tl to-bg-br flex-grow ">
      <h1 className="sm:text-7xl text-5xl align-middle pb-11 text-center text-dark-purple">
        Events
      </h1>

      <div className="flex flex-col gap-3 items-center mb-10 md:mx-8 xl:mx-16 2xl:mx-28 3xl:mx-44 4xl:mx-64 xl:px-12 2xl:px-24 3xl:px-32 4xl:px-52 mx-2 riseup">
        <Accordion
          type="multiple"
          className="w-full "
          defaultValue={["upcoming-events", "recurring-events", "past-events"]}
        >
          <AccordionItem value="upcoming-events">
            <AccordionTrigger className="text-3xl md:text-5xl text-dark-purple uppercase">
              Upcoming Events
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-6 w-full px-4 sm:px-6 pt-4 pb-8">
              <p className="text-xl text-dark-purple text-center">
                No upcoming events right now. Stay tuned!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="recurring-events">
            <AccordionTrigger className="text-3xl md:text-5xl text-dark-purple uppercase">
              Recurring Events
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-6 w-full px-4 sm:px-6 pt-4 pb-8">
              <EventCard
                title={recurringevents[0].title}
                date={recurringevents[0].date}
                description={recurringevents[0].description}
                location={recurringevents[0].location}
                imageD={gamenight}
                imageM={gamenight}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="past-events">
            <AccordionTrigger className="text-3xl md:text-5xl text-dark-purple uppercase">
              Past Events
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-6 w-full px-4 sm:px-6 pt-4 pb-8">
              <GameJamEvent
                title={events[17].title}
                jampage={events[17].jampage}
                date={events[17].date}
                description={events[17].description}
                location={events[17].location}
                imageD={CosmicJam}
                imageM={CosmicJam}
              />

              <EventCard
                title={events[0].title}
                date={events[0].date}
                description={events[0].description}
                location={events[0].location}
                imageD={MeetAndGeek}
                imageM={MeetAndGeek}
              />

              <EventCard
                title={events[1].title}
                date={events[1].date}
                description={events[1].description}
                location={events[1].location}
                imageD={GameSummit}
                imageM={GameSummit}
              />

              <EventCard
                title={events[2].title}
                date={events[2].date}
                description={events[2].description}
                location={events[2].location}
                imageD={shrekathon}
                imageM={shrekathon}
                link="/shrekathon"
              />

              <EventCard
                title={events[3].title}
                date={events[3].date}
                description={events[3].description}
                location={events[3].location}
                imageD={darioworkshop}
                imageM={darioworkshop}
              />

              <EventCard
                title={events[4].title}
                date={events[4].date}
                description={events[4].description}
                location={events[4].location}
                imageD={zacharyworkshop}
                imageM={zacharyworkshop}
              />

              <EventCard
                title={events[5].title}
                date={events[5].date}
                description={events[5].description}
                location={events[5].location}
                imageD={gamenight}
                imageM={gamenight}
                eventpictures={[
                  "/assets/Events/Gamenight1.jpg",
                  "/assets/Events/Gamenight2.jpg",
                  "/assets/Events/Gamenight3.jpg",
                ]}
              />

              <EventCard
                title={events[6].title}
                date={events[6].date}
                description={events[6].description}
                location={events[6].location}
                imageD={ZaidWorkshop}
                imageM={ZaidWorkshop}
              />

              <EventCard
                title={events[7].title}
                date={events[7].date}
                description={events[7].description}
                location={events[7].location}
                imageD={learnathon25}
                imageM={learnathon25}
                link="/learnathon"
              />

              <EventCard
                title={events[8].title}
                date={events[8].date}
                description={events[8].description}
                location={events[8].location}
                imageD={gamenightoct2025}
                imageM={gamenightoct2025}
              />

              <EventCard
                title={events[9].title}
                date={events[9].date}
                description={events[9].description}
                location={events[9].location}
                imageD={lizard25}
                imageM={lizard25}
              />

              <EventCard
                title={events[10].title}
                date={events[10].date}
                description={events[10].description}
                location={events[10].location}
                imageD={meetgeek25}
                imageM={meetgeek25}
              />

              <EventCard
                title={events[11].title}
                date={events[11].date}
                description={events[11].description}
                location={events[11].location}
                imageD={gamenightaugust25}
                imageM={gamenightaugust25}
                eventpictures={[
                  "/assets/Events/gnsep25-1.jpg",
                  "/assets/Events/gnsep25-2.jpg",
                  "/assets/Events/gnsep25-3.jpg",
                ]}
              />

              <GameJamEvent
                title={events[12].title}
                jampage={events[12].jampage}
                date={events[12].date}
                description={events[12].description}
                theme={events[12].theme}
                location={events[12].location}
                winners={events[12].winners}
                placeholder={ggj2025winner}
                imageD={ggj25}
                imageM={ggjM}
              />

              <GameJamEvent
                title={events[13].title}
                jampage={events[13].jampage}
                date={events[13].date}
                description={events[13].description}
                theme={events[13].theme}
                location={events[13].location}
                winners={events[13].winners}
                placeholder={ggj2024winner}
                imageD={ggj}
                imageM={ggjM}
              />

              <GameJamEvent
                title={events[14].title}
                jampage={events[14].jampage}
                date={events[14].date}
                description={events[14].description}
                theme={events[14].theme}
                location={events[14].location}
                winners={events[14].winners}
                placeholder={cgdjam2023winner}
                imageD={cgd2023}
                imageM={cgd2023M}
              />

              <EventCard
                title={events[15].title}
                date={events[15].date}
                description={events[15].description}
                location={events[15].location}
                imageD={megamigs}
                imageM={megamigsM}
              />

              <GameJamEvent
                title={events[16].title}
                jampage={events[16].jampage}
                date={events[16].date}
                description={events[16].description}
                theme={events[16].theme}
                location={events[16].location}
                winners={events[16].winners}
                placeholder={cgdjam2022winner}
                imageD={cgd2022}
                imageM={cgd2022M}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
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
