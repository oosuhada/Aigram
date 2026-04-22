import React from "react";
import { useLanguage, useUser } from "../hooks/use-context";
import { useRouter } from "next/navigation";

const dummyPeople = [
  { id: 1, name: "mijinseooo", img: "https://randomuser.me/api/portraits/women/17.jpg" },
  { id: 2, name: "seoul.soul_mate", img: "https://randomuser.me/api/portraits/women/27.jpg" },
  { id: 3, name: "yoon_stagram", img: "https://randomuser.me/api/portraits/women/78.jpg" },
  { id: 4, name: "k_hyeoni", img: "https://randomuser.me/api/portraits/men/65.jpg" }
];

const SuggestedPeople = () => {
  const { t, language, setLanguage, location, changeLocation } = useLanguage();
  const { user } = useUser();
  const router = useRouter();

  const footerLinks = [
    { name: t("about"), url: "https://about.instagram.com/" },
    { name: t("help"), url: "https://help.instagram.com/" },
    { name: t("press"), url: "https://about.instagram.com/blog" },
    { name: t("api"), url: "https://developers.facebook.com/docs/instagram" },
    { name: t("careers"), url: "https://about.instagram.com/about-us/careers" },
    { name: t("privacy"), url: "https://help.instagram.com/519522125107875" },
    { name: t("terms"), url: "https://help.instagram.com/581066165581870" },
  ];

  return (
    <div className="w-full pt-4 px-8 transition-colors duration-300">
      {/* Profile */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <img
            src={user.profilePics[user.currentPicIndex]}
            className="w-12 h-12 rounded-full object-cover border dark:border-gray-800 cursor-pointer"
            alt="profile"
            onClick={() => router.push("/profile")}
          />
          <div className="flex flex-col">
            <p 
              className="text-sm font-bold dark:text-white cursor-pointer hover:underline"
              onClick={() => router.push("/profile")}
            >{user.username}</p>
            <p className="text-sm text-gray-500">{user.name}</p>
          </div>
        </div>
        <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">
          {t("switch")}
        </button>
      </div>

      {/* Suggested */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-gray-500">{t("suggested")}</p>
        <button className="text-[12px] font-semibold dark:text-white hover:text-gray-500 transition-colors">{t("seeAll")}</button>
      </div>

      <div className="flex flex-col gap-3">
        {dummyPeople.map((p) => (
          <div key={p.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={p.img}
                alt={p.name}
                className="w-10 h-10 rounded-full object-cover border dark:border-gray-800 cursor-pointer"
                onClick={() => router.push(`/profile/${p.name}`)}
              />
              <div className="min-w-0 flex flex-col">
                <p 
                  className="text-sm font-bold truncate dark:text-white cursor-pointer hover:underline"
                  onClick={() => router.push(`/profile/${p.name}`)}
                >{p.name}</p>
                <p className="text-[12px] text-gray-500 truncate w-[140px]">
                  {language === 'ko' 
                    ? `mijinseooo${t("followMutual").replace("{count}", "2")}` 
                    : t("followMutual").replace("{name}", "mijinseooo").replace("{count}", "2")}
                </p>
              </div>
            </div>
            <button className="text-[12px] font-semibold text-blue-500 hover:text-white transition-colors">
              {t("follow")}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-gray-400 hover:underline"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-gray-400 uppercase tracking-tight mb-4">
          <div className="relative group cursor-pointer whitespace-nowrap">
            <span>{t("locations")} ({location})</span>
            <select 
              value={location}
              onChange={(e) => changeLocation(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            >
              <option value="South Korea">South Korea</option>
              <option value="United States">United States</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
          <div className="relative group cursor-pointer whitespace-nowrap">
            <span>{t("language")} ({language === "ko" ? "한국어" : "English"})</span>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>
          </div>
          <a href="https://about.meta.com/technologies/meta-verified/" target="_blank" className="hover:underline whitespace-nowrap">{t("verified")}</a>
        </div>

        <p className="mt-5 text-[12px] text-gray-400 uppercase">
          © 2026 INSTACLONE FROM KOSA
        </p>
      </div>
    </div>
  );
};

export default SuggestedPeople;
