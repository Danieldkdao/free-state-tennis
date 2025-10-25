import AdminNavbar from "@/components/Admin/Navbar";
import AdminSidebar from "@/components/Admin/Sidebar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 overflow-auto bg-white p-5">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
