import { shrekathonSchedule } from "~/components/game-jam/config";
import type { ScheduleDay } from "~/components/game-jam/types";

export default function Timetable({ schedule = shrekathonSchedule }: { schedule?: ScheduleDay[] }) {
  return (
    <section className="max-w-5xl mx-auto mb-32 text-center md:text-left font-corbert font-bold">
      <h2 className="text-4xl font-bold text-dark-purple mb-12">
        TIME TABLE
      </h2>

      <div
        className={`grid grid-cols-1 ${
          schedule.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
        } gap-20 text-left`}
      >
        {schedule.map((day) => (
          <div key={day.day} className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-dark-purple mb-10 text-center">
              {day.day}
            </h3>

            <div className="relative w-full max-w-md">
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-dark-purple transform -translate-x-1/2 rounded-full"></div>

              <ul className="space-y-8">
                {day.events.map((event) => (
                  <li
                    key={event.time}
                    className="grid grid-cols-[1fr_24px_1fr] items-center"
                  >
                    <div className="text-right pr-4 text-gray-800 font-medium">
                      {event.time}
                    </div>

                    <div className="flex justify-center relative">
                      <span className="w-3 h-3 bg-white border-[3px] border-dark-purple rounded-full"></span>
                    </div>

                    <div className="pl-4 text-gray-700">
                      {event.title}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
