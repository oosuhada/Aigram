'use client';

import React from "react";
import { Clock, Calendar, MessageCircle, Heart, Share2, Download } from "lucide-react";

const YourActivity = () => {
  const sections = [
    { title: "Time spent", desc: "See how much time you usually spend on Instagram each day.", icon: Clock },
    { title: "Photos and videos", desc: "View, archive or delete photos and videos you've shared.", icon: Calendar },
    { title: "Interactions", desc: "Review and delete likes, comments and your other interactions.", icon: Heart },
    { title: "Account history", desc: "Review changes you've made to your account since you created it.", icon: Calendar },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10">
      <h2 className="text-2xl font-bold mb-2 dark:text-white">Your activity</h2>
      <p className="text-gray-500 text-sm mb-8">One place to manage your activity.</p>
      <div className="grid gap-4">
        {sections.map((s) => (
          <div key={s.title} className="flex items-center gap-4 p-4 border dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
              <s.icon className="w-6 h-6 dark:text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm dark:text-white">{s.title}</h3>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default YourActivity;
