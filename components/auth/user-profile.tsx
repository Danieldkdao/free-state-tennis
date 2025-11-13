"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { authClient } from "@/lib/auth/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  FaCircleUser,
  FaRegClipboard,
  FaRegHardDrive,
  FaRightToBracket,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const userModalRef = useRef<HTMLDivElement>(null);

  useClickOutside(userModalRef, () => setShowUserModal(false));

  return (
    <div className="relative grid place-items-center" ref={userModalRef}>
      <button
        onClick={() => setShowUserModal(!showUserModal)}
        className="cursor-pointer"
      >
        {session?.user.image ? (
          <Image
            src={session.user.image}
            alt="User profile image"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <FaCircleUser size={40} />
        )}
      </button>
      <div
        className={`absolute top-[120%] right-0 bg-gray-200 rounded p-2 flex flex-col transition-opacity duration-300 opacity-0 z-[1000] ${
          showUserModal ? "opacity-100" : "pointer-events-none"
        }`}
      >
        {session?.user.role === "admin" ? (
          <Link
            href="/admin/dashboard/players"
            className="hover:bg-gray-300 py-1 px-2 rounded whitespace-nowrap flex items-center gap-2"
          >
            <FaRegHardDrive />
            Admin Dashboard
          </Link>
        ) : (
          <Link
            href="/roster/player-form"
            className="hover:bg-gray-300 py-1 px-2 rounded whitespace-nowrap flex items-center gap-2"
          >
            <FaRegClipboard />
            Player Form
          </Link>
        )}
        <button
          className="hover:bg-gray-300 py-1 px-2 rounded flex items-center gap-2 cursor-pointer"
          onClick={async () => {
            if (!confirm("Are you sure you want to logout?")) return;
            await authClient.signOut();
            router.push("/");
          }}
        >
          <FaRightToBracket />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
