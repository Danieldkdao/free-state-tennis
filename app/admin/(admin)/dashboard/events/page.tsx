import EventsSSRow from "@/components/Admin/events/ss-row";
import Operations from "@/components/Admin/operations";
import { connectDB } from "@/db/db";
import adminEventModel from "@/db/schemas/adminEventModel";

const EventsPage = async () => {
  await connectDB();
  const data = await adminEventModel.find();
  const events = data.map((item) => JSON.parse(JSON.stringify(item)));

  return (
    <div className="overflow-auto pr-5 space-y-4">
      <Operations type="event" />
      <table>
        <thead>
          <tr className="border">
            <th className="border py-2 px-3">Image</th>
            <th className="border py-2 px-3">Date</th>
            <th className="border py-2 px-3">Team</th>
            <th className="border py-2 px-3">Away</th>
            <th className="border py-2 px-3">Opponent</th>
            <th className="border py-2 px-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return <EventsSSRow key={event._id} event={event} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EventsPage;
