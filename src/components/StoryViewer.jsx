'use client';

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const StoryViewer = ({ userStories, initialUserIndex = 0, onClose }) => {
  const router = useRouter();
  const [userIndex, setUserIndex] = useState(initialUserIndex);
  const [storyIndex, setStoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserIndex(initialUserIndex);
    setStoryIndex(0);
  }, [initialUserIndex]);

  const currentUserData = userStories[userIndex];
  const currentStories = currentUserData.stories;
  const currentStory = currentStories[storyIndex];

  const handleNext = (e) => {
    e?.stopPropagation();
    if (storyIndex < currentStories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else if (userIndex < userStories.length - 1) {
      setUserIndex(userIndex + 1);
      setStoryIndex(0);
    } else {
      onClose();
    }
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    } else if (userIndex > 0) {
      setUserIndex(userIndex - 1);
      const prevUserStories = userStories[userIndex - 1].stories;
      setStoryIndex(prevUserStories.length - 1);
    }
  };

  const goToProfile = (e, username) => {
    e.stopPropagation();
    router.push(`/${username}`);
    onClose();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) handleNext();
    }, 5000);
    return () => clearTimeout(timer);
  }, [userIndex, storyIndex, loading]);

  if (!userStories || userStories.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[500] bg-[#1a1a1a] flex items-center justify-center animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose}></div>

      <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gray-400 z-[510]">
        <X className="w-8 h-8" />
      </button>

      {/* Navigation Buttons */}
      {(userIndex > 0 || storyIndex > 0) && (
        <button onClick={handlePrev} className="hidden md:flex absolute left-4 lg:left-20 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all z-[510]">
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}
      <button onClick={handleNext} className="hidden md:flex absolute right-4 lg:right-20 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all z-[510]">
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Story Card Container */}
      <div className="relative w-full max-w-[420px] aspect-[9/16] bg-black md:rounded-lg overflow-hidden shadow-2xl z-[505] flex flex-col">
        
        {/* Top Progress Bars */}
        <div className="absolute top-2 left-0 right-0 flex gap-1 px-2 z-[510]">
          {currentStories.map((_, i) => (
            <div key={i} className="h-[2px] flex-1 bg-white/30 overflow-hidden rounded-full">
              <div 
                key={`${userIndex}-${i}`}
                className={`h-full bg-white transition-all duration-300 ${
                  i < storyIndex ? "w-full" : (i === storyIndex && !loading) ? "animate-storyProgress" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* User Info Header */}
        <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-4 z-[510]">
          <div className="flex items-center gap-3">
            <div 
              onClick={(e) => goToProfile(e, currentUserData.user.username)}
              className="w-8 h-8 rounded-full border border-white/20 overflow-hidden cursor-pointer"
            >
              <img src={currentUserData.user.profilePic} className="w-full h-full object-cover" alt="" />
            </div>
            <span 
              onClick={(e) => goToProfile(e, currentUserData.user.username)}
              className="text-white text-sm font-semibold shadow-sm cursor-pointer hover:underline"
            >
              {currentUserData.user.username}
            </span>
            <span className="text-white/60 text-xs mt-0.5">{currentStory.createdAt}</span>
          </div>
          <MoreHorizontal className="text-white w-5 h-5 cursor-pointer" />
        </div>

        {/* Story Image */}
        <div className="flex-1 flex items-center justify-center bg-gray-900 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            key={currentStory.id}
            src={currentStory.img} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`} 
            alt="Story content" 
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Click Areas */}
        <div className="absolute inset-0 flex z-[508]">
          <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev}></div>
          <div className="w-2/3 h-full cursor-pointer" onClick={handleNext}></div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
