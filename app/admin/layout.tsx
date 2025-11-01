import AdminNavbar from "@/components/admin/Navbar";
import AdminSidebar from "@/components/admin/Sidebar";
import { ReactNode } from "react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const h = await headers()  
  const session = await auth.api.getSession({
    headers: h,
  });
  if(!session || session.user.role !== "admin"){
    return redirect("/");
  }

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
