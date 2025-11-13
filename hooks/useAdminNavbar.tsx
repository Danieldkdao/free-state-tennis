"use client"
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type AdminNavbarContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const AdminNavbarContext = createContext<AdminNavbarContextType | null>(null);

export const AdminNavbarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminNavbarContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AdminNavbarContext.Provider>
  );
};

export const useAdminNavbar = () => {
  const context = useContext(AdminNavbarContext);
  if(!context) throw new Error("Admin navbar context must be used inside the admin navbar context provider.");
  return context;
}
