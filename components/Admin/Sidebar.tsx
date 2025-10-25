"use client";

import React from "react";
import { FaPeopleGroup, FaFile, FaCalendar } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const sidebarLinks = [
    {
      text: "Players",
      icon: <FaPeopleGroup size={22} />,
      link: "players",
    },
    {
      text: "News",
      icon: <FaFile size={22} />,
      link: "news",
    },
    {
      text: "Events",
      icon: <FaCalendar size={22} />,
      link: "events",
    },
  ];

  const pathname = usePathname();
  const currentPageUndef = pathname?.split("/").pop();
  const currentPage = currentPageUndef ? currentPageUndef : "";

  return (
    <div className="w-48 border-r border-gray-300">
      {sidebarLinks.map((item, i) => {
        const isSelected = item.link === currentPage;

        return (
          <Link key={i} href={`/admin/dashboard/${item.link}`}>
            <div
              className={`flex items-center gap-2 p-2 pl-6 ${isSelected && "bg-gradient-to-r from-green-50 to-green-200 border-r-8 border-green-950"}`}
            >
              {item.icon}
              <h1 className="text-lg">{item.text}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
