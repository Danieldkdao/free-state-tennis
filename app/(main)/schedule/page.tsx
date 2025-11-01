import Event from "@/components/schedule/Event";
import { connectDB } from "@/db/db";
import eventModel from "@/db/schemas/eventModel";
import Image from "next/image";
import NoEventsScheduled from "@/public/no-events-scheduled.png";

const SchedulePage = async () => {
  await connectDB();
  const data = await eventModel.find();
  if (!data.length) {
    return (
      <div className="w-full flex justify-center">
        <Image src={NoEventsScheduled} alt="No events scheduled image" />
      </div>
    );
  }
  const events = data.map((item) => JSON.parse(JSON.stringify(item)));

  return (
    <div className="w-full mt-8 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Schedule</h1>
      <div className="w-full flex flex-col gap-4">
        {events.map((event, index) => {
          return <Event key={index} event={event} />;
        })}
      </div>
    </div>
  );
};

export default SchedulePage;
