"use client";

import { usePlayer } from "@/hooks/usePlayer";
import { classes, levels, teams } from "@/lib/types";
import { useState } from "react";
import { FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";

const PlayerFilters = () => {
  const [dropdowns, setDropdowns] = useState({
    class: false,
    team: false,
    level: false,
  });
  const { changeFilters, searchQuery, setSearchQuery } = usePlayer();

  const classDropdown: classes[] = [
    "Freshman",
    "Sophomore",
    "Junior",
    "Senior",
  ];

  const teamDropdown: teams[] = ["Boy", "Girl"];

  const levelDropdown: levels[] = ["TBD", "Varsity", "Junior Varsity"];
  return (
    <div>
      <div className="w-full flex md:flex-row md:items-center md:gap-16 flex-col gap-2">
        <div className="flex-1">
          <div className="w-full flex items-center ">
            <FaMagnifyingGlass />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a player..."
              className="p-2 outline-0 flex-1"
            />
          </div>
          <hr className="md:hidden"/>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() =>
                setDropdowns((prev) => ({ ...prev, class: !prev.class }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <p>Class</p>
              <FaChevronRight
                className={`transition-transform duration-200 ease-in-out ${
                  dropdowns.class ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`absolute z-[1000] free-green-bg md:right-0 md:left-auto left-0 top-[125%] p-2 rounded transition-opacity duration-200 ease-in-out ${
                dropdowns.class
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {classDropdown.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-1">
                    <input
                      onChange={() => changeFilters<classes>("class", item)}
                      type="checkbox"
                      id={item}
                      className="accent-black"
                    />
                    <label className="text-white" htmlFor={item}>
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() =>
                setDropdowns((prev) => ({ ...prev, team: !prev.team }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <p>Team</p>
              <FaChevronRight
                className={`transition-transform duration-200 ease-in-out ${
                  dropdowns.team ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`absolute z-[1000] free-green-bg right-0 top-[125%] p-2 rounded transition-opacity duration-200 ease-in-out ${
                dropdowns.team
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {teamDropdown.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-1">
                    <input
                      onChange={() => changeFilters<teams>("team", item)}
                      type="checkbox"
                      id={item}
                      className="accent-black"
                    />
                    <label className="text-white" htmlFor={item}>
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() =>
                setDropdowns((prev) => ({
                  ...prev,
                  level: !prev.level,
                }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <p>Level</p>
              <FaChevronRight
                className={`transition-transform duration-200 ease-in-out ${
                  dropdowns.level ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`absolute z-[1000] free-green-bg right-0 top-[125%] p-2 rounded transition-opacity duration-200 ease-in-out ${
                dropdowns.level
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {levelDropdown.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-1">
                    <input
                      onChange={() => changeFilters<levels>("level", item)}
                      type="checkbox"
                      id={item}
                      className="accent-black"
                    />
                    <label
                      className="text-white whitespace-nowrap"
                      htmlFor={item}
                    >
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <hr className="hidden md:block" />
    </div>
  );
};

export default PlayerFilters;
