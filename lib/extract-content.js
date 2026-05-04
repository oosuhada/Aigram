/**
 * InstaClone 콘텐츠 추출 알고리즘
 * 게시물의 캡션에서 해시태그를 추출하고, SEO용 메타데이터 및 AEO용 JSON-LD 구조화 데이터를 생성합니다.
 */

export function extractPostContent(post) {
  if (!post) return null;

  // 1. 해시태그 추출 (Regex 활용)
  const hashtags = post.caption.match(/#[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g) || [];
  
  // 2. 텍스트 본문 정제 (해시태그 제거 및 공백 처리)
  const cleanCaption = post.caption.replace(/#[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g, '').trim();
  
  // 3. 요약본 생성 (SEO Description용)
  const summary = cleanCaption.slice(0, 150) + (cleanCaption.length > 150 ? '...' : '');

  // 4. 동적 타이틀 생성
  const dynamicTitle = `${post.username}님의 게시물: "${cleanCaption.slice(0, 25)}${cleanCaption.length > 25 ? '...' : ''}"`;

  // 5. AEO를 위한 JSON-LD (Schema.org 구조화 데이터) 생성
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SocialMediaPosting",
    "headline": cleanCaption.slice(0, 50),
    "description": summary,
    "image": [post.postImg],
    "datePublished": post.createdAt, // 실제 운영 시 ISO 8601 포맷 권장
    "author": {
      "@type": "Person",
      "name": post.username,
      "url": `https://instaclone.com/profile/${post.username}`
    },
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": post.like_count || 0
      }
    ],
    "keywords": hashtags.map(tag => tag.replace('#', '')).join(', ')
  };

  return {
    hashtags,
    cleanCaption,
    summary,
    title: dynamicTitle,
    jsonLd
  };
}

/**
 * 프로필 페이지용 메타데이터 추출 알고리즘
 */
export function extractProfileMetadata(user) {
  if (!user) return null;

  const description = `${user.username}(${user.name})님의 프로필. ${user.bio?.slice(0, 100)}`;
  
  return {
    title: `${user.name} (@${user.username}) • InstaClone 사진 및 동영상`,
    description,
    openGraph: {
      title: `${user.name} (@${user.username})`,
      description,
      images: [user.profilePics?.[0]],
    }
  };
}
