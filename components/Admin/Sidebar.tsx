"use client";

import { FaPeopleGroup, FaFile, FaCalendar } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminNavbar } from "@/hooks/useAdminNavbar";

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
  const { sidebarOpen, setSidebarOpen } = useAdminNavbar();
  const currentPageUndef = pathname?.split("/").pop();
  const currentPage = currentPageUndef ? currentPageUndef : "";

  return (
    <div className={`w-48 bg-white border-r border-gray-300 max-sm:absolute top-[108] bottom-0 z-10 ${sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out z-[100]`}>
      {sidebarLinks.map((item, i) => {
        const isSelected = item.link === currentPage;

        return (
          <Link key={i} href={`/admin/dashboard/${item.link}`} onNavigate={() => setSidebarOpen(false)}>
            <div
              className={`flex items-center gap-2 p-2 pl-6 ${
                isSelected &&
                "bg-gradient-to-r from-green-50 to-green-200 border-r-8 border-green-950"
              }`}
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
