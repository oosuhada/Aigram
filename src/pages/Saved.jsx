'use client';

import React from "react";
import { Bookmark } from "lucide-react";

const Saved = () => {
  const savedImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-normal dark:text-white">Saved</h2>
        <button className="text-blue-500 text-sm font-bold">+ New Collection</button>
      </div>
      <div className="text-xs text-gray-500 mb-4 uppercase font-bold tracking-widest border-b dark:border-gray-800 pb-4">
        All Posts
      </div>
      {savedImages.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {savedImages.map((img, i) => (
            <div key={i} className="aspect-square relative group cursor-pointer overflow-hidden rounded-sm">
              <img src={img} className="w-full h-full object-cover group-hover:brightness-75 transition" alt="Saved" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="p-4 border-2 border-black dark:border-white rounded-full mb-4">
            <Bookmark className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold dark:text-white">Save</h3>
          <p className="text-sm text-gray-500 text-center max-w-xs mt-2">Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.</p>
        </div>
      )}
    </div>
  );
};
export default Saved;
