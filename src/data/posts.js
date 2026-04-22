export const postsData = [
  {
    id: 1,
    username: "seoul.soul_mate",
    userImg: "https://randomuser.me/api/portraits/women/27.jpg",
    media: [
      { type: 'IMG', url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200" },
      { type: 'IMG', url: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200" }
    ],
    caption: "오늘 날씨 너무 좋다 ☀️ 서울의 명소들을 찾아다니는 중입니다. 이번 주말에는 남산타워 어때요? 정말 아름다운 풍경을 보실 수 있을 거예요. #서울 #남산 #나들이 #일상 #주말",
    enCaption: "The weather is so nice today ☀️ Exploring Seoul's landmarks. How about Namsan Tower this weekend?",
    createdAt: "1d",
    like_count: 1234,
    comment_count: 42,
    share_count: 15,
    isSuggested: false,
    comments: [{ id: 1, username: "oosu.hada", text: "정말 예쁘네요!", enText: "So beautiful!" }]
  },
  {
    id: 2,
    username: "mijinseooo",
    userImg: "https://randomuser.me/api/portraits/women/17.jpg",
    media: [{ type: 'IMG', url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200" }],
    caption: "바다의 파도 소리만 들어도 힐링되는 기분 🌊 역시 여름 휴가는 제주도가 최고인 것 같아요. 여러분의 휴가지는 어디인가요? #여행 #제주도 #바다 #힐링 #여름",
    enCaption: "Healing just by listening to the sound of ocean waves 🌊 Jeju is the best.",
    createdAt: "2d",
    like_count: 2100,
    comment_count: 88,
    share_count: 32,
    isSuggested: false,
    comments: []
  },
  {
    id: 3,
    username: "kid_stonee",
    userImg: "https://randomuser.me/api/portraits/men/12.jpg",
    media: [
      { type: 'IMG', url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200" },
      { type: 'IMG', url: "https://images.unsplash.com/photo-1539109136881-3be061694b9b?w=1200" }
    ],
    caption: "New collection drops tomorrow. Check out the latest streetwear vibes! 🚀 #Fashion #Style #Vibe #Streetwear #NewArrival",
    enCaption: "New collection drops tomorrow. Check out the latest streetwear vibes! 🚀",
    createdAt: "1w",
    like_count: 5670,
    comment_count: 120,
    share_count: 450,
    isSuggested: true,
    comments: []
  },
  {
    id: 4,
    username: "nature_walker",
    userImg: "https://randomuser.me/api/portraits/women/44.jpg",
    media: [{ type: 'IMG', url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200" }],
    caption: "고요한 숲길을 걷는 시간. 나무 냄새와 새소리가 가득한 이곳에서 진정한 휴식을 취하고 갑니다. 매일 이런 아침을 맞이하고 싶네요. 🌿 #자연 #산책 #숲 #명상",
    enCaption: "Walking through a quiet forest. I want to wake up to this every morning. 🌿",
    createdAt: "3d",
    like_count: 890,
    comment_count: 15,
    share_count: 6,
    isSuggested: false,
    comments: []
  },
  {
    id: 5,
    username: "urban_dev",
    userImg: "https://randomuser.me/api/portraits/men/32.jpg",
    media: [
      { type: 'IMG', url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200" },
      { type: 'IMG', url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200" }
    ],
    caption: "Productive day at the office 💻 Thinking about the next big feature for our app. Stay focused! #Coding #DevLife #Setup #Office",
    enCaption: "Productive day at the office 💻 Thinking about the next big feature.",
    createdAt: "12h",
    like_count: 432,
    comment_count: 21,
    share_count: 9,
    isSuggested: false,
    comments: []
  },
  {
    id: 6,
    username: "art_gallery",
    userImg: "https://randomuser.me/api/portraits/women/62.jpg",
    media: [{ type: 'IMG', url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200" }],
    caption: "Contemporary art exhibition starts today! Come and feel the energy of abstract colors. 🎨 #Art #Gallery #ModernArt #Exhibition",
    enCaption: "Contemporary art exhibition starts today! 🎨",
    createdAt: "5d",
    like_count: 3200,
    comment_count: 45,
    share_count: 110,
    isSuggested: false,
    comments: []
  },
  {
    id: 7,
    username: "coffee_vibes",
    userImg: "https://images.unsplash.com/photo-1510227272981-87123e259b17?w=150&h=150",
    media: [{ type: 'IMG', url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200" }],
    caption: "Rainy day needs a hot latte ☕️ Perfect atmosphere for reading. #Coffee #Latte #Cafe #Cozy",
    enCaption: "Rainy day needs a hot latte ☕️",
    createdAt: "2h",
    like_count: 156,
    comment_count: 8,
    share_count: 2,
    isSuggested: true,
    comments: []
  }
];

export const getPostById = (id) => postsData.find(p => p.id === parseInt(id));
