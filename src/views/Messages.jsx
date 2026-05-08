'use client';

import React, { useState, useEffect } from "react";
import { MessageSquare, PlusCircle, ChevronLeft, Phone, Video, Info, Smile, Send, Image, Heart } from "lucide-react"; // Icons
import { useLanguage, useUser } from "../hooks/use-context";
import { useRouter } from "next/navigation";

const dummyChats = [
  {
    id: 1,
    name: "mijinseooo",
    profilePic: "https://randomuser.me/api/portraits/women/17.jpg",
    online: true,
    lastMessage: "야 뭐해?",
    note: "졸려어어 😴",
    messages: [
      { fromMe: false, text: "야 뭐해?" },
      { fromMe: true, text: "나 이제 일어남 ㅋㅋ" },
    ],
  },
  {
    id: 2,
    name: "yoon_stagram",
    profilePic: "https://randomuser.me/api/portraits/women/78.jpg",
    online: false,
    lastMessage: "대박 ㅋㅋㅋ",
    note: "과제 지옥 📚",
    messages: [
      { fromMe: false, text: "그거 봤어? 대박 ㅋㅋㅋ" },
      { fromMe: true, text: "아직 못 봄!" },
    ],
  },
  {
    id: 3,
    name: "k_hyeoni",
    profilePic: "https://randomuser.me/api/portraits/men/65.jpg",
    online: true,
    lastMessage: "언제 만나?",
    note: "운동 완료 💪",
    messages: [
      { fromMe: true, text: "언제 만나?" },
      { fromMe: false, text: "이번 주말 고?" },
    ],
  },
  {
    id: 4,
    name: "seo_yun.daily",
    profilePic: "https://randomuser.me/api/portraits/women/90.jpg",
    online: false,
    lastMessage: "미쳤다 진짜",
    note: "카페 나들이 ☕",
    messages: [
      { fromMe: false, text: "사진 봄? 미쳤다 진짜" },
      { fromMe: true, text: "완전 잘 나왔어!" },
    ],
  },
  {
    id: 5,
    name: "minji_is_here",
    profilePic: "https://randomuser.me/api/portraits/women/48.jpg",
    online: true,
    lastMessage: "내일 시간 돼?",
    note: "퇴근하고 싶다 🏠",
    messages: [
      { fromMe: false, text: "내일 시간 돼?" },
      { fromMe: true, text: "아마도? 왜?" },
    ],
  },
  {
    id: 6,
    name: "june_04",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    online: false,
    lastMessage: "연락 줘~",
    note: "심심해 💬",
    messages: [
      { fromMe: true, text: "나중에 연락 줘~" },
      { fromMe: false, text: "웅웅!" },
    ],
  },
  {
    id: 7,
    name: "bora_violet",
    profilePic: "https://randomuser.me/api/portraits/women/27.jpg",
    online: true,
    lastMessage: "이거 봐봐",
    note: "여행 중 ✈️",
    messages: [
      { fromMe: false, text: "이거 봐봐 완전 웃김" },
      { fromMe: true, text: "ㅋㅋㅋㅋㅋㅋㅋㅋ" },
    ],
  },
  {
    id: 8,
    name: "kim_soul_88",
    profilePic: "https://randomuser.me/api/portraits/men/92.jpg",
    online: true,
    lastMessage: "게임 고?",
    note: "열일 중 🔥",
    messages: [
      { fromMe: false, text: "게임 고?" },
      { fromMe: true, text: "지금은 안돼 ㅠㅠ" },
    ],
  },
];

const Messages = () => {
  const { t } = useLanguage();
  const { user } = useUser();
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [searchText, setSearchText] = useState("");
  const [yourNote, setYourNote] = useState("오늘도 화이팅 ✨");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [allChats, setAllChats] = useState(() => {
    return dummyChats;
  });

  useEffect(() => {
    localStorage.setItem("messagesData", JSON.stringify(allChats));
  }, [allChats]);

  const filteredChats = allChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    const updatedChats = allChats.map((chat) =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            messages: [...chat.messages, { fromMe: true, text }],
            lastMessage: text,
          }
        : chat
    );
    setAllChats(updatedChats);
    setSelectedChat(
      updatedChats.find((chat) => chat.id === selectedChat.id) || selectedChat
    );
  };

  const handleSendPost = (postTitle = "인스타그램 게시물 📸") => {
    const updatedChats = allChats.map((chat) =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              { fromMe: true, text: `게시물을 공유했습니다: ${postTitle}` },
            ],
            lastMessage: `게시물을 보냈습니다`,
          }
        : chat
    );
    setAllChats(updatedChats);
    localStorage.setItem("messagesData", JSON.stringify(updatedChats));
  };

  return (
    <div className="flex w-full h-screen bg-white dark:bg-black overflow-hidden transition-colors duration-300">
      {/* ===== LEFT CHAT LIST ===== */}
      <div className={`w-full md:w-80 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 flex flex-col bg-white dark:bg-black transition-all duration-300 ${selectedChat && "hidden md:flex"}`}>
        {/* ===== Top Header ===== */}
        <div className="flex justify-between items-center px-5 py-4 bg-white dark:bg-black sticky top-0 z-30">
          <span className="font-bold text-xl dark:text-white">{user.username}</span>
          <MessageSquare className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
        </div>

        {/* 🫧 Notes Row */}
        <div className="py-6 px-4 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 overflow-x-auto no-scrollbar">
          <div className="flex items-end gap-5 min-w-max">
            <div className="flex flex-col items-center shrink-0 relative group">
              <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform origin-bottom bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-[11px] px-3 py-1.5 rounded-2xl shadow-lg border dark:border-gray-700 whitespace-nowrap z-10">
                {yourNote}
              </div>
              <div className="relative">
                <img
                  src={user.profilePics[user.currentPicIndex]}
                  className="w-16 h-16 rounded-full border-2 border-gray-100 dark:border-gray-800 shadow-sm object-cover"
                  alt="You"
                />
                <button
                  onClick={() => setShowNoteInput(true)}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white dark:border-black hover:bg-blue-600 transition-colors"
                >
                  <PlusCircle className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[11px] mt-2 font-medium text-gray-500 truncate max-w-[64px]">{t("yourStory")}</p>
            </div>

            {dummyChats.map((chat) => (
              <div key={chat.id} className="flex flex-col items-center shrink-0 relative group">
                <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform origin-bottom bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-[11px] px-3 py-1.5 rounded-2xl shadow-lg border dark:border-gray-700 whitespace-nowrap z-10">
                  {chat.note}
                </div>
                <div className="relative">
                  <img
                    src={chat.profilePic}
                    alt={chat.name}
                    className="w-16 h-16 rounded-full border-2 border-gray-100 dark:border-gray-800 shadow-sm object-cover"
                  />
                  {chat.online && (
                    <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-black"></span>
                  )}
                </div>
                <p className="text-[11px] mt-2 font-medium text-gray-500 truncate max-w-[64px]">{chat.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 💬 Chat List */}
        <div className="px-5 py-2">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-900 text-sm px-4 py-2 rounded-xl outline-none dark:text-white"
          />
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar py-2">
           <div className="px-5 py-2 flex justify-between items-center">
             <h3 className="font-bold text-base dark:text-white">{t("messages")}</h3>
             <button className="text-blue-500 text-sm font-semibold">{t("requests")}</button>
           </div>
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center gap-4 px-5 py-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-900 ${
                selectedChat?.id === chat.id ? "bg-gray-100 dark:bg-gray-900" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={chat.profilePic}
                  alt={chat.name}
                  className="w-14 h-14 rounded-full object-cover border dark:border-gray-800"
                />
                {chat.online && (
                  <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-black"></span>
                )}
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="font-medium text-[15px] dark:text-white">{chat.name}</span>
                <span className={`text-sm truncate w-full ${chat.online ? "text-gray-900 dark:text-gray-100 font-medium" : "text-gray-500"}`}>
                  {chat.lastMessage} • 2h
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT CHAT AREA ===== */}
      <div className={`flex-1 flex flex-col bg-white dark:bg-black transition-all duration-300 ${!selectedChat && "hidden md:flex"}`}>
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedChat(null)} className="md:hidden p-2">
                   <ChevronLeft className="w-6 h-6 dark:text-white" />
                </button>
                <img
                  src={selectedChat.profilePic}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] dark:text-white leading-tight">{selectedChat.name}</span>
                  <span className="text-[12px] text-gray-500 leading-tight">Active now</span>
                </div>
              </div>
              <div className="flex gap-4 px-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"><Phone className="w-6 h-6 dark:text-white" /></button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"><Video className="w-6 h-6 dark:text-white" /></button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"><Info className="w-6 h-6 dark:text-white" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3 bg-white dark:bg-black">
              <div className="flex flex-col items-center py-10 gap-2">
                <img src={selectedChat.profilePic} className="w-24 h-24 rounded-full border-2 dark:border-gray-800" alt="" />
                <h2 className="text-xl font-bold dark:text-white">{selectedChat.name}</h2>
                <p className="text-gray-500 text-sm">{selectedChat.name.toLowerCase()} • Instagram</p>
                <button 
                  onClick={() => router.push("/profile/" + selectedChat.name)}
                  className="mt-2 bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-lg text-sm font-semibold dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {t("viewProfile")}
                </button>
              </div>
              {selectedChat.messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-[15px] leading-snug break-words shadow-sm ${
                      msg.fromMe
                        ? "bg-blue-500 text-white rounded-tr-sm"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-black">
              <div className="flex gap-3 items-center border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 bg-white dark:bg-black">
                <Smile className="w-6 h-6 text-gray-500 cursor-pointer" />
                <input
                  id="messageInput"
                  type="text"
                  placeholder={t("addComment")}
                  className="flex-1 text-[15px] outline-none bg-transparent dark:text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
                <Send
                  onClick={() => handleSendPost("New Insta Post")}
                  className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer hover:text-blue-500 transition-colors"
                />
                <Image className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
                <Heart className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-24 h-24 border-2 border-black dark:border-white rounded-full flex items-center justify-center">
               <MessageSquare className="w-12 h-12 text-black dark:text-white" strokeWidth={1} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-medium dark:text-white">{t("messages")}</h2>
              <p className="text-gray-500 text-sm">Send a message or a photo to a friend.</p>
            </div>
            <button className="bg-blue-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 mt-2">Send message</button>
          </div>
        )}
      </div>

      {/* ✏️ Note Input Modal */}
      {showNoteInput && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-[400px] text-center animate-scaleIn">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <img src={user.profilePics[user.currentPicIndex]} className="w-full h-full rounded-full object-cover border-4 border-gray-50 dark:border-gray-800 shadow-xl" alt="" />
               <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg border dark:border-gray-700 text-sm animate-bounce">
                 {yourNote}
               </div>
            </div>
            <h2 className="text-xl font-bold mb-2 dark:text-white">Share what's on your mind</h2>
            <p className="text-gray-500 text-sm mb-6">People can see your note for 24 hours.</p>
            <input
              type="text"
              value={yourNote}
              onChange={(e) => setYourNote(e.target.value)}
              maxLength={60}
              placeholder="Share a thought..."
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-4 mb-8 text-[15px] focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNoteInput(false)}
                className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-bold dark:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNoteInput(false)}
                className="flex-1 py-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default Messages;
