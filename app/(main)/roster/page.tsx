import PlayerFilters from "@/components/player/filters";
import PlayerGrid from "@/components/player/player-grid";
import { connectDB } from "@/db/db";
import playerModel from "@/db/schemas/playerSchema";
import Image from "next/image";

const RosterPage = async () => {
  await connectDB();
  const data = await playerModel.find();
  const players = data.map((item) => JSON.parse(JSON.stringify(item)));

  return (
    <div className="w-full flex flex-col gap-8 mt-8">
      <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 border">
        <div className="w-32 h-32 md:w-52 md:h-52 relative">
          <Image
            src="/free-state-logo.png"
            alt="Coach"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">Randy Clark</h1>
          <p className="text-xl text-gray-600">Head Coach</p>
          <p className="mt-4 text-gray-700">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
            molestias sed reprehenderit eaque magnam dolor autem eos in quos,
            atque suscipit eligendi iure dicta id accusantium nulla,
            consequuntur veritatis. Eius!
          </p>
        </div>
      </div>
      <h1 className="text-4xl font-bold">Meet the Team</h1>
      <PlayerFilters />
      <div>
        <PlayerGrid players={players} />
      </div>
    </div>
  );
};

export default RosterPage;
