"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "@/public/free-state-logo.png";
import Link from "next/link";
import { FaBars, FaArrowLeft } from "react-icons/fa6";
import { authClient } from "@/lib/auth/auth-client";
import GoogleAuthButton from "./auth/google-auth-button";
import UserProfile from "./auth/user-profile";

const Navbar = () => {
  const navbarLinks = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Roster",
      link: "/roster",
    },
    {
      text: "Schedule",
      link: "/schedule",
    },
    {
      text: "News",
      link: "/news",
    },
  ];

  const [toggleMenu, setToggleMenu] = useState(false);
  const { data: session } = authClient.useSession();

  const notSignedIn = session == null;

  return (
    <div className="w-full flex p-5 items-center justify-between top-0 sticky bg-white z-[100]">
      <div className="flex items-center gap-6 md:gap-8">
        <Link href="https://www.freestateathletics.com/" target="_blank">
          <Image
            src={Logo}
            alt="Free state logo"
            height={70}
            width={70}
            className="md:mr-10 mr-4"
          />
        </Link>
        {navbarLinks.map((link, i) => (
          <Link
            key={i}
            href={link.link}
            className="text-2xl font-bold sm:block hidden"
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        {notSignedIn ? (
          <GoogleAuthButton />
        ) : (
          <UserProfile />
        )}
        <button onClick={() => setToggleMenu(true)} className="cursor-pointer sm:hidden">
          <FaBars size={40} />
        </button>
      </div>
      <div
        className={`fixed inset-0 ${
          toggleMenu ? "" : "translate-x-[100%]"
        } transition-transform duration-400 ease-in-out bg-white flex flex-col`}
      >
        <button
          onClick={() => setToggleMenu(false)}
          className="cursor-pointer p-4 active:opacity-70 transition-opacity duration-300 ease-in-out border-b-2 border-gray-500/30"
        >
          <FaArrowLeft size={30} />
        </button>
        <Link
          href="/"
          className="text-2xl font-bold p-4 border-b-2 border-gray-500/30 hover:bg-[#054721] hover:text-white transition-colors duration-200 ease-in-out"
        >
          Home
        </Link>
        <Link
          href="/roster"
          className="text-2xl font-bold p-4 border-b-2 border-gray-500/30 hover:bg-[#054721] hover:text-white transition-colors duration-200 ease-in-out"
        >
          Roster
        </Link>
        <Link
          href="/schedule"
          className="text-2xl font-bold p-4 border-b-2 border-gray-500/30 hover:bg-[#054721] hover:text-white transition-colors duration-200 ease-in-out"
        >
          Schedule
        </Link>
        <Link
          href="/news"
          className="text-2xl font-bold p-4 border-b-2 border-gray-500/30 hover:bg-[#054721] hover:text-white transition-colors duration-200 ease-in-out"
        >
          News
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
