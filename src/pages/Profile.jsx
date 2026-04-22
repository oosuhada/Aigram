'use client';

import React, { useState } from "react";
import { Grid, Video, Contact, PlusCircle, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useUser, useLanguage } from "../hooks/use-context";
import { useRouter, useParams } from "next/navigation";
import { mockUsers } from "../data/mockUsers";
import StoryViewer from "../components/StoryViewer";

const Profile = () => {
  const { user: currentUser, setProfilePicIndex, toggleFollow } = useUser();
  const { t, language } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const username = params?.username;
  const [activeTab, setActiveTab] = useState("posts");
  const [storyViewer, setStoryViewer] = useState({ isOpen: false, initialUserIndex: 0 });

  // Determine which user data to show
  const isOwnProfile = !username || username === currentUser.username;
  const userData = isOwnProfile 
    ? { ...currentUser, ...mockUsers[currentUser.username] } 
    : mockUsers[username];

  if (!userData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <h2 className="text-xl font-bold mb-2">User not found</h2>
        <p className="text-gray-500">The link you followed may be broken, or the page may have been removed.</p>
        <Link href="/" className="mt-6 text-blue-500 font-semibold">Go back to home</Link>
      </div>
    );
  }
  
  const isFollowing = currentUser.followingList?.includes(userData.username);
  const showContent = isOwnProfile || !userData.isPrivate || isFollowing;

  const highlights = userData.highlights?.map(h => ({
    title: h,
    img: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=200&fit=crop`
  })) || [];

  const handleProfileClick = () => {
    if (userData.stories?.length > 0) {
      setStoryViewer({ isOpen: true, initialUserIndex: 0 });
    }
  };

  const renderTabContent = () => {
    if (!showContent) {
      return (
        <div className="w-full flex flex-col items-center justify-center py-24 border-t border-gray-200 dark:border-gray-800">
          <div className="w-20 h-20 rounded-full border-2 border-black dark:border-white flex items-center justify-center mb-6">
            <Lock className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold mb-2">{t("privateAccount") || "이 계정은 비공개 상태입니다"}</h3>
          <p className="text-gray-500 text-sm text-center max-w-xs">
            {t("privateAccountDesc") || "사진과 동영상을 보려면 이 계정을 팔로우하세요."}
          </p>
        </div>
      );
    }

    if (activeTab !== "posts") {
      return (
        <div className="w-full text-center py-20 text-gray-500">
          {activeTab === "reels" && "No reels to show."}
          {activeTab === "tagged" && "No tagged photos."}
        </div>
      );
    }

    if (!userData.posts || userData.posts.length === 0) {
      return (
        <div className="w-full text-center py-20 text-gray-500">
          No posts to show.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-1 sm:gap-4 mt-6 pb-10 w-full max-w-5xl">
        {userData.posts.map((post, i) => (
          <div key={i} className="relative overflow-hidden aspect-square group cursor-pointer">
            <img
              src={post.img}
              alt={`post ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200">
              <p className="text-white text-sm font-semibold tracking-widest">
                ❤️ 120 &nbsp;&nbsp; 💬 25
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 w-full h-screen overflow-auto bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="w-full px-4 md:px-6 py-6 flex flex-col items-center">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 w-full max-w-4xl mb-12">
          <div className="flex-shrink-0 relative group">
            <div 
              onClick={handleProfileClick}
              className={`w-24 h-24 md:w-40 md:h-40 rounded-full p-1 cursor-pointer ${
                userData.stories?.length > 0 ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              <img
                src={isOwnProfile ? userData.profilePics[userData.currentPicIndex || 0] : (userData.profilePics[0] || userData.userImg)}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-black shadow-sm"
              />
            </div>
            {isOwnProfile && userData.profilePics?.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); const nextIndex = ((userData.currentPicIndex || 0) - 1 + userData.profilePics.length) % userData.profilePics.length; setProfilePicIndex(nextIndex); }} 
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); const nextIndex = ((userData.currentPicIndex || 0) + 1) % userData.profilePics.length; setProfilePicIndex(nextIndex); }} 
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
          
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-5 mb-5">
              <h2 className="text-xl font-normal">{userData.username}</h2>
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <>
                    <button 
                      onClick={() => router.push("/settings")}
                      className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                    >
                      {t("editProfile")}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => toggleFollow(userData.username)}
                      className={`${isFollowing ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white" : "bg-blue-500 text-white hover:bg-blue-600"} px-6 py-1.5 rounded-lg text-sm font-semibold transition-all`}
                    >
                      {isFollowing ? (language === 'ko' ? "팔로잉" : "Following") : (language === 'ko' ? "팔로우" : "Follow")}
                    </button>
                    <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all">
                      {t("messages")}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-8 mb-5 text-[15px]">
              <span>
                <strong className="text-black dark:text-white">{userData.posts?.length || 0}</strong> {t("posts")}
              </span>
              <span className="cursor-pointer">
                <strong className="text-black dark:text-white">{userData.followers}</strong> {t("followers")}
              </span>
              <span className="cursor-pointer">
                <strong className="text-black dark:text-white">{userData.following}</strong> {t("followingCount")}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-[15px]">{userData.name}</h3>
              <p className="text-gray-900 dark:text-gray-100 text-[14px] leading-snug whitespace-pre-line">{userData.bio}</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex justify-start gap-4 md:gap-10 w-full max-w-4xl mb-12 overflow-x-auto no-scrollbar py-2 px-2">
          {highlights.map((hl, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[3px] border border-gray-200 dark:border-gray-800">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-black">
                  <img src={hl.img} alt={hl.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-[12px] font-semibold dark:text-gray-300">{hl.title}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="w-full max-w-4xl border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-center gap-12 md:gap-16">
            <button
              className={`flex items-center gap-2 py-4 border-t transition-all ${
                activeTab === "posts" ? "border-black dark:border-white text-black dark:text-white" : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <Grid className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[12px] uppercase font-bold tracking-widest">{t("posts")}</span>
            </button>
            <button
              className={`flex items-center gap-2 py-4 border-t transition-all ${
                activeTab === "reels" ? "border-black dark:border-white text-black dark:text-white" : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("reels")}
            >
              <Video className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[12px] uppercase font-bold tracking-widest">{t("reels")}</span>
            </button>
          </div>
        </div>

        {renderTabContent()}

      </div>

      {storyViewer.isOpen && (
        <StoryViewer 
          isOpen={true}
          initialUserIndex={0}
          userStories={[{
            user: { username: userData.username, profilePic: userData.profilePics[0] },
            stories: userData.stories.map(s => ({ id: s.id, img: s.img, createdAt: s.createdAt }))
          }]}
          onClose={() => setStoryViewer({ isOpen: false, initialUserIndex: 0 })}
        />
      )}
    </div>
  );
};

export default Profile;
