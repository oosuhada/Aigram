import React, { useState } from "react";
import { X, ChevronRight, Heart } from "lucide-react";
import FollowRequestsPanel from "./FollowRequestPanel.jsx";
import { useLanguage } from "../hooks/use-context";

const NotificationPanel = ({ isOpen, onClose }) => {
  const [isFollowRequestsOpen, setIsFollowRequestsOpen] = useState(false);
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <>
      {/* ===== Main Notification Panel ===== */}
      <div
        className={`fixed left-[5rem] top-0 h-full w-[400px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-2xl z-50 overflow-y-auto transition-all duration-300 ${
          isFollowRequestsOpen ? "hidden" : "block"
        }`}
      >
        {/* ===== Header ===== */}
        <div className="p-6 sticky top-0 bg-white dark:bg-black z-10 transition-colors duration-300">
          <h2 className="text-2xl font-bold dark:text-white">{t("notifications")}</h2>
        </div>

        {/* ===== Follow Requests Section ===== */}
        <div
          onClick={() => setIsFollowRequestsOpen(true)}
          className="px-6 py-4 border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/women/27.jpg"
                alt="Follow requests"
                className="w-11 h-11 rounded-full object-cover border dark:border-gray-800"
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white dark:border-black">
                 1
              </div>
            </div>
            <div>
              <p className="text-sm font-bold dark:text-white leading-tight">{t("followRequest")}</p>
              <p className="text-sm text-gray-500 leading-tight">{t("followRequestDesc")}</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400 w-5 h-5" />
        </div>

        {/* ===== Today Section ===== */}
        <div className="px-6 py-5">
          <h3 className="text-base font-bold dark:text-white mb-4">{t("today")}</h3>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src="https://randomuser.me/api/portraits/men/65.jpg"
                  alt="user1"
                  className="w-11 h-11 rounded-full border dark:border-gray-800"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white dark:border-black">
                   <Heart className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
              <div className="text-sm dark:text-white leading-snug">
                {language === 'ko' ? (
                  <>
                    <span className="font-bold">k_hyeoni</span>님 외 <span className="font-bold">3명</span>이 회원님의 릴스를 좋아합니다.
                  </>
                ) : (
                  <>
                    <span className="font-bold">k_hyeoni</span> and <span className="font-bold">3 others</span> {t("likedReel")}.
                  </>
                )}
                <span className="text-gray-500 text-xs ml-1">2h</span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=80"
              alt="post"
              className="w-11 h-11 rounded object-cover flex-shrink-0"
            />
          </div>
        </div>

        {/* ===== This Week Section ===== */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-900">
          <h3 className="text-base font-bold dark:text-white mb-4">{t("thisWeek")}</h3>
          
          {[
            {
              name: "june_04",
              textKey: "startedFollowing",
              time: language === 'ko' ? "2일" : "2d",
              img: "https://randomuser.me/api/portraits/men/90.jpg",
              button: t("following"),
            },
            {
              name: "seo_yun.daily",
              textKey: "startedFollowing",
              time: language === 'ko' ? "3일" : "3d",
              img: "https://randomuser.me/api/portraits/women/90.jpg",
              button: t("follow"),
              isPrimary: true
            }
          ].map((notif, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={notif.img}
                  alt={notif.name}
                  className="w-11 h-11 rounded-full border dark:border-gray-800"
                />
                <div className="text-sm dark:text-white leading-snug">
                  <span className="font-bold">{notif.name}</span>{t(notif.textKey)}. <span className="text-gray-500 text-xs ml-1">{notif.time}</span>
                </div>
              </div>
              <button className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                notif.isPrimary ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}>
                {notif.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Follow Requests Sub Panel ===== */}
      <FollowRequestsPanel
        isOpen={isFollowRequestsOpen}
        onClose={() => setIsFollowRequestsOpen(false)}
      />
    </>
  );
};

export default NotificationPanel;
