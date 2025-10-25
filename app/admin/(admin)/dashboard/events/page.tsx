import PlayerSSRow from "@/components/Admin/players/ss-row";
import CopyButton from "@/components/copy-button";
import React from "react";

const EventsPage = () => {
  return (
    <div className="overflow-auto pr-5 space-y-4">
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

export default EventsPage;
