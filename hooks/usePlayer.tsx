"use client";

import { classes, levels, teams } from "@/lib/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type PlayerContextType = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
  lastSaved: Date | null;
  setLastSaved: Dispatch<SetStateAction<Date | null>>;
  classFilters: classes[];
  teamFilters: teams[];
  levelFilters: levels[];
  changeFilters: <T>(dropdown: "class" | "team" | "level", value: T) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilters, setClassFilters] = useState<classes[]>([]);
  const [teamFilters, setTeamFilters] = useState<teams[]>([]);
  const [levelFilters, setLevelFilters] = useState<levels[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  function changeFilters<T>(dropdown: "class" | "team" | "level", value: T) {
    switch (dropdown) {
      case "class": {
        if (classFilters.includes(value as classes)) {
          setClassFilters((prev) => prev.filter((item) => item !== value));
        } else {
          setClassFilters((prev) => [...prev, value as classes]);
        }
        break;
      }
      case "team": {
        if (teamFilters.includes(value as teams)) {
          setTeamFilters((prev) => prev.filter((item) => item !== value));
        } else {
          setTeamFilters((prev) => [...prev, value as teams]);
        }
        break;
      }
      case "level": {
        if (levelFilters.includes(value as levels)) {
          setLevelFilters((prev) => prev.filter((item) => item !== value));
        } else {
          setLevelFilters((prev) => [...prev, value as levels]);
        }
        break;
      }
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isSaving,
        setIsSaving,
        lastSaved,
        setLastSaved,
        classFilters,
        teamFilters,
        levelFilters,
        changeFilters,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error(
      "Player context must be used inside the player context provider."
    );
  return context;
};
