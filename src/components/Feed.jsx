'use client';

import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useLanguage, useUser } from "../hooks/use-context";
import { mockUsers } from "../data/mockUsers";
import { postsData } from "../data/posts";
import StoryViewer from "./StoryViewer.jsx";

const Feed = () => {
  const { t, language } = useLanguage();
  const { user, toggleFollow } = useUser();
  
  const [posts, setPosts] = useState([]);
  const [likedPostsIds, setLikedPostsIds] = useState(new Set());
  const [mediaIndexes, setMediaIndexes] = useState({}); // Track media index per post
  const [translatedPosts, setTranslatedPosts] = useState(new Set());
  const [expandedCaptions, setExpandedCaptions] = useState(new Set());
  const [showComments, setShowComments] = useState(new Set());
  
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [storyViewerData, setStoryViewerData] = useState({ isOpen: false, initialUserIndex: 0, userStories: [] });
  
  const isDragging = useRef(false);
  const startY = useRef(0);

  // Initialize Feed and media indexes
  useEffect(() => {
    setPosts(postsData);
    const initialIndexes = {};
    postsData.forEach(p => initialIndexes[p.id] = 0);
    setMediaIndexes(initialIndexes);
  }, []);

  /* ===== PULL TO REFRESH ===== */
  const handleStart = (clientY) => {
    if (window.scrollY <= 0) {
      isDragging.current = true;
      startY.current = clientY;
    }
  };

  const handleMove = (clientY) => {
    if (!isDragging.current) return;
    const distance = clientY - startY.current;
    if (distance > 0 && window.scrollY <= 0) {
      setPullDistance(Math.min(distance / 2, 80));
    }
  };

  const handleEnd = () => {
    if (isDragging.current && pullDistance > 60) {
      refreshFeed();
    }
    isDragging.current = false;
    setPullDistance(0);
  };

  const refreshFeed = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Remove liked posts and shuffle
      const filtered = postsData.filter(p => !likedPostsIds.has(p.id));
      const finalPosts = filtered.length > 0 ? [...filtered].sort(() => Math.random() - 0.5) : [...postsData].sort(() => Math.random() - 0.5);
      setPosts(finalPosts);
      setRefreshing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  /* ===== SLIDER LOGIC ===== */
  const nextMedia = (postId, max) => {
    setMediaIndexes(prev => ({ ...prev, [postId]: Math.min((prev[postId] || 0) + 1, max - 1) }));
  };

  const prevMedia = (postId) => {
    setMediaIndexes(prev => ({ ...prev, [postId]: Math.max((prev[postId] || 0) - 1, 0) }));
  };

  /* ===== INTERACTION LOGIC ===== */
  const handleLike = (id) => {
    setLikedPostsIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleTranslation = (id) => {
    setTranslatedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const openStoryViewer = (clickedUserIndex, storyItems) => {
    setStoryViewerData({
      isOpen: true,
      initialUserIndex: clickedUserIndex,
      userStories: storyItems
    });
  };

  const getStoryBarItems = () => {
    const following = user.followingList || [];
    const items = [];
    const myFullData = { ...user, ...mockUsers[user.username] };
    
    // 1. ME
    items.push({
      id: "me",
      username: user.username,
      img: myFullData.profilePics[myFullData.currentPicIndex],
      stories: myFullData.stories || [],
      isMe: true
    });

    // 2. FOLLOWING
    following.forEach(uname => {
      const u = mockUsers[uname];
      if (u?.stories?.length > 0) {
        items.push({ id: uname, username: uname, img: u.profilePics[0], stories: u.stories });
      }
    });
    return items;
  };

  const storyItems = getStoryBarItems();

  return (
    <div 
      className="flex-1 min-h-screen bg-white dark:bg-black overflow-x-hidden touch-pan-y"
      onMouseDown={(e) => handleStart(e.clientY)}
      onMouseMove={(e) => handleMove(e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      {/* PTR Indicator */}
      <div 
        className="flex justify-center items-center overflow-hidden transition-all duration-300"
        style={{ height: pullDistance > 0 ? `${pullDistance}px` : (refreshing ? '60px' : '0px') }}
      >
        <RefreshCw className={`w-6 h-6 text-blue-500 ${refreshing ? 'animate-spin' : ''}`} style={{ transform: `rotate(${pullDistance * 5}deg)` }} />
      </div>

      <div className="max-w-[600px] mx-auto pt-2 pb-10 flex flex-col gap-4">
        {/* Story Viewer */}
        {storyViewerData.isOpen && (
          <StoryViewer 
            userStories={storyViewerData.userStories} 
            initialUserIndex={storyViewerData.initialUserIndex} 
            onClose={() => setStoryViewerData(prev => ({ ...prev, isOpen: false }))} 
          />
        )}

        {/* Stories Bar */}
        <div className="bg-white dark:bg-black py-4 border-b border-gray-100 dark:border-gray-900">
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-4">
            {storyItems.map((item, index) => (
              <div key={item.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
                <div 
                  onClick={() => openStoryViewer(index, storyItems.map(si => ({ user: { username: si.username, profilePic: si.img }, stories: si.stories })))}
                  className="p-[2.5px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 active:scale-95 transition-all"
                >
                  <div className="p-[2px] bg-white dark:bg-black rounded-full">
                    <img src={item.img} alt="" className="w-14 h-14 rounded-full object-cover" />
                  </div>
                </div>
                <span className="text-[11px] text-gray-500 truncate w-16 text-center">{item.isMe ? "Your Story" : item.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feed Posts */}
        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const isLiked = likedPostsIds.has(post.id);
            const isExpanded = expandedCaptions.has(post.id);
            const isCommentsOpen = showComments.has(post.id);
            const isTranslated = translatedPosts.has(post.id);
            const isFollowing = user.followingList?.includes(post.username);
            const currentIdx = mediaIndexes[post.id] || 0;
            const mediaCount = post.media?.length || 0;
            const hasStories = mockUsers[post.username]?.stories?.length > 0;

            return (
              <div key={post.id} className="bg-white dark:bg-black md:border md:border-gray-200 dark:md:border-gray-800 md:rounded-xl overflow-hidden shadow-sm">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${hasStories ? "p-[1.5px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" : "border border-gray-100 dark:border-gray-800"}`}>
                      <div className={`${hasStories ? "p-[1.5px] bg-white dark:bg-black rounded-full w-full h-full" : "w-full h-full"}`}>
                        <img src={post.userImg} alt="" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Link href={`/${post.username}`} className="font-bold text-sm hover:underline dark:text-white">{post.username}</Link>
                        <span className="text-gray-400">• {post.createdAt}</span>
                      </div>
                      {post.isSuggested && <span className="text-gray-500 text-[11px] font-medium mt-[-2px]">Suggested for you</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {post.isSuggested && !isFollowing && <button onClick={() => toggleFollow(post.username)} className="text-blue-500 text-sm font-bold hover:text-blue-700">Follow</button>}
                    <MoreHorizontal className="text-gray-500 w-5 h-5 cursor-pointer" />
                  </div>
                </div>

                {/* Media Slider */}
                <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden" onDoubleClick={() => handleLike(post.id)}>
                   <div className="flex h-full transition-transform duration-300" style={{ transform: `translateX(-${currentIdx * 100}%)`, width: `${mediaCount * 100}%` }}>
                     {post.media?.map((m, i) => (
                       <img key={i} src={m.url} className="w-full h-full object-cover flex-shrink-0" alt="" />
                     ))}
                   </div>
                   {mediaCount > 1 && (
                     <>
                        {currentIdx > 0 && <button onClick={() => prevMedia(post.id)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow-md"><ChevronLeft className="w-5 h-5 text-black" /></button>}
                        {currentIdx < mediaCount - 1 && <button onClick={() => nextMedia(post.id, mediaCount)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow-md"><ChevronRight className="w-5 h-5 text-black" /></button>}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                          {post.media.map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIdx ? "bg-blue-500" : "bg-gray-300/60"}`} />)}
                        </div>
                     </>
                   )}
                </div>

                {/* Actions & Stats */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                       <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => handleLike(post.id)}>
                         <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "dark:text-white"}`} />
                         <span className="text-sm font-bold dark:text-white">{(isLiked ? post.like_count + 1 : post.like_count).toLocaleString()}</span>
                       </div>
                       <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setShowComments(prev => {const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })}>
                         <MessageCircle className="w-6 h-6 dark:text-white" /><span className="text-sm font-bold dark:text-white">{post.comment_count}</span>
                       </div>
                       <div className="flex items-center gap-1.5"><Send className="w-6 h-6 dark:text-white" /><span className="text-sm font-bold dark:text-white">{post.share_count}</span></div>
                    </div>
                    <Bookmark className="w-6 h-6 dark:text-white" />
                  </div>

                  {/* Caption & Translate */}
                  <div className="text-sm leading-relaxed">
                    <span className="font-bold mr-2 dark:text-white">{post.username}</span>
                    <span className="dark:text-gray-200">
                      {isExpanded ? (isTranslated ? (language === 'ko' ? post.enCaption : post.caption) : post.caption) : `${post.caption.substring(0, 50)}`}
                      {post.caption.length > 50 && !isExpanded && (
                        <button onClick={() => setExpandedCaptions(prev => {const n = new Set(prev); n.add(post.id); return n;})} className="text-gray-400 ml-1">... {language === 'ko' ? '더 보기' : 'more'}</button>
                      )}
                    </span>
                  </div>

                  {/* Comments Toggle */}
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setShowComments(prev => {const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n;})} className="text-gray-400 text-sm w-fit">
                      {isCommentsOpen ? (language === 'ko' ? '댓글 숨기기' : 'Hide comments') : `${language === 'ko' ? '댓글' : 'View all'} ${post.comment_count}${language === 'ko' ? '개 모두 보기' : ' comments'}`}
                    </button>
                    {isCommentsOpen && post.comments?.map((c, i) => (
                      <div key={i} className="flex gap-2 text-sm"><span className="font-bold dark:text-white">{c.username}</span><span className="dark:text-gray-300">{c.text}</span></div>
                    ))}
                  </div>

                  {/* Translation Link */}
                  <button onClick={() => toggleTranslation(post.id)} className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase w-fit">
                    {isTranslated ? (language === 'ko' ? '원문 보기' : 'See original') : (language === 'ko' ? '번역 보기' : 'See translation')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
