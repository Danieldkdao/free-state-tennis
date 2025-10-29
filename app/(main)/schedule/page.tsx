import Event from "@/components/schedule/Event";
import { connectDB } from "@/db/db";
import eventModel from "@/db/schemas/eventModel";

const SchedulePage = async () => {
  await connectDB();
  const data = await eventModel.find();
  if (!data.length) {
    return <h1>No events found</h1>;
  }
  const events = data.map((item) => item.toObject());

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
