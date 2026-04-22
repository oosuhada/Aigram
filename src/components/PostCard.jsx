// src/components/PostCard.jsx
import React, { useState } from "react";
import { Heart, MessageCircle, Bookmark } from "lucide-react";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const toggleLike = () => {
    setLiked((s) => !s);
    setLikes((l) => (liked ? l - 1 : l + 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={post.avatar}
          alt={post.user}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div className="flex-1">
          <div className="font-semibold text-sm">{post.user}</div>
          <div className="text-xs text-gray-500">2h</div>
        </div>
        <div className="text-gray-500">...</div>
      </div>

      {/* Image */}
      <div className="w-full">
        <img
          src={post.image}
          alt="post"
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 ${
              liked ? "text-rose-500" : "text-gray-700"
            }`}
          >
            <Heart className="h-5 w-5" />
          </button>
          <button className="text-gray-700">
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
        <div>
          <button className="text-gray-700">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Likes / Caption */}
      <div className="px-4 pb-4">
        <div className="font-semibold text-sm">{likes} likes</div>
        <div className="text-sm">
          <span className="font-semibold mr-2">{post.user}</span>
          {post.caption}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          View all {post.comments.length} comments
        </div>
      </div>
    </div>
  );
};

export default PostCard;
