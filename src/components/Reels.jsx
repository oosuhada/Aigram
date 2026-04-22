'use client';

import React, { useState, useRef } from "react";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Music2,
  Volume2,
  VolumeX
} from "lucide-react";
import { useRouter } from "next/navigation";

const reelsData = [
  {
    id: 1,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-1282-large.mp4",
    username: "mijinseooo",
    userImg: "https://randomuser.me/api/portraits/women/17.jpg",
    caption: "Neon vibes in Seoul ✨ #Reels #Seoul #Neon",
    likes: "12.5K",
    comments: "420",
    music: "Original Audio - mijinseooo"
  },
  {
    id: 2,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    username: "nature_walker",
    userImg: "https://randomuser.me/api/portraits/women/44.jpg",
    caption: "Spring has arrived 🌼 #Nature #Spring",
    likes: "8.2K",
    comments: "156",
    music: "Nature Sounds - Peaceful"
  }
];

const Reels = () => {
  const [muted, setMuted] = useState(true);
  const router = useRouter();

  const goToProfile = (username) => {
    router.push(`/${username}`);
  };

  return (
    <div className="flex-1 h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black">
      {reelsData.map((reel) => (
        <div key={reel.id} className="h-screen w-full snap-start relative flex items-center justify-center">
          {/* Video Placeholder (Using Video tag for real effect) */}
          <div className="relative w-full max-w-[400px] h-[90%] bg-zinc-900 rounded-lg overflow-hidden group">
            <video 
              src={reel.videoUrl} 
              className="w-full h-full object-cover"
              loop
              autoPlay
              muted={muted}
              onClick={() => setMuted(!muted)}
            />
            
            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  onClick={() => goToProfile(reel.username)}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden cursor-pointer"
                >
                  <img src={reel.userImg} alt="" className="w-full h-full object-cover" />
                </div>
                <span 
                  onClick={() => goToProfile(reel.username)}
                  className="font-bold text-sm cursor-pointer hover:underline"
                >
                  {reel.username}
                </span>
                <button className="border border-white rounded-lg px-3 py-1 text-xs font-semibold hover:bg-white/20 transition-all">
                  Follow
                </button>
              </div>
              <p className="text-sm mb-3">{reel.caption}</p>
              <div className="flex items-center gap-2 text-xs">
                <Music2 className="w-3 h-3" />
                <span className="truncate">{reel.music}</span>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-2 bottom-20 flex flex-col items-center gap-6 text-white">
              <div className="flex flex-col items-center gap-1">
                <Heart className="w-7 h-7 cursor-pointer hover:text-gray-300" />
                <span className="text-xs">{reel.likes}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <MessageCircle className="w-7 h-7 cursor-pointer hover:text-gray-300" />
                <span className="text-xs">{reel.comments}</span>
              </div>
              <Send className="w-7 h-7 cursor-pointer hover:text-gray-300" />
              <Bookmark className="w-7 h-7 cursor-pointer hover:text-gray-300" />
              <MoreHorizontal className="w-7 h-7 cursor-pointer" />
            </div>

            {/* Mute Toggle Icon */}
            <div className="absolute top-4 right-4 text-white/50 group-hover:text-white transition-opacity">
              {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;
