"use client";

import { usePlayer } from "@/hooks/usePlayer";
import { classes, levels, teams } from "@/lib/types";
import { useState } from "react";
import { FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";

const PlayerFilters = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { changeFilters, searchQuery, setSearchQuery } = usePlayer();

  const classes: classes[] = ["Freshman", "Sophomore", "Junior", "Senior"];

  const teams: teams[] = ["Boy", "Girl"];

  const levels: levels[] = ["TBD", "Varsity", "Junior Varsity"];
  return (
    <div className="space-y-4">
      <div className="w-full">
        <div className="w-full flex items-center ">
          <FaMagnifyingGlass />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a player"
            className="p-2 outline-0 w-full"
          />
        </div>
        <hr />
      </div>
      <div className="rounded-md p-5 border">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <h1 className="text-xl flex-1">Filters</h1>
          <FaChevronRight
            className={`cursor-pointer transition-all duration-300 ease-in-out ${
              showFilters ? "rotate-90" : ""
            }`}
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showFilters ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2">
            <hr />
            <div className="flex items-center gap-4">
              {classes.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <label htmlFor={item} className="cursor-pointer">
                      {item}
                    </label>
                    <input
                      onChange={() => changeFilters<classes>("class", item)}
                      type="checkbox"
                      id={item}
                      className="cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
            <hr />
            <div className="flex items-center gap-4">
              {teams.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <label htmlFor={item} className="cursor-pointer">
                      {item}
                    </label>
                    <input
                      onChange={() => changeFilters<teams>("team", item)}
                      type="checkbox"
                      id={item}
                      className="cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
            <hr />
            <div className="flex items-center gap-4">
              {levels.map((item, index) => {
                return (
                  <div className="flex items-center gap-2" key={index}>
                    <label htmlFor={item} className="cursor-pointer">
                      {item}
                    </label>
                    <input
                      onChange={() => changeFilters<levels>("level", item)}
                      type="checkbox"
                      id={item}
                      className="cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerFilters;
