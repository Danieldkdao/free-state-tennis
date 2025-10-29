"use client";

import Logo from "@/public/free-state-logo.png";
import Image from "next/image";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const router = useRouter();
  const logout = async () => {
    const response = await api.post(
      "/admin/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      router.push("/admin/login");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <Image src={Logo} alt="Free state logo" width={75} height={75} />
      <button className="cursor-pointer" onClick={logout}>
        <FaArrowRightToBracket size={50} />
      </button>
    </div>
  );
};

export default AdminNavbar;
