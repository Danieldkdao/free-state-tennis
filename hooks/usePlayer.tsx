"use client";

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
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  return (
    <PlayerContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isSaving,
        setIsSaving,
        lastSaved,
        setLastSaved,
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
