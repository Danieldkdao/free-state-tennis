import { type Event as EventType } from "@/lib/types";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
import Logo from "@/public/free-state-logo.png";
import Image from "next/image";

export const splitDatetime = (t: string | Date) => {
  const newDate = new Date(t);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(newDate);
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(newDate);
  return { time, date };
};

const Event = ({ event }: { event: EventType }) => {

  const time = event.datetime ? splitDatetime(event.datetime).time : "Not defined";
  const date = event.datetime ? splitDatetime(event.datetime).date : "Not defined";

  return (
    <div className="w-full border p-5 space-y-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaCalendar />
            <h1 className="font-medium">{date}</h1>
          </div>
          <h1>{event.away ? "Away" : "Home"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <FaClock />
          <h1 className="font-medium">{time}</h1>
        </div>
      </div>
      <hr />
      <div className="flex gap-4">
        <Image
          src={Logo}
          alt="Free state logo image"
          width={100}
          height={100}
        />
        <div className="flex flex-col">
          <div className="flex-1">
            <h1 className="text-xl">{event.team}</h1>
            <h1 className="text-2xl">
              {event.away ? "at" : "vs."} {event.opponent}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot />
            <p>{event.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
