import { data } from "@/app/data";

import { FaCircleXmark } from "react-icons/fa6";
import Logo from "@/public/free-state-logo.png";
import Image from "next/image";

const PlayerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const player = data.filter((item) => item.id === Number(id))[0];
  if (!player)
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 h-screen">
        <h1 className="text-4xl font-bold text-center">404 Player Not Found</h1>
        <FaCircleXmark size={150} color="#9C1D15" />
        <p className="text-center max-w-[600px]">
          Looks like the player you were looking for doesn't exist! The website
          might be down or you might be at the wrong url.
        </p>
      </div>
    );
  return (
    <div className="w-full mt-8 mb-24">
      <div className="w-full flex gap-4">
        <div className="flex-2 border p-5 flex gap-4">
          <Image src={Logo} alt="Free state logo" className="object-cover" />
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <div className="w-full flex items-center justify-between">
                <h1 className="text-2xl font-bold">{player.name}</h1>
                <p className="font-bold">
                  {player.isVarsity ? "Varsity" : "Junior Varsity"}
                </p>
              </div>
              <p>{player.class}</p>
            </div>
            <hr />
            <div className="w-full grid grid-cols-3 gap-4">
              <div>
                <h1 className="text-xl">Record</h1>
                <p>
                  {player.wins} - {player.losses}
                </p>
              </div>
              <div>
                <h1 className="text-xl">Playing Style</h1>
                <p>{player.playing_style}</p>
              </div>
              <div>
                <h1 className="text-xl">Height</h1>
                <p>{player.height}</p>
              </div>
            </div>
            <div className="w-full grid grid-cols-3">
              <div>
                <h1 className="text-xl">Years on Varsity</h1>
                <p>{player.yearsOnVarsity}</p>
              </div>
              <div>
                <h1 className="text-xl">Hometown</h1>
                <p>{player.hometown}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border flex-1 p-5 flex flex-col gap-4">
          <h1 className="text-xl">Bio</h1>
          <p>{player.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
