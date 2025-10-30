import Operations from "@/components/Admin/operations";
import PlayerSSRow from "@/components/Admin/players/ss-row";
import CopyButton from "@/components/copy-button";
import { connectDB } from "@/db/db";
import adminPlayerModel from "@/db/schemas/adminPlayerSchema";

const PlayersPage = async () => {
  await connectDB();
  const data = await adminPlayerModel.find();
  const players = data.map(item => JSON.parse(JSON.stringify(item)));

  return (
    <div className="overflow-auto pr-5 space-y-4">
      <Operations type="player" />
      <div className="flex items-end gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="toggle-form">Enable form</label>
          <input
            id="toggle-form"
            type="checkbox"
            className="appearance-none w-15 h-8 bg-gray-200 rounded-full relative transition-colors duration-300 cursor-pointer after:content-[''] after:size-5 after:rounded-full after:bg-white after:absolute after:top-1/2 after:left-1/4 after:-translate-1/2 after:transition-all after:duration-300 checked:bg-green-950 checked:after:left-[70%]"
          />
        </div>
          <CopyButton text="http://localhost:3000/roster/player-form" />
      </div>
      <table>
        <thead className="sticky top-0">
          <tr className="border">
            <th className="border py-2 px-3">Delete</th>
            <th className="border py-2 px-3">Image</th>
            <th className="border py-2 px-3">Name</th>
            <th className="border py-2 px-3">Bio</th>
            <th className="border py-2 px-3">Class</th>
            <th className="border py-2 px-3">Wins</th>
            <th className="border py-2 px-3">Losses</th>
            <th className="border py-2 px-3">Height(ft)</th>
            <th className="border py-2 px-3">Height(in)</th>
            <th className="border py-2 px-3 whitespace-nowrap">
              Playing style
            </th>
            <th className="border py-2 px-3 whitespace-nowrap">
              Years on Varsity
            </th>
            <th className="border py-2 px-3">Varsity</th>
            <th className="border py-2 px-3">Team</th>
          </tr>
        </thead>
        <tbody className="overflow-auto">
          {players.reverse().map((player) => {
            return <PlayerSSRow key={player._id} player={player} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersPage;

{
  /* <div className="flex items-end gap-2">
  <div className="flex flex-col gap-2">
    <label htmlFor="toggle-form">Enable form</label>
    <input
      id="toggle-form"
      type="checkbox"
      className="appearance-none w-15 h-8 bg-gray-200 rounded-full relative transition-colors duration-300 cursor-pointer after:content-[''] after:size-5 after:rounded-full after:bg-white after:absolute after:top-1/2 after:left-1/4 after:-translate-1/2 after:transition-all after:duration-300 checked:bg-green-950 checked:after:left-[70%]"
    />
  </div>
  <div className="flex items-center gap-1">
    <CopyButton text="http://localhost:3000/players/form" />
  </div>
</div> */
}
