'use client';

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Components
import LeftSidebar from "../../src/components/LeftSideBar.jsx";
import Footer from "../../src/components/Footer.jsx";
import Navbar from "../../src/components/Navbar.jsx";
import SearchPanel from "../../src/components/SearchBar.jsx";
import NotificationPanel from "../../src/components/NotificationPanel.jsx";
import CreatePostModal from "../../src/components/CreatePostModal.jsx";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Theme Management
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const isMessages = pathname === "/messages";

  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 flex relative transition-colors duration-300 w-full overflow-x-hidden">
      <Navbar />

      <div
        className={`fixed left-0 top-0 h-screen transition-all duration-300
          hidden md:block z-[60]
          ${isMessages || isSearchOpen || isNotifOpen ? "w-20" : "w-20 xl:w-[244px]"}`}
      >
        <LeftSidebar
          isCompact={isMessages || isSearchOpen || isNotifOpen}
          onSearchClick={() => {
            setIsSearchOpen(!isSearchOpen);
            setIsNotifOpen(false);
          }}
          onNotificationClick={() => {
            setIsNotifOpen(!isNotifOpen);
            setIsSearchOpen(false);
          }}
          onThemeToggle={toggleTheme}
          onNewPostClick={() => setIsCreateOpen(true)}
        />
      </div>

      <div className="md:hidden">
        <Footer />
      </div>

      {(isSearchOpen || isNotifOpen) && (
        <div 
          onClick={() => {
            setIsSearchOpen(false);
            setIsNotifOpen(false);
          }}
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-[1px] transition-all duration-300"
        ></div>
      )}

      <div className={`fixed left-0 md:left-20 top-0 h-full w-full md:w-[400px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${isSearchOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
      <div className={`fixed left-0 md:left-20 top-0 h-full w-full md:w-[400px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${isNotifOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      </div>

      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      <div className={`flex-1 min-w-0 w-full transition-all duration-300 mt-14 md:mt-0 ${isMessages || isSearchOpen || isNotifOpen ? "md:ml-20" : "md:ml-20 xl:ml-[244px]"}`}>
        {children}
      </div>
    </div>
  );
}
