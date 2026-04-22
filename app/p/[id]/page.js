import React from "react";
import { getPostById } from "../../../src/data/posts";
import { extractPostContent } from "../../../lib/extract-content";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/**
 * 1. Metadata Dynamic Generation (SEO Optimization)
 * 콘텐츠 추출 알고리즘을 활용하여 페이지별 맞춤 메타데이터를 생성합니다.
 */
export async function generateMetadata({ params }) {
  const post = getPostById(params.id);
  if (!post) return { title: "Post Not Found" };

  const { title, summary, hashtags } = extractPostContent(post);

  return {
    title: title,
    description: summary,
    keywords: hashtags.join(", "),
    openGraph: {
      title: title,
      description: summary,
      images: [post.postImg],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: summary,
      images: [post.postImg],
    },
  };
}

/**
 * 2. Post Detail Page Component
 */
export default function PostPage({ params }) {
  const post = getPostById(params.id);

  if (!post) {
    return <div className="p-20 text-center">Post not found.</div>;
  }

  // 알고리즘을 통해 데이터 가공
  const { hashtags, cleanCaption, jsonLd } = extractPostContent(post);

  return (
    <div className="max-w-[1000px] mx-auto mt-4 md:mt-10 p-4">
      {/* 3. AEO 최적화용 JSON-LD 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/" className="flex items-center gap-2 text-gray-500 mb-6 hover:text-black dark:hover:text-white transition-colors">
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Feed</span>
      </Link>

      <div className="bg-white dark:bg-black border dark:border-gray-800 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* Left: Media Area */}
        <div className="flex-1 bg-black flex items-center justify-center min-h-[400px]">
          <img src={post.postImg} className="max-w-full max-h-[700px] object-contain" alt="Post" />
        </div>

        {/* Right: Info Area */}
        <div className="w-full md:w-[400px] flex flex-col border-l dark:border-gray-800">
          <div className="p-4 border-b dark:border-gray-800 flex items-center gap-3">
            <img src={post.userImg} className="w-8 h-8 rounded-full" alt={post.username} />
            <span className="font-bold dark:text-white">{post.username}</span>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex gap-3 mb-6">
              <img src={post.userImg} className="w-8 h-8 rounded-full shrink-0" alt="" />
              <div>
                <p className="text-sm dark:text-white leading-relaxed">
                  <span className="font-bold mr-2">{post.username}</span>
                  {cleanCaption}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {hashtags.map((tag, i) => (
                    <span key={i} className="text-blue-500 text-sm font-medium cursor-pointer hover:underline">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 uppercase tracking-tighter">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
