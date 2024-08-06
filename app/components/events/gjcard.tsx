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
import { ClientOnly } from "remix-utils/client-only";
import { Link } from "@remix-run/react";

interface EventProps {
  title: string;
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

  if (isDesktop) {
    // Desktop View
    return (
      <div className="flex flex-col bg-wh border border-wh/80 rounded-xl md:p-10 p-7 w-full relative">
        <div className="flex md:gap-10">
          <img
            src={imageD}
            alt={title}
            className="object-contain aspect-{3/2} hidden md:block w-36 rounded-md h-fit"
          />
          <div className="flex flex-col justify-center gap-4">
            <div>
              <h2 className="title text-3xl 2xl:text-4xl text-cgd-pink/85 text-left">
                {title}
              </h2>
              <h4 className="description text-xl text-dark-purple/90 font-corbert font-bold">
                {description}
              </h4>
            </div>
            <p className="date md:text-lg text-sm text-dark-purple/80 font-corbert font-bold">
              {date}
            </p>
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
            <AccordionTrigger className=" text-left absolute right-10 bottom-5"></AccordionTrigger>
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
                        >
                          &nbsp;&nbsp;{winner.gamename}
                        </Link>
                      </div>
                    ))}
                  </div>
                </h3>
              </div>
              <img
                src={placeholder}
                alt={title}
                className="object-contain aspect-{2/3} hidden md:block md:w-56 xl:w-64 3xl:w-72 rounded-md h-fit place-self-end"
              />
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
          <DrawerTrigger className="flex md:flex-row flex-col bg-wh-full/90 border border-wh/80 rounded-xl md:p-7 p-5 h-fit gap-5 w-full items-center text-left drop-shadow-md">
            <img
              src={imageM}
              alt={title}
              className="object-contain aspect-{3/2} md:hidden rounded-md"
            />
            {/* Drawer for mobile View */}
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="title sm:text-2xl text-xl text-cgd-pink/85 text-left">
                  {title}
                </h2>
                <h4 className="description sm:text-base text-sm text-dark-purple/90 font-corbert font-bold">
                  {description}
                </h4>
              </div>
              <p className="date sm:text-sm text-xs text-dark-purple/80 font-corbert font-bold">
                {date}
              </p>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="py-10 px-5">
              <DrawerTitle>
                <h3 className="text-cgd-pink text-2xl">{title}</h3>
              </DrawerTitle>
              <DrawerDescription className="">
                <div className="w-full text-left grid gap-4">
                  <h3 className="text-dark-purple text-xl">
                    Location:
                    <span className="font-corbert font-bold">
                      &nbsp;&nbsp;{location}
                    </span>
                  </h3>
                  <h3 className="text-dark-purple text-xl">
                    Theme:
                    <span className="font-corbert font-bold">
                      &nbsp;&nbsp;{theme}
                    </span>
                  </h3>
                  <h3 className="text-dark-purple text-xl font-bold ">
                    Winners:{" "}
                    <div className="grid">
                      {winners?.map((winner, index) => (
                        <div className="flex justify-between min-w-80">
                          <h4 className="font-black">
                            {winner.position.substring(0, 3)}:
                          </h4>
                          <Link
                            key={index}
                            className="font-corbert "
                            to={winner.gamelink}
                          >
                            &nbsp;&nbsp;{winner.gamename}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </h3>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </ClientOnly>
  );
};

export default GameJamEvent;
