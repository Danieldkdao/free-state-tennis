import PlayerSSRow from "@/components/Admin/players/ss-row";
import CopyButton from "@/components/copy-button";
import React from "react";

const PlayersPage = () => {
  return (
    <div className="overflow-auto pr-5 space-y-4">
      <div className="flex items-end gap-2">
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
          <input
            type="text"
            readOnly
            value="http://localhost:3000/players/form"
            className="py-1 px-2 outline-0"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr className="border">
            <th className="border py-2 px-3">Image</th>
            <th className="border py-2 px-3">Name</th>
            <th className="border py-2 px-3">Bio</th>
            <th className="border py-2 px-3">Class</th>
            <th className="border py-2 px-3">Wins</th>
            <th className="border py-2 px-3">Losses</th>
            <th className="border py-2 px-3">Height(ft)</th>
            <th className="border py-2 px-3">Height(in)</th>
            <th className="border py-2 px-3">Playing style</th>
            <th className="border py-2 px-3 whitespace-nowrap">
              Years on Varsity
            </th>
            <th className="border py-2 px-3">Varsity</th>
            <th className="border py-2 px-3">Gender</th>
          </tr>
        </thead>
        <tbody>
          <PlayerSSRow />
        </tbody>
      </table>
    </div>
  );
};

export default PlayersPage;
