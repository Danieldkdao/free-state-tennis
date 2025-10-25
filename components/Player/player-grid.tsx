import { type Player } from "@/lib/types";
import React from "react";
import PlayerCard from "./player-card";

const PlayerGrid = ({ players }: { players: Player[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {players.map((player) => {
        return <PlayerCard key={player.id} player={player} />;
      })}
    </div>
  );
};

export default PlayerGrid;
