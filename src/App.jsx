import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Feed from "./components/Feed.jsx";
import Reels from "./components/Reels.jsx";
import LeftSidebar from "./components/LeftSideBar.jsx";
import SuggestedPeople from "./components/SuggestedPeople.jsx";
import SearchPanel from "./components/SearchBar.jsx";
import NotificationPanel from "./components/NotificationPanel.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import CreatePostModal from "./components/CreatePostModal.jsx";

// Pages
import Profile from "./pages/Profile.jsx";
import Messages from "./pages/Messages.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import Settings from "./pages/Settings.jsx";
import YourActivity from "./pages/YourActivity.jsx";
import Saved from "./pages/Saved.jsx";
import ReportProblem from "./pages/ReportProblem.jsx";

function App() {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Theme Management
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

  // Shared state for sent posts
  const [sentPosts, setSentPosts] = useState([]);

  const handleSendPost = (post, recipient) => {
    const newSent = { id: Date.now(), post, recipient };
    setSentPosts((prev) => [...prev, newSent]);
  };

  const isHome = location.pathname === "/";
  const isMessages = location.pathname === "/messages";

  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 flex relative transition-colors duration-300 w-full overflow-x-hidden">
      {/* ===== Top Header (Mobile Only) ===== */}
      <Navbar />

      {/* ===== Left Sidebar (Desktop Only) ===== */}
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

      {/* ===== Bottom Navbar (Mobile Only) ===== */}
      <div className="md:hidden">
        <Footer />
      </div>

      {/* ===== Overlay ===== */}
      {(isSearchOpen || isNotifOpen) && (
        <div 
          onClick={() => {
            setIsSearchOpen(false);
            setIsNotifOpen(false);
          }}
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-[1px] transition-all duration-300"
        ></div>
      )}

      {/* ===== Search/Notification Panels ===== */}
      <div className={`fixed left-0 md:left-20 top-0 h-full w-full md:w-[400px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${isSearchOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
      <div className={`fixed left-0 md:left-20 top-0 h-full w-full md:w-[400px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${isNotifOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      </div>

      {/* ===== Modals ===== */}
      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      {/* ===== Main Content Area ===== */}
      <div className={`flex-1 min-w-0 w-full transition-all duration-300 mt-14 md:mt-0 ${isMessages || isSearchOpen || isNotifOpen ? "md:ml-20" : "md:ml-20 xl:ml-[244px]"}`}>
        {isMessages ? (
          <div className="w-full h-full"><Messages sentPosts={sentPosts} /></div>
        ) : (
          <div className="flex w-full mt-4 md:mt-10 px-0 justify-center">
            <div className="flex w-full max-w-[1300px] md:gap-6 justify-center mx-auto mb-20 md:mb-0 px-2 md:px-0">
              <div className="w-full md:flex-1 max-w-[935px] min-w-0">
                <Routes>
                  <Route path="/" element={<Feed onSendPost={handleSendPost} />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/reels" element={<Reels />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/activity" element={<YourActivity />} />
                  <Route path="/saved" element={<Saved />} />
                  <Route path="/report" element={<ReportProblem />} />
                </Routes>
              </div>
              {isHome && (
                <div className="hidden xl:flex w-[320px] flex-shrink-0">
                  <SuggestedPeople />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
