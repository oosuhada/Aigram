import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 h-14 z-50 flex items-center justify-between px-4 md:hidden transition-colors duration-300">
      {/* Brand Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span
          className="text-[25px] text-black dark:text-white mt-1"
          style={{ fontFamily: "'Grand Hotel', cursive" }}
        >
          Instagram
        </span>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <Heart className="w-6 h-6 text-black dark:text-white cursor-pointer" />
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-black dark:text-white cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">
            5
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;