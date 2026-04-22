'use client';

import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "oosu.hada",
    name: "oosu",
    bio: "리액트 개발자 💻 | 맛집 탐방 좋아함 🍕 | 일상 공유 ☕",
    profilePics: ["/oosu.hada.jpg"],
    currentPicIndex: 0,
    followers: "2.4K",
    following: 321,
    followingList: ["mijinseooo", "seoul.soul_mate", "nature_walker", "urban_dev", "art_gallery"], // Expanded initial following
    stories: [
      { id: 1001, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1080&h=1920&fit=crop", createdAt: "30m" }
    ]
  });

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("userData");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  const updateProfile = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  const addPost = (newPost) => {
    setAllPosts(prev => [newPost, ...prev]);
  };

  const addProfilePic = (picUrl) => {
    setUser(prev => ({
      ...prev,
      profilePics: [...prev.profilePics, picUrl],
      currentPicIndex: prev.profilePics.length
    }));
  };

  const setProfilePicIndex = (index) => {
    setUser(prev => ({ ...prev, currentPicIndex: index }));
  };

  const toggleFollow = (username) => {
    setUser(prev => {
      const isFollowing = prev.followingList.includes(username);
      const newList = isFollowing 
        ? prev.followingList.filter(u => u !== username)
        : [...prev.followingList, username];
      
      return {
        ...prev,
        followingList: newList,
        following: isFollowing ? prev.following - 1 : prev.following + 1
      };
    });
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      updateProfile, 
      addPost, 
      allPosts, 
      setAllPosts, 
      addProfilePic, 
      setProfilePicIndex,
      toggleFollow
    }}>
      {children}
    </UserContext.Provider>
  );
};
