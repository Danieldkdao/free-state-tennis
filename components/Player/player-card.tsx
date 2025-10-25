import React from "react";
import { type Player } from "@/lib/types";
import Logo from "@/public/free-state-logo.png";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <div className="relative border overflow-hidden">
      <div className="hover:scale-105 transition-transform duration-100 ease-in-out">
        <Image src={Logo} alt="Free state player image" />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="">
          <h1 className="text-xl font-medium">{player.name}</h1>
          <p className="text-sm">
            {player.class} &middot;{" "}
            {player.isVarsity ? "Varsity" : "Junior Varsity"}
          </p>
        </div>

        <p className="line-clamp-2">{player.bio}</p>
        <p>
          Record: {player.wins} | {player.losses}
        </p>
        <Link
          href={`/roster/player/${player.id}`}
          className="flex items-center gap-1 cursor-pointer hover:gap-3 transition-all duration-200 ease-in-out"
        >
          <p className="underline">Read More</p>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default PlayerCard;
