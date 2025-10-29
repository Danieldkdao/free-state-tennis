"use client";

import { useState } from "react";
import { FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";

const PlayerFilters = () => {
  const [dropdowns, setDropdowns] = useState({
    year: false,
    gender: false,
    position: false,
  });

  const yearDropdown = ["Freshman", "Sophomore", "Junior", "Senior"];

  const genderDropdown = ["Boy", "Girl"];

  const positionDropdown = ["Varsity", "Junior Varsity"];
  return (
    <div>
      <div className="w-full flex items-center justify-between gap-16">
        <div className="flex-1 max-w-[500px] flex items-center ">
          <FaMagnifyingGlass />
          <input
            type="text"
            placeholder="Search for a player..."
            className="p-2 rounded outline-0 flex-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <select className="outline-0">
            <option value="2025-2026">2025-2026</option>
          </select>
          <div className="relative">
            <button
              onClick={() =>
                setDropdowns((prev) => ({ ...prev, year: !prev.year }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <p>Year</p>
              <FaChevronRight
                className={`transition-transform duration-200 ease-in-out ${
                  dropdowns.year ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`absolute z-[1000] free-green-bg right-0 top-[125%] p-2 rounded transition-opacity duration-200 ease-in-out ${
                dropdowns.year
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {yearDropdown.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-1">
                    <input type="checkbox" id={item} className="accent-black" />
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
                setDropdowns((prev) => ({ ...prev, gender: !prev.gender }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <p>Gender</p>
              <FaChevronRight
                className={`transition-transform duration-200 ease-in-out ${
                  dropdowns.gender ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`absolute z-[1000] free-green-bg right-0 top-[125%] p-2 rounded transition-opacity duration-200 ease-in-out ${
                dropdowns.gender
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {genderDropdown.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-1">
                    <input type="checkbox" id={item} className="accent-black" />
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
                  position: !prev.position,
                }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <p>Position</p>
              <FaChevronRight
                className={`transition-transform duration-200 ease-in-out ${
                  dropdowns.position ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`absolute z-[1000] free-green-bg right-0 top-[125%] p-2 rounded transition-opacity duration-200 ease-in-out ${
                dropdowns.position
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {positionDropdown.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-1">
                    <input type="checkbox" id={item} className="accent-black" />
                    <label className="text-white" htmlFor={item}>
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PlayerFilters;
