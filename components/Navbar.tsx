"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/free-state-logo.png";
import Link from "next/link";
import { FaBars, FaArrowLeft, FaRightToBracket } from "react-icons/fa6";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="w-full flex p-5 items-center justify-between top-0 sticky bg-white z-[10000]">
      <div className="flex items-center gap-4">
        <Link href="https://www.freestateathletics.com/" target="_blank">
          <Image
            src={Logo}
            alt="Free state logo"
            height={70}
            width={70}
            className="mr-15"
          />
        </Link>
        <Link href="/" className="text-2xl font-bold sm:block hidden">
          Home
        </Link>
        <Link href="/roster" className="text-2xl font-bold sm:block hidden">
          Roster
        </Link>
        <Link href="/schedule" className="text-2xl font-bold sm:block hidden">
          Schedule
        </Link>
        <Link href="/news" className="text-2xl font-bold sm:block hidden">
          News
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setToggleMenu(true)}
          className="cursor-pointer sm:hidden hover:opacity-50 active:scale-85 transition-all duration-200 ease-in-out"
        >
          <FaBars size={40} />
        </button>
        <button
          className="cursor-pointer transition-all duration-200 ease-in-out"
        >
          <FaRightToBracket size={40} />
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
