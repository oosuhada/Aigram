import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Bell,
  PlusCircle,
  User,
  Video,
  Menu,
  Cpu,
  FileText,
  Settings,
  Clock,
  Bookmark,
  SunMoon,
  AlertCircle,
  Users,
  LogOut,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage, useUser } from "../hooks/use-context";

const LeftSidebar = ({
  isCompact: forceCompact,
  onSearchClick,
  onNotificationClick,
  onThemeToggle,
  onNewPostClick,
  unreadMessages = 9,
  unreadNotifications = 3,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const createRef = useRef(null);

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createRef.current && !createRef.current.contains(event.target)) {
        setIsCreateOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isExpanded = isHovered && !forceCompact;

  const navItems = [
    { id: "home", name: t("home"), icon: Home, path: "/" },
    { id: "search", name: t("search"), icon: Search, path: "/search" },
    { id: "explore", name: t("explore"), icon: Compass, path: "/explore" },
    { id: "reels", name: t("reels"), icon: Video, path: "/reels" },
    {
      id: "messages",
      name: t("messages"),
      icon: MessageCircle,
      path: "/messages",
      unread: unreadMessages,
    },
    {
      id: "notifications",
      name: t("notifications"),
      icon: Bell,
      path: "#",
      unread: unreadNotifications,
    },
    { id: "create", name: t("create"), icon: PlusCircle, path: "/create" },
    { id: "profile", name: t("profile"), icon: User, path: "/profile", isProfile: true },
  ];

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col h-screen py-5 pl-5 pr-3 transition-all duration-300 ease-in-out z-50
      ${isExpanded ? "w-[244px] shadow-xl" : "w-20"} 
      bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-colors duration-300`}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center mb-8 relative">
        <Link 
          href="/"
          className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors inline-flex items-center"
        >
          <Instagram className="w-7 h-7 text-black dark:text-white flex-shrink-0" />
          <span 
            className={`text-[26px] text-black dark:text-white mt-1 transition-all duration-300 origin-left overflow-hidden whitespace-nowrap
            ${isExpanded ? "opacity-100 max-w-[150px] ml-4" : "opacity-0 max-w-0 ml-0"}`} 
            style={{ fontFamily: "'Grand Hotel', cursive" }}
          >
            Instagram
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || (item.id === "profile" && pathname.startsWith("/profile"));

          const handleClick = (e) => {
            if (item.id === "search") {
              e.preventDefault();
              if (onSearchClick) onSearchClick();
            } else if (item.id === "notifications") {
              e.preventDefault();
              if (onNotificationClick) onNotificationClick();
            } else if (item.id === "create") {
              e.preventDefault();
              setIsCreateOpen(!isCreateOpen);
            }
          };

          return (
            <div key={item.id} className="relative" ref={item.id === "create" ? createRef : null}>
              <Link
                href={item.path === "#" || !item.path ? pathname : item.path}
                onClick={handleClick}
                className="w-full flex items-center p-3 rounded-xl transition-all duration-200
                hover:bg-gray-100 dark:hover:bg-gray-900 group"
              >
                <div className="relative flex-shrink-0">
                  {item.isProfile ? (
                    <img
                      src={user.profilePics[user.currentPicIndex]}
                      alt="profile"
                      className={`w-6 h-6 rounded-full border-2 object-cover ${
                        isActive ? "border-black dark:border-white" : "border-transparent"
                      }`}
                    />
                  ) : (
                    <Icon
                      className={`w-6 h-6 transition-all duration-200 group-hover:scale-110 ${
                        isActive ? "text-black dark:text-white" : "text-gray-700 dark:text-gray-300"
                      }`}
                      strokeWidth={isActive ? 3 : 2}
                    />
                  )}

                  {item.unread > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: "#FF3040" }}>
                      {item.unread > 9 ? "9+" : item.unread}
                    </span>
                  )}
                </div>

                <span className={`text-[16px] transition-all duration-300 origin-left whitespace-nowrap overflow-hidden
                    ${isExpanded ? "opacity-100 max-w-[150px] ml-4 translate-x-0" : "opacity-0 max-w-0 ml-0 -translate-x-2 invisible"}
                    ${isActive ? "text-black dark:text-white font-bold" : "text-gray-700 dark:text-gray-300"}
                  `}>
                  {item.name}
                </span>
              </Link>

              {/* Create Dropdown */}
              {item.id === "create" && isCreateOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 shadow-2xl border dark:border-gray-800 z-[100] flex flex-col rounded-xl overflow-hidden animate-scaleIn">
                  <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b dark:border-gray-800" onClick={() => setIsCreateOpen(false)}>
                    <Cpu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm dark:text-white">AI Creation</span>
                  </button>
                  <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => { setIsCreateOpen(false); if(onNewPostClick) onNewPostClick(); }}>
                    <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm dark:text-white">{t("create")}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom More Menu */}
      <div ref={moreRef} className="mt-auto relative">
        <button 
          onClick={() => setIsMoreOpen(!isMoreOpen)} 
          className="w-full flex items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200"
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          <span className={`text-[16px] transition-all duration-300 origin-left whitespace-nowrap overflow-hidden
            ${isExpanded ? "opacity-100 max-w-[150px] ml-4 translate-x-0" : "opacity-0 max-w-0 ml-0 -translate-x-2 invisible"}
            text-gray-700 dark:text-gray-300`}>
            {t("seeAll")}
          </span>
        </button>

        {isMoreOpen && (
          <div className="absolute left-0 bottom-full mb-4 w-64 bg-white dark:bg-gray-900 shadow-2xl border dark:border-gray-800 rounded-2xl z-[110] flex flex-col p-2 animate-scaleIn">
            <div className="flex flex-col gap-1">
              {[
                { id: "settings", name: t("settings"), icon: Settings, path: "/settings" },
                { id: "activity", name: t("activity"), icon: Clock, path: "/activity" },
                { id: "saved", name: t("saved"), icon: Bookmark, path: "/saved" },
                { id: "appearance", name: t("appearance"), icon: SunMoon },
                { id: "report", name: t("report"), icon: AlertCircle, path: "/report" },
              ].map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => {
                    if (subItem.id === "appearance") {
                      onThemeToggle();
                    } else if (subItem.path) {
                      navigate(subItem.path);
                    }
                    setIsMoreOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <subItem.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{subItem.name}</span>
                </button>
              ))}
            </div>
            <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-red-500 font-medium">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">{t("logout")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
