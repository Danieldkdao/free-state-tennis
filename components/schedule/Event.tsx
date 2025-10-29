import { type Event as EventType } from "@/lib/types";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
import Logo from "@/public/free-state-logo.png";
import Image from "next/image";

const Event = ({ event }: { event: EventType }) => {
  return (
    <div className="w-full border p-5 space-y-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaCalendar />
            <h1 className="font-medium">{event.date}</h1>
          </div>
          <h1>{event.away ? "Away" : "Home"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <FaClock />
          <h1 className="font-medium">{event.time}</h1>
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
