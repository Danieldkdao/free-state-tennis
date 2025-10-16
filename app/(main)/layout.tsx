import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-[95%] md:w-[90%] lg:w-[85%] flex items-center justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
