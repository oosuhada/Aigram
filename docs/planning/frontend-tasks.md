# docs/planning/frontend-tasks.md - 프론트엔드 개발 체크리스트

UI/UX 완성도를 높이기 위해 점검해야 할 상세 태스크입니다.

## 🎨 UI & 인터랙션
- [ ] **Skeleton UI**: 모든 주요 섹션(피드, 프로필, 스토리)에 스켈레톤 적용.
- [ ] **Optimistic UI**: 좋아요, 북마크, 팔로우 버튼에 즉각적인 피드백 적용.
- [ ] **Slider Detail**: 이미지 슬라이더 시 전환 애니메이션 최적화.
- [ ] **Empty States**: 게시물이 없는 프로필 등 검색 결과 없음 화면 구현.

## 📱 사용자 경험 (UX)
- [ ] **Infinite Scroll**: Intersection Observer를 통한 부드러운 페이징.
- [ ] **Refesh Logic**: 상단 당겨서 새로고침(PTR) 감도 및 피드백 개선.
- [ ] **Scroll Restoration**: 프로필 방문 후 뒤로가기 시 이전 스크롤 위치 보존.
- [ ] **Accessibility**: 이미지 alt 태그 및 키보드 접근성 준수.

## ⚙️ 기술적 마감
- [ ] **i18n**: 모든 UI 텍스트의 다국어 번역 키 매칭 확인.
- [ ] **Error Boundaries**: 런타임 에러 발생 시 사용자 친화적 에러 페이지 노출.
- [ ] **Hydration Check**: 클라이언트/서버 컴포넌트 간 하이드레이션 오류 방지.
