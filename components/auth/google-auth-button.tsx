import Image from "next/image"
import GoogleLogo from '@/public/google.png';
import { authClient } from "@/lib/auth/auth-client";

const GoogleAuthButton = () => {
  return (
    <button onClick={() => {
      authClient.signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    }} className="border cursor-pointer p-2 rounded-full flex items-center gap-2">
      <Image src={GoogleLogo} alt="Google logo" width={25} height={25} className="object-cover"/>
      Sign In
    </button>
  )
}

export default GoogleAuthButton