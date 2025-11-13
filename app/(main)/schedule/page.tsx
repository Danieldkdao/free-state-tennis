import { connectDB } from "@/db/db";
import eventModel from "@/db/schemas/eventModel";
import Image from "next/image";
import NoEventsScheduled from "@/public/no-events-scheduled.png";
import EventMain from "@/components/schedule/event-main";

const SchedulePage = async () => {
  await connectDB();
  const data = await eventModel.find().sort({ datetime: 1 });
  if (!data.length) {
    return (
      <div className="w-full flex justify-center">
        <Image src={NoEventsScheduled} alt="No events scheduled image" />
      </div>
    );
  }
  const events = data.map((item) => JSON.parse(JSON.stringify(item)));
  return <EventMain events={events} />;
};

export default SchedulePage;
