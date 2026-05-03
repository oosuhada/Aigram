import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockUsers } from "../data/mockUsers";
import { postsData } from "../data/posts";

const SearchPanel = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [recentProfiles, setRecentProfiles] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentProfiles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
    } else {
      const query = searchQuery.toLowerCase();
      
      // 1. Search in Users
      const userMatches = Object.values(mockUsers)
        .filter(u => u.username.toLowerCase().includes(query) || u.name.toLowerCase().includes(query))
        .map(u => ({ id: u.username, name: u.username, sub: u.name, img: u.profilePics[0] }));

      // 2. Search in Post Captions (New!)
      const postMatches = postsData
        .filter(p => p.caption.toLowerCase().includes(query) || p.enCaption.toLowerCase().includes(query))
        .map(p => ({ id: `post-${p.id}`, name: p.username, sub: p.caption, img: p.postImg, isPost: true }));

      setFilteredResults([...userMatches, ...postMatches]);
    }
  }, [searchQuery]);

  const handleItemClick = (item) => {
    const newRecent = [
      { id: item.id, name: item.name, img: item.img, sub: item.sub },
      ...recentProfiles.filter(p => p.id !== item.id)
    ].slice(0, 10);
    setRecentProfiles(newRecent);
    localStorage.setItem("recentSearches", JSON.stringify(newRecent));

    router.push(`/${item.name}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-[5rem] top-0 h-full w-[400px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-2xl z-50 animate-slideIn overflow-y-auto">
      <div className="px-6 pt-10 pb-6 sticky top-0 bg-white dark:bg-black z-10">
        <h2 className="text-2xl font-bold mb-8 dark:text-white">Search</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-2.5 rounded-lg outline-none"
          />
          {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-700 text-white rounded-full p-0.5"><X className="w-3 h-3" /></button>}
        </div>
      </div>

      <div className="px-0 py-2">
        {(searchQuery === "" ? recentProfiles : filteredResults).map((item) => (
          <div key={item.id} onClick={() => handleItemClick(item)} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
            <div className="flex items-center gap-3">
              <img src={item.img} alt={item.name} className="w-11 h-11 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="text-sm font-bold dark:text-white">{item.name}</span>
                <span className="text-sm text-gray-500 truncate w-48">{item.sub}</span>
              </div>
            </div>
            {searchQuery === "" && <X className="w-4 h-4 text-gray-400" onClick={(e) => { e.stopPropagation(); setRecentProfiles(prev => prev.filter(p => p.id !== item.id)); }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
