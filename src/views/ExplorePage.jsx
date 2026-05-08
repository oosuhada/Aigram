// src/views/ExplorePage.jsx
'use client';

import React from "react";

// Random images with variable heights
const images = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  src: `https://picsum.photos/400/${300 + Math.floor(Math.random() * 200)}?random=${i}`,
  likes: Math.floor(Math.random() * 500),
  comments: Math.floor(Math.random() * 100),
}));

const ExplorePage = () => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-black transition-colors duration-300 py-2">
      {/* Masonry grid with small gap */}
      <div className="columns-2 md:columns-3 gap-1 md:gap-6 px-1 md:px-0">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative w-full break-inside-avoid overflow-hidden group cursor-pointer mb-1 md:mb-6"
          >
            <img
              src={img.src}
              alt="explore"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:brightness-75"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 text-white font-bold text-lg transition-opacity duration-200">
              <div className="flex items-center gap-1">
                <span>❤️ {img.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬 {img.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
