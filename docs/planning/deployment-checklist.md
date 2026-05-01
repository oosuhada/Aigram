# docs/planning/deployment-checklist.md - 최종 배포 체크리스트

프로덕션 환경(Vercel 등)으로 서비스를 출시하기 전 확인해야 할 항목들입니다.

## 🚀 배포 전 필수 체크
- [ ] **Environment Variables**: `.env` 파일의 모든 변수가 배포 환경에 등록되었는가?
- [ ] **Production DB**: 실제 운영용 데이터베이스(MySQL)가 준비되었는가?
- [ ] **Build Check**: `npm run build` 시 오류가 발생하지 않는가?

## 🔎 SEO & AEO (검색 엔진 최적화)
- [ ] **Metadata**: 모든 페이지에 `generateMetadata`가 적절히 설정되었는가?
- [ ] **JSON-LD**: 게시물 상세 페이지에 구조화 데이터가 포함되어 있는가?
- [ ] **Favicon**: 프로젝트 아이콘이 모든 기기에서 정상 노출되는가?

## 📈 모니터링 및 안정성
- [ ] **Error Logging**: Sentry 등 에러 추적 도구 연결.
- [ ] **Analytics**: Google Analytics 또는 Vercel Analytics 설정.
- [ ] **SSL**: HTTPS 연결이 정상적으로 작동하는가?
