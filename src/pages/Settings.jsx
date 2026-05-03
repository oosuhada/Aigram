'use client';

import React, { useState, useRef } from "react";
import { User, Shield, Bell, Heart, CreditCard, HelpCircle, Image as ImageIcon, Plus } from "lucide-react";
import { useUser, useLanguage } from "../hooks/use-context";

const Settings = () => {
  const { user, updateProfile, addProfilePic } = useUser();
  const { t, language } = useLanguage();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
    bio: user.bio,
    website: user.website || "",
  });

  const menuItems = [
    { name: t("editProfile"), icon: User, active: true },
    { name: t("notifications"), icon: Bell },
    { name: t("privacy"), icon: Shield },
    { name: t("activity"), icon: Shield },
    { name: "Emails from Instagram", icon: Bell },
    { name: "Ad preferences", icon: CreditCard },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    alert(t("settings") + " 완료!");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-black border dark:border-gray-800 rounded-sm flex min-h-[600px] mt-4 mb-20 md:mb-0">
      {/* Sidebar */}
      <div className="w-64 border-r dark:border-gray-800 hidden md:block">
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`px-6 py-4 cursor-pointer text-sm hover:bg-gray-50 dark:hover:bg-gray-900 ${
                item.active ? "border-l-2 border-black dark:border-white font-bold" : ""
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl mb-8 dark:text-white font-normal">{t("editProfile")}</h2>
        
        {/* Profile Picture Section */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={user.profilePics[user.currentPicIndex]} 
                className="w-16 h-16 rounded-full object-cover border dark:border-gray-800" 
                alt="User" 
              />
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 text-white border-2 border-white dark:border-black">
                <Plus className="w-3 h-3" />
              </div>
            </div>
            <div>
              <p className="font-bold text-sm dark:text-white">{user.username}</p>
              <button 
                onClick={() => fileInputRef.current.click()}
                className="text-blue-500 text-sm font-bold hover:text-blue-700"
              >
                {language === 'ko' ? "프로필 사진 추가" : "Add Profile Photo"}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
          </div>
          
          {/* Multi-profile Preview */}
          <div className="flex gap-2 mt-2">
            {user.profilePics.map((pic, i) => (
              <img 
                key={i} 
                src={pic} 
                className={`w-10 h-10 rounded-lg object-cover border-2 ${i === user.currentPicIndex ? "border-blue-500" : "border-transparent opacity-50"}`} 
                alt={`profile ${i}`}
              />
            ))}
          </div>
          <p className="text-[11px] text-gray-500">{language === 'ko' ? "* 여러 장의 사진을 등록하면 프로필에서 전환할 수 있습니다." : "* Add multiple photos to switch them on your profile."}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold dark:text-white">{language === 'ko' ? "사용자 이름(ID)" : "Username"}</label>
            <input 
              name="username"
              type="text" 
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username" 
              className="border dark:border-gray-800 dark:bg-gray-900 p-2 rounded-sm outline-none text-sm dark:text-white focus:ring-1 focus:ring-gray-400" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold dark:text-white">{language === 'ko' ? "이름" : "Name"}</label>
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name" 
              className="border dark:border-gray-800 dark:bg-gray-900 p-2 rounded-sm outline-none text-sm dark:text-white focus:ring-1 focus:ring-gray-400" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold dark:text-white">Website</label>
            <input 
              name="website"
              type="text" 
              value={formData.website}
              onChange={handleInputChange}
              placeholder="Website" 
              className="border dark:border-gray-800 dark:bg-gray-900 p-2 rounded-sm outline-none text-sm dark:text-white focus:ring-1 focus:ring-gray-400" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold dark:text-white">{language === 'ko' ? "소개" : "Bio"}</label>
            <textarea 
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Bio" 
              className="border dark:border-gray-800 dark:bg-gray-900 p-2 rounded-sm outline-none text-sm dark:text-white h-24 resize-none focus:ring-1 focus:ring-gray-400" 
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold w-fit mt-4 hover:bg-blue-600 transition-colors shadow-md"
          >
            {language === 'ko' ? "제출" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Settings;
