// docs/code-examples/api-routes-example.js - Next.js App Router (Frontend) API 호출 예제

// Next.js 14 App Router에서 Spring Boot REST API를 호출하여 데이터를 가져오는 예제입니다.

javascript
import { NextResponse } from "next/server";

// Spring Boot 백엔드 API 주소 (환경 변수 권장)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

/**
 * GET /api/search?q=keyword
 * 프론트엔드 API Route Handler에서 백엔드 API로 프록시 요청을 보내는 예제입니다.
 * (클라이언트 직접 호출 대신 보안이나 데이터 가공을 위해 사용할 수 있습니다.)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ users: [], posts: [] });
  }

  try {
    // 1. Spring Boot 백엔드 서버로 검색 요청 전송
    const response = await fetch(`${BACKEND_URL}/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}` // 필요 시 JWT 토큰 포함
      },
      next: { revalidate: 60 } // Next.js 캐싱 옵션 (1분)
    });

    if (!response.ok) {
      throw new Error(`Backend API responded with status: ${response.status}`);
    }

    // 2. 백엔드에서 받은 DTO 데이터를 클라이언트에 맞게 반환
    const data = await response.json();
    
    return NextResponse.json({
      users: data.users || [],
      posts: data.posts || []
    });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "검색 중 오류가 발생했습니다." }, 
      { status: 500 }
    );
  }
}

