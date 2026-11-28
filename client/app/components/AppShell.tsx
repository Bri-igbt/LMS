"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthModal from "./AuthModal";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isPlayer = pathname.startsWith("/learn/");

  return (
    <div
      className={`flex flex-col bg-white font-urbanist ${
        isPlayer ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      <Toaster position="bottom-right" />
      <AuthModal />
      <Navbar />
      <main
        className={`flex-1 ${isPlayer ? "h-full min-h-0 overflow-hidden" : ""}`}
      >
        {children}
      </main>

      {!isPlayer && <Footer />}
    </div>
  );
};

export default AppShell;
