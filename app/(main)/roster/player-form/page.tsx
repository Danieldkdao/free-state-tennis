import Image from "next/image";
import Logo from "@/public/free-state-logo.png";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import PlayerForm from "@/components/Player/player-form";

const RosterFormPage = async () => {
  const h = await headers();
  const session = await auth.api.getSession({
    headers: h
  });
  if (!session) return redirect("/");

  const isFormEnabled = true;

  if (!isFormEnabled) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Image src={Logo} alt="Free state logo" className="mx-auto w-48 h-48" />
        <h1 className="text-2xl font-bold mt-8">
          The Roster Form is Currently Closed
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We are not accepting new submissions at this time. Please check back
          again soon!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Image src={Logo} alt="Free state logo" className="mx-auto" />
      <PlayerForm session={session}/>
    </div>
  );
};

export default RosterFormPage;
