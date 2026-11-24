import { shrekathonVenue } from "~/components/game-jam/config";
import { createPortal } from "react-dom";
import { useState } from "react";
import type { VenueData } from "~/components/game-jam/types";

export default function Venue({ venue = shrekathonVenue }: { venue?: VenueData }) {
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);

  return (
    <section id="venue" className="max-w-5xl mx-auto mb-28 text-center md:text-left font-corbert font-bold">
      <h2 className="text-4xl font-bold text-dark-purple mb-10">Venue & Labs</h2>
      <div className="text-lg text-gray-700 leading-relaxed space-y-8">
        <p>
          {venue.introduction}{" "}
          <strong className="underline text-dark-purple font-extrabold decoration-2 underline-offset-2">
            {venue.university}
          </strong>, our <em>main creative hub</em> for the weekend! 🎮
        </p>
        <p>The following rooms will be used for the event:</p>
        <ul className="space-y-2">
          {venue.rooms.map((room) => (
            <li key={room.day}>
              <strong>{room.day}:</strong>{" "}
              <span className="text-dark-purple underline font-semibold decoration-2 underline-offset-2">{room.room}</span>
            </li>
          ))}
        </ul>
        <div className="relative border-l-4 border-dark-purple pl-6 ml-2">
          <h3 className="text-2xl font-semibold text-dark-purple mb-2">💻 Labs & Workspaces</h3>
          <p className="mb-4">Here are the labs we reserved (available throughout the event):</p>
          <ul className="space-y-2 text-gray-800">
            {venue.labs.map((lab) => (
              <li key={lab.room}>
                • Lab Room {lab.room} ({lab.type}{lab.days ? `, ${lab.days}` : ""}{lab.footnoteMarker})
              </li>
            ))}
          </ul>
          {venue.workstationFootnote && <p className="text-sm text-gray-600 mt-3 italic">{venue.workstationFootnote}</p>}
          <p className="text-sm text-gray-600 mt-4 italic">{venue.note}</p>
        </div>
        <p className="text-sm text-gray-500 italic text-center mt-6">
          *All rooms are located in the {venue.building}, {venue.university}.
        </p>

        {venue.floorPlan && (
          <div className="mt-10 text-center">
            <p className="mb-4 text-base text-gray-600">
              Click the floor plan to view it fullscreen.
            </p>
            <button
              type="button"
              onClick={() => setIsFloorPlanOpen(true)}
              className="mx-auto block max-w-3xl overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-3 shadow-[0_16px_40px_rgba(78,47,81,0.2)] transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-dark-purple focus:ring-offset-2"
              aria-label={`View ${venue.floorPlan.alt} fullscreen`}
            >
              <img
                src={venue.floorPlan.src}
                alt={venue.floorPlan.alt}
                className="max-h-[28rem] w-full object-contain"
              />
            </button>
          </div>
        )}
      </div>

      {venue.floorPlan &&
        isFloorPlanOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${venue.floorPlan.alt} fullscreen view`}
            onClick={() => setIsFloorPlanOpen(false)}
          >
            <img
              src={venue.floorPlan.src}
              alt={venue.floorPlan.alt}
              className="max-h-full max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => setIsFloorPlanOpen(false)}
              className="absolute right-6 top-4 text-4xl font-bold text-white hover:text-gray-300"
              aria-label="Close fullscreen floor plan"
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </section>
  );
}
