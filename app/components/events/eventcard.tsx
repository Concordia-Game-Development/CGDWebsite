import React, { useState } from "react";
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
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useAverageColor } from "~/lib/useAverageColor";

interface EventProps {
  title: string;
  date: string;
  description: string;
  imageD: string;
  imageM?: string;
  location?: string;
  eventpictures?: string[];
  link?: string;
}
const EventCard: React.FC<EventProps> = ({
  title,
  date,
  description,
  imageD,
  imageM,
  location,
  eventpictures,
  link,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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
              {link ? (
                <h2 className="title text-3xl 2xl:text-4xl text-cgd-pink/85 text-left hover:underline decoration-[6px] uppercase">
                  <a href={link}>{title}</a>
                </h2>
              ) : (
                <h2 className="title text-3xl 2xl:text-4xl text-cgd-pink/85 text-left uppercase">
                  {title}
                </h2>
              )}
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
            <AccordionTrigger className=" text-left absolute right-6 bottom-5">
              <div className="flex flex-col gap-7"></div>
            </AccordionTrigger>
            <AccordionContent className="mt-5">
              <h3 className="text-dark-purple text-lg font-bold">
                Location: <span className="font-corbert">{location}</span>
              </h3>
              {eventpictures && eventpictures.length > 0 && (
                <>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {eventpictures.map((pic, index) => (
                      <img
                        key={index}
                        src={pic}
                        alt={`Event picture ${index + 1}`}
                        onClick={() => {
                          setPhotoIndex(index);
                          setIsOpen(true);
                        }}
                        className="cursor-pointer rounded-lg object-cover w-full h-32 md:h-40"
                      />
                    ))}{" "}
                  </div>
                  {isOpen && (
                    <Lightbox
                      open={isOpen}
                      close={() => setIsOpen(false)}
                      slides={eventpictures.map((pic) => ({ src: pic }))}
                      index={photoIndex}
                    />
                  )}
                </>
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
            <DrawerHeader className="py-10 px-5">
              <DrawerTitle>
                <h3 className="text-cgd-pink text-2xl">{title}</h3>
              </DrawerTitle>
              <DrawerDescription>
                <div className="w-full">
                  <h3 className="inline-flex gap-2 items-center text-dark-purple text-sm sm:text-base">
                    <h3 className="align-middle">Location:</h3>
                    <h4 className="font-bold align-middle">{location}</h4>
                  </h3>
                </div>
                {eventpictures && eventpictures.length > 0 && (
                  <>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {eventpictures.map((pic, index) => (
                        <img
                          key={index}
                          src={pic}
                          alt={`Event picture ${index + 1}`}
                          className="rounded-md object-cover w-full h-28 sm:h-36"
                          onClick={() => {
                            setPhotoIndex(index);
                            setIsOpen(true);
                          }}
                        />
                      ))}{" "}
                    </div>
                    {isOpen && (
                      <Lightbox
                        open={isOpen}
                        close={() => setIsOpen(false)}
                        slides={eventpictures.map((pic) => ({ src: pic }))}
                        index={photoIndex}
                      />
                    )}
                  </>
                )}
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

export default EventCard;
