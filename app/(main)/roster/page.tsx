import PlayerFilters from "@/components/player/filters";
import PlayerGrid from "@/components/player/player-grid";
import { connectDB } from "@/db/db";
import playerModel from "@/db/schemas/playerSchema";

const RosterPage = async () => {
  await connectDB();
  const data = await playerModel.find();
  const players = data.map((item) => JSON.parse(JSON.stringify(item)));

  return (
    <div className="w-full flex flex-col gap-8 mt-8">
      <h1 className="text-4xl font-bold">Meet the Team</h1>
      <PlayerFilters />
      <div>
        <PlayerGrid players={players}/>
      </div>
    </div>
  );
};

export default RosterPage;
