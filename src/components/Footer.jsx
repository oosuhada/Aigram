import React from "react";
import { Home, Search, Video, ShoppingBag, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Search", icon: Search, path: "/search" },
    { name: "Reels", icon: Video, path: "/reels" },
    { name: "Shop", icon: ShoppingBag, path: "/shop" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around items-center h-16 z-50 transition-colors duration-300">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className="flex flex-col items-center justify-center transition-transform duration-200 active:scale-90 focus:outline-none"
          >
            <Icon
              className={`w-6 h-6 ${
                isActive ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-600"
              }`}
              strokeWidth={isActive ? 2.5 : 2}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Footer;