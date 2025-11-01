"use client";

import { type Player } from "@/lib/types";
import PlayerCard from "./player-card";
import { usePlayer } from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import Image from "next/image";
import NoPlayersFound from '@/public/no-players-found.png';

const PlayerGrid = ({ players }: { players: Player[] }) => {
  const { searchQuery, classFilters, teamFilters, levelFilters } = usePlayer();
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  useEffect(() => {
    let filteredPlayersState = [...players];
    if (searchQuery.trim() !== "") {
      filteredPlayersState = filteredPlayersState.filter((player) =>
        player.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }

    if (classFilters.length !== 0) {
      filteredPlayersState = filteredPlayersState.filter((player) =>
        classFilters.includes(player.class)
      );
    }

    if (teamFilters.length !== 0) {
      filteredPlayersState = filteredPlayersState.filter((player) =>
        teamFilters.includes(player.team)
      );
    }

    if (levelFilters.length !== 0) {
      filteredPlayersState = filteredPlayersState.filter((player) =>
        levelFilters.includes(player.isVarsity)
      );
    }
    setFilteredPlayers(filteredPlayersState);
  }, [searchQuery, classFilters, teamFilters, levelFilters]);

  if(filteredPlayers.length === 0){
    return <div className="w-full flex justify-center">
      <Image src={NoPlayersFound} alt="No players found image"/>
    </div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredPlayers.map((player) => {
        return <PlayerCard key={player._id} player={player} />;
      })}
    </div>
  );
};

export default PlayerGrid;
