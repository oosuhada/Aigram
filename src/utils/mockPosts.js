// src/utils/mockPosts.js
const posts = [
  {
    id: 1,
    user: "seoul.soul_mate",
    avatar: "https://randomuser.me/api/portraits/women/27.jpg",
    image: "https://picsum.photos/seed/post1/900/700",
    caption: "오늘 노을 대박... 🌇 #감성 #노을",
    likes: 128,
    comments: [
      { id: 1, user: "mijinseooo", text: "와 진짜 예쁘다" },
      { id: 2, user: "june_04", text: "여기 어디야??" },
    ],
  },
  {
    id: 2,
    user: "seo_yun.daily",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    image: "https://picsum.photos/seed/post2/900/700",
    caption: "주말 나들이 성공적 🚗",
    likes: 342,
    comments: [{ id: 1, user: "mijinseooo", text: "부럽다ㅠㅠㅠ" }],
  },
  {
    id: 3,
    user: "tae.hwan_kim",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    image: "https://picsum.photos/seed/post3/900/700",
    caption: "오늘 저녁은 돈카츠! 🍛",
    likes: 214,
    comments: [{ id: 1, user: "kim_soul_88", text: "비주얼 미쳤다" }],
  },
];

export default posts;
