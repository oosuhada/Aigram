# docs/architecture/03-data-flow.md - 데이터 흐름도

InstaClone의 클라이언트와 서버 간 데이터 순환 구조를 설명합니다.

## 🔄 게시물 로드 흐름 (Read)
1. **Request**: 사용자가 메인 페이지 접속.
2. **Frontend (Next.js)**: 서버 컴포넌트에서 백엔드 API 서버(Spring Boot) 호출.
3. **Backend (Spring Boot)**: `PostRepository`를 통해 JPA 쿼리 실행.
4. **Database**: `posts`, `users`, `post_media` 테이블 Join 후 결과 반환.
5. **Response**: 백엔드에서 DTO 객체를 반환하고, Next.js에서 이를 HTML로 렌더링.
6. **Hydration**: 클라이언트에서 `Intersection Observer` 활성화로 무한 스크롤 준비.

## ⚡ 실시간 인터랙션 흐름 (Write)
1. **Action**: 사용자가 '좋아요' 클릭.
2. **Optimistic Update**: 프론트엔드 UI에서 즉시 하트 색상 및 카운트 변경.
3. **API Call**: 프론트엔드에서 백엔드 `POST /api/posts/{id}/like` 엔드포인트 호출.
4. **Backend Transaction**: `@Transactional` 서비스 로직을 통해 `likes` 테이블 행 추가/삭제.
5. **Sync**: 요청 실패 시 클라이언트 UI 롤백 및 에러 메시지 표시.

## 🔎 검색 흐름
1. **Input**: 사용자가 검색어 입력 (Debouncing 적용).
2. **Fetch**: 백엔드 `/api/search?q=...` 요청 전송.
3. **Query**: DB에서 `username` 및 `caption` 컬럼 인덱스를 통한 검색 실행.
4. **Update**: 검색 결과 패널 업데이트.
