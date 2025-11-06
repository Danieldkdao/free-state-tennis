import { type Player } from "@/lib/types";
import Logo from "@/public/free-state-logo.png";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <div className="relative border overflow-hidden flex flex-col rounded-lg">
      <div className="hover:scale-105 transition-transform duration-100 ease-in-out flex-1">
        {player.image ? (
          <Image
            src={player.image.url}
            alt="Free state player image"
            className="w-full h-full min-h-64 max-h-72 object-cover"
            height={180}
            width={80}
          />
        ) : (
          <div className="h-full min-h-64 max-h-72 grid place-items-center">
            <Image
              src={Logo}
              alt="Free state player image"
              className="w-full min-h-64 max-h-72 object-cover"
            />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="">
          <h1 className="text-xl font-medium line-clamp-1">{player.name}</h1>
          <p className="text-sm line-clamp-1">
            {player.class} &middot;{" "}
            {player.isVarsity ? "Varsity" : "Junior Varsity"}
          </p>
        </div>

        <p className="line-clamp-2">{player.bio}</p>
        <Link
          href={`/roster/player/${player._id}`}
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
