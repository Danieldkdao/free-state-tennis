"use client";

import Logo from "@/public/free-state-logo.png";
import Image from "next/image";
import UserProfile from "../auth/user-profile";
import { useAdminNavbar } from "@/hooks/useAdminNavbar";
import { FaBars, FaX } from "react-icons/fa6";
import Link from "next/link";

const AdminNavbar = () => {
  const { sidebarOpen, setSidebarOpen } = useAdminNavbar();
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300 sticky top-0 z-[1000]">
      <Link href="/">
        <Image src={Logo} alt="Free state logo" width={75} height={75} />
      </Link>

      <div className="flex items-center gap-2">
        <UserProfile />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="cursor-pointer sm:hidden"
        >
          {sidebarOpen ? <FaX size={40} /> : <FaBars size={40} />}
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
