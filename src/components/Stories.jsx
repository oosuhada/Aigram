// src/components/Stories.jsx
import React from "react";

const storiesData = [
  { id: 1, username: "mijinseooo", img: "https://randomuser.me/api/portraits/women/17.jpg" },
  { id: 2, username: "seoul.soul_mate", img: "https://randomuser.me/api/portraits/women/27.jpg" },
  { id: 3, username: "yoon_stagram", img: "https://randomuser.me/api/portraits/women/78.jpg" },
  { id: 4, username: "k_hyeoni", img: "https://randomuser.me/api/portraits/men/65.jpg" },
  { id: 5, username: "seo_yun.daily", img: "https://randomuser.me/api/portraits/women/90.jpg" },
];

const Stories = () => {
  return (
    <div className="flex justify-center w-full">
      {/* Stories Container */}
      <div className="flex gap-4 py-2 px-3 max-w-xl border border-gray-300 rounded-lg">
        {/* Add Story Button */}
        <div className="flex flex-col items-center min-w-[70px] cursor-pointer">
          <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center bg-white relative group">
            <span className="text-2xl text-gray-500 font-bold">+</span>
            <span className="absolute w-full h-full rounded-full bg-pink-400 opacity-30 animate-ping"></span>
          </div>
          <span className="text-xs text-gray-600 mt-1 truncate w-16 text-center">
            Your Story
          </span>
        </div>

        {/* Existing Stories */}
        {storiesData.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center min-w-[70px] cursor-pointer hover:scale-105 transform transition"
          >
            <div className="w-16 h-16 p-[2px] bg-gradient-to-tr from-pink-500 via-yellow-500 to-purple-500 rounded-full flex items-center justify-center">
              <img
                src={story.img}
                alt={story.username}
                className="w-14 h-14 rounded-full border-2 border-white object-cover"
              />
            </div>
            <span className="text-xs text-gray-600 mt-1 truncate w-16 text-center">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
