"use client";

import { type Player } from "@/lib/types";;
import PlayerCard from "./player-card";
import { usePlayer } from "@/hooks/usePlayer";

const PlayerGrid = ({players}: {players: Player[]}) => {
  const { searchQuery } = usePlayer();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {players.map((player) => {
        return <PlayerCard key={player._id} player={player} />;
      })}
    </div>
  );
};

export default PlayerGrid;
