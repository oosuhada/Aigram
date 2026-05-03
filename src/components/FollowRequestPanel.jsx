import React from "react";
import { ArrowLeft } from "lucide-react";

const FollowRequestsPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const followRequests = [
    {
      id: 1,
      name: "seoul.soul_mate",
      mutual: "mijinseooo님 외 3명이 팔로우합니다",
      img: "https://randomuser.me/api/portraits/women/27.jpg",
    },
    {
      id: 2,
      name: "k_hyeoni",
      mutual: "yoon_stagram님 외 2명이 팔로우합니다",
      img: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: 3,
      name: "seo_yun.daily",
      mutual: "minji_is_here님 외 1명이 팔로우합니다",
      img: "https://randomuser.me/api/portraits/women/90.jpg",
    },
    {
      id: 4,
      name: "june_04",
      mutual: "kim_soul_88님이 팔로우합니다",
      img: "https://randomuser.me/api/portraits/men/90.jpg",
    },
  ];

  return (
    <div className="fixed left-[5rem] top-0 h-full w-[400px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-2xl z-50 overflow-y-auto transition-colors duration-300">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-6 px-6 py-10 sticky top-0 bg-white dark:bg-black z-10 transition-colors duration-300">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>
        <h2 className="text-2xl font-bold dark:text-white">Follow requests</h2>
      </div>

      {/* ===== Requests List ===== */}
      <div className="px-2">
        {followRequests.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.img}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border dark:border-gray-800"
              />
              <div className="flex flex-col">
                <p className="text-sm font-bold dark:text-white leading-tight">{user.name}</p>
                <p className="text-sm text-gray-500 leading-tight truncate w-32">{user.mutual}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="bg-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-lg hover:bg-blue-600 transition-colors">
                Confirm
              </button>
              <button className="bg-gray-100 dark:bg-gray-800 dark:text-white text-sm font-bold px-4 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default FollowRequestsPanel;
