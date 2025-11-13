"use client";

import { type Player } from "@/lib/types";
import PlayerCard from "./player-card";
import { usePlayer } from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import Image from "next/image";
import NoPlayersFound from "@/public/no-players-found.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const PlayerGrid = ({ players }: { players: Player[] }) => {
  const { searchQuery, classFilters, teamFilters, levelFilters } = usePlayer();
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 8;

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
    setCurrentPage(1);
  }, [searchQuery, classFilters, teamFilters, levelFilters, players]);

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2
        );
      }
    }
    return pageNumbers;
  };

  if (filteredPlayers.length === 0) {
    return (
      <div className="w-full flex justify-center">
        <Image src={NoPlayersFound} alt="No players found image" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPlayers.map((player) => {
          return <PlayerCard key={player._id} player={player} />;
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center pt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="py-2 pr-4 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`py-2 px-4 rounded-md cursor-pointer mx-1 ${
                currentPage === pageNumber ? "free-green-bg text-white" : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="py-2 pl-4 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerGrid;
