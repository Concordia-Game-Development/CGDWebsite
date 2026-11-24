import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClientOnly } from "remix-utils/client-only";
import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { buttonVariants } from "@/components/ui/button";
import { useAverageColor } from "~/lib/useAverageColor";

// The props are taken from siteSettings/events.json imported on the events.tsx page
interface EventProps {
  title: string;
  jampage?: string;
  date: string;
  description: string;
  imageD: string;
  imageM: string;
  placeholder?: string;
  location?: string;
  theme?: string;
  winners?: Array<{ position: string; gamename: string; gamelink: string }>;
}

const GameJamEvent: React.FC<EventProps> = ({
  title,
  jampage,
  date,
  description,
  placeholder,
  imageD,
  imageM,
  location,
  theme,
  winners,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isExternalJamPage = jampage?.startsWith("http");
  const frameColorD = useAverageColor(imageD);
  const frameColorM = useAverageColor(imageM || imageD);

  if (isDesktop) {
    // Desktop View
    return (
      <div className="group flex flex-col bg-white/50 backdrop-blur-xl border border-[#f2c5d3]/70 rounded-3xl p-5 md:py-6 md:px-6 w-full relative hover:-translate-y-1 hover:shadow-xl hover:rotate-[0.5deg] hover:z-10 transition-all duration-300">
        <div className="flex items-center md:gap-6 lg:gap-8">
          <div
            className="overflow-hidden rounded-2xl aspect-[3/2] hidden md:block md:w-56 lg:w-64 xl:w-96 shrink-0 relative ring-1 ring-white/50 shadow-md transition-colors duration-300"
            style={{ backgroundColor: frameColorD }}
          >
            <img
              src={imageD}
              alt={title}
              className="w-full h-full object-contain group-hover:scale-110 hover:scale-110 transition duration-300"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 text-left">
            <div>
              <h2 className="title text-3xl 2xl:text-4xl text-cgd-pink/85 text-left hover:underline uppercase">
                <a
                  href={jampage}
                  target={isExternalJamPage ? "_blank" : undefined}
                  rel={isExternalJamPage ? "noopener noreferrer" : undefined}
                >
                  {title}
                </a>
              </h2>
              <h4 className="description text-xl text-dark-purple/90 font-corbert font-bold text-left">
                {description}
              </h4>
            </div>
            {date && (
              <span className="inline-block w-fit px-3 py-1 rounded-full text-xs sm:text-sm md:text-base font-corbert font-semibold bg-[#f2c5d3]/50 text-dark-purple/85 shadow-sm">
                {date}
              </span>
            )}
          </div>
        </div>
        {/* DROP DOWN PART */}
        <Accordion
          type="single"
          collapsible
          className="flex flex-col w-full"
          orientation="horizontal"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className=" text-left absolute right-6 bottom-5"></AccordionTrigger>
            <AccordionContent className="mt-6 xl:mt-10 flex gap-4 xl:gap-6 items-center justify-between 2xl:px-16 lg:px-10 md:px-5 pb-7">
              <div className="grid xl:grid-cols-2 2xl:gap-7 gap-2">
                <h3 className="text-dark-purple text-lg font-bold">
                  Location: <span className="font-corbert">{location}</span>
                </h3>
                <h3 className="text-dark-purple text-lg font-bold">
                  Theme: <span className="font-corbert">{theme}</span>
                </h3>
                <h3 className="text-dark-purple text-lg font-bold ">
                  Winners:{" "}
                  <div className="grid">
                    {winners?.map((winner, index) => (
                      <div className="flex justify-between min-w-80">
                        <h4 className=" font-black">{winner.position}:</h4>
                        <Link
                          key={index}
                          className="font-corbert hover:text-cgd-pfull transition-colors ease-in-out duration-300"
                          to={winner.gamelink}
                          target="_blank"
                        >
                          &nbsp;&nbsp;{winner.gamename}
                        </Link>
                      </div>
                    ))}
                  </div>
                </h3>
              </div>
              {placeholder && (
                <img
                  src={placeholder}
                  alt={title}
                  className="object-contain aspect-[2/3] hidden md:block md:w-56 xl:w-64 3xl:w-72 rounded-md place-self-end"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
  return (
    <ClientOnly fallback={null}>
      {() => (
        <Drawer>
          <DrawerTrigger className="group flex md:flex-row flex-col bg-white/50 backdrop-blur-xl border border-[#f2c5d3]/70 rounded-3xl p-5 md:p-6 h-fit gap-5 w-full items-start text-left hover:-translate-y-1 hover:shadow-xl hover:rotate-[0.5deg] transition-all duration-300">
            <div
              className="overflow-hidden rounded-2xl aspect-[3/2] w-full md:hidden relative ring-1 ring-white/50 shadow-md transition-colors duration-300"
              style={{ backgroundColor: frameColorM }}
            >
              <img
                src={imageM}
                alt={title}
                className="w-full h-full object-contain group-hover:scale-110 hover:scale-110 transition duration-300"
              />
            </div>
            {/* Drawer for mobile View */}
            <div className="flex flex-col gap-5 text-left">
              <div>
                <h2 className="title sm:text-2xl text-xl text-cgd-pink/85 text-left uppercase">
                  {title}
                </h2>
                <h4 className="description sm:text-base text-sm text-dark-purple/90 font-corbert font-bold text-left">
                  {description}
                </h4>
              </div>
              {date && (
                <span className="inline-block w-fit px-3 py-1 rounded-full text-xs sm:text-sm font-corbert font-semibold bg-[#f2c5d3]/50 text-dark-purple/85 shadow-sm">
                  {date}
                </span>
              )}
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="px-5">
              <DrawerTitle>
                <h3 className="text-cgd-pink text-3xl pt-10 pb-3">{title}</h3>
              </DrawerTitle>
              <DrawerDescription className="">
                <div className="w-full grid gap-4">
                  <div>
                    <p className="text-left font-ls text-base text-cgd-pink pl-1 pb-1">
                      Information
                    </p>
                    <div className=" flex flex-col gap-2 rounded-md p-3 bg-wh">
                      <h3 className="text-dark-purple text-base flex items-center gap-4">
                        <Icon
                          icon="solar:map-point-bold-duotone"
                          className="w-10 h-10"
                        />
                        <span className="font-corbert font-bold">
                          {location}
                        </span>
                      </h3>
                      <h3 className="text-dark-purple text-base flex items-center gap-4">
                        <Icon
                          icon="solar:pallete-2-bold-duotone"
                          className="w-10 h-10"
                        />
                        <span className="font-corbert font-bold">{theme}</span>
                      </h3>
                    </div>
                  </div>
                  <div>
                    <p className="text-left font-ls text-base text-cgd-pink pl-1 pb-1">
                      Results
                    </p>
                    <h3 className="text-dark-purple text-base font-bold flex flex-col items-center gap-4 rounded-md px-3 py-5 bg-wh">
                      <Icon
                        icon="solar:crown-star-bold-duotone"
                        className="w-10 h-10"
                      />
                      <Separator className="bg-dark-purple/30 w-[88%] h-[2px]" />

                      <div className="grid gap-3 w-80 max-w-96">
                        {winners?.map((winner, index) => {
                          let icon = "";
                          let iconClassName = "w-8 h-8";

                          switch (index) {
                            case 0:
                              icon = "solar:cup-star-bold-duotone"; // Customize for the first item
                              break;
                            case 1:
                              icon = "solar:medal-ribbons-star-bold-duotone"; // Customize for the second item
                              break;
                            case 2:
                              icon = "solar:medal-ribbon-star-bold-duotone"; // Customize for the third item
                              break;
                            case 3:
                              icon = "solar:heart-bold-duotone";
                              iconClassName = "ml-0.5 w-7 h-7";
                              break;
                            default:
                              icon = "solar:medal-ribbon-line-duotone";
                              break;
                          }

                          // Add the following to events.json if deciding to keep bonus awards:
                          // {
                          //   "position": "Challenger Award",
                          //   "gamename": "Strung Along",
                          //   "gamelink": "https://trim-ge2019.itch.io/the-red-line-of-fate"
                          // },
                          // {
                          //   "position": "Solo Dev Award",
                          //   "gamename": "▶-🔲🔲🔲",
                          //   "gamelink": "https://jordan-vision.itch.io/triangle-squaresquaresquare"
                          // }

                          return (
                            <div className="flex gap-2 justify-between mx-10">
                              <Icon icon={icon} className={iconClassName} />
                              <Link
                                key={index}
                                className="font-corbert "
                                to={winner.gamelink}
                                target="_blank"
                              >
                                {winner.gamename}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </h3>
                  </div>
                  <div>
                    {/* Using Link and button variant from shadcn + additional styling.
                        Links to the jam page of the event as long as is it defined */}
                    <Link
                      className={`${buttonVariants({
                        variant: "ghost",
                      })} w-full rounded-md font-corbert text-base font-extrabold text-dark-purple active:bg-wh`}
                      to={jampage ? jampage : `#`}
                      target={isExternalJamPage ? "_blank" : undefined}
                      rel={isExternalJamPage ? "noopener noreferrer" : undefined}
                    >
                      See more
                    </Link>
                  </div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose className="px-1">
                <Button
                  variant="outline"
                  className="w-full rounded-md bg-cgd-pink text-wh-full border border-cgd-pink/80 hover:border-wh/5 hover:bg-wh hover:text-dark-purple font-corbert text-base font-bold"
                >
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </ClientOnly>
  );
};

export default GameJamEvent;
