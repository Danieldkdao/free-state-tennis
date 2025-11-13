"use client";
import { FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";
import Event from "./event";
import { Event as EventType, Team } from "@/lib/types";
import { useEffect, useState, useRef, useCallback } from "react";
import { formatDateTimeLocal } from "../admin/events/ss-row";

export type DateRangeStateType = {
  start: null | string;
  end: null | string;
};

const EventMain = ({ events }: { events: EventType[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [levelFilters, setLevelFilters] = useState<string[]>([]);
  const [homeFilters, setHomeFilters] = useState<boolean[]>([]);
  const [filteredEvents, setFilteredEvents] = useState([...events]);
  const [dateRange, setDateRange] = useState<DateRangeStateType>({
    start: null,
    end: null,
  });
  const [visibleCount, setVisibleCount] = useState(2);

  const levels: Team[] = [
    "Boys Varsity",
    "Boys Junior Varsity",
    "Girls Varsity",
    "Girls Junior Varsity",
  ];
  const homeaway = ["Home", "Away"];

  useEffect(() => {
    let filteredEventState = [...events];
    if (searchQuery.trim() !== "") {
      filteredEventState = filteredEventState.filter((item) =>
        item.opponent.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (levelFilters.length > 0) {
      filteredEventState = filteredEventState.filter((item) =>
        levelFilters.includes(item.team)
      );
    }
    if (homeFilters.length > 0) {
      filteredEventState = filteredEventState.filter((item) =>
        homeFilters.includes(item.away)
      );
    }
    if (dateRange.start && dateRange.end) {
      filteredEventState = filteredEventState.filter((item) => {
        if (dateRange.start && dateRange.end) {
          return (
            new Date(item.datetime) >= new Date(dateRange.start) &&
            new Date(item.datetime) <= new Date(dateRange.end)
          );
        } else return true;
      });
    }
    setFilteredEvents(filteredEventState);
    setVisibleCount(10);
  }, [searchQuery, levelFilters, homeFilters, dateRange, events]);

  const observer = useRef<IntersectionObserver>(null);
  const loadMoreTriggerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredEvents.length) {
          setVisibleCount((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [visibleCount, filteredEvents.length]
  );
  const eventsToShow = filteredEvents.slice(0, visibleCount);

  return (
    <div className="w-full mt-8 flex flex-col gap-4">
      <style>
        {`
            .event-item {
                opacity: 0;
                animation: fadeIn 0.5s ease-in forwards;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}
      </style>
      <h1 className="text-4xl font-bold">Schedule</h1>
      <div className="w-full">
        <div className="w-full flex items-center ">
          <FaMagnifyingGlass />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for an event"
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
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label
                  className="font-bold cursor-pointer"
                  htmlFor="date-start"
                >
                  Start date:
                </label>
                <input
                  type="datetime-local"
                  id="date-start"
                  value={dateRange.start ? dateRange.start : ""}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      start:
                        e.target.value === ""
                          ? null
                          : formatDateTimeLocal(e.target.value),
                    }))
                  }
                  className="outline-0 cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-bold cursor-pointer" htmlFor="date-end">
                  End date:
                </label>
                <input
                  type="datetime-local"
                  id="date-end"
                  value={dateRange.end ? dateRange.end : ""}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      end:
                        e.target.value === ""
                          ? null
                          : formatDateTimeLocal(e.target.value),
                    }))
                  }
                  className="outline-0 cursor-pointer"
                />
              </div>
            </div>
            <hr />
            <div className="flex items-center gap-4">
              {homeaway.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <label htmlFor={item} className="cursor-pointer">
                    {item}
                  </label>
                  <input
                    type="checkbox"
                    onChange={() => {
                      const truefalse = item === "Away";
                      homeFilters.includes(truefalse)
                        ? setHomeFilters(
                            homeFilters.filter((item) => item !== truefalse)
                          )
                        : setHomeFilters((prev) => [...prev, truefalse]);
                    }}
                    id={item}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <hr />
            <div className="flex items-center gap-4 flex-wrap">
              {levels.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <label htmlFor={item} className="cursor-pointer">
                    {item}
                  </label>
                  <input
                    type="checkbox"
                    onChange={() => {
                      levelFilters.includes(item)
                        ? setLevelFilters(
                            levelFilters.filter((level) => level !== item)
                          )
                        : setLevelFilters((prev) => [...prev, item]);
                    }}
                    id={item}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        {filteredEvents.length === 0 ? (
          <h1 className="text-2xl">No results found for "{searchQuery}"</h1>
        ) : (
          <>
            {eventsToShow.map((event, index) => {
              return (
                <div key={index} className="event-item">
                  <Event event={event} />
                </div>
              );
            })}
            {visibleCount < filteredEvents.length && (
              <div ref={loadMoreTriggerRef} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventMain;
