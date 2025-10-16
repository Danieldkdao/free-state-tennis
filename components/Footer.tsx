import Image from "next/image";
import React from "react";
import Logo from "@/public/free-state-logo.png";
import Link from "next/link";
import { FaFacebook, FaSquareXTwitter, FaSquareInstagram, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full flex-col justify-between items-start mt-32">
      <div className="w-full p-5 flex flex-col md:flex-row md:justify-between gap-10">
        <div className="flex flex-col gap-4">
          <Image src={Logo} alt="Free state logo" height={100} width={100} />
          <p className="max-w-[600px]">
            Here at the Free State High School Tennis Team, we play hard, have
            fun, and keep improving — on and off the court.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-2">The Team</h1>
          <Link href="/">Home</Link>
          <Link href="/roster">Roster</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/news">News</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-2">Accessibility</h1>
          <Link href="/">Terms of Service</Link>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Accessibility Statement</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium mb-2">Contact</h1>
          <Link href="/">111-111-111</Link>
          <Link href="/">email@gmail.com</Link>
          <div className="flex items-center gap-2 mt-2">
            <Link href="">
              <FaFacebook size={20} />
            </Link>
            <Link href="">
              <FaSquareInstagram size={20} />
            </Link>
            <Link href="">
              <FaSquareXTwitter size={20} />
            </Link>
            <Link href="">
              <FaTiktok size={20} />
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full py-4">
        <p className="text-sm text-center">
          Copyright 2025 - 2026 © Free State High School Tennis Team. All Rights
          Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
