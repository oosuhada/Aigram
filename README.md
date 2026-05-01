# 📸 InstaClone - AI Powered Social Media Platform

Next.js 14 App Router 기반으로 구축된 고도화된 인스타그램 클론 프로젝트입니다. 단순한 UI 구현을 넘어 SEO/AEO 최적화, 다국어 처리, 그리고 복잡한 데이터 관계를 고려한 설계를 목표로 합니다.

## 🚀 Key Features

### 1. Advanced Feed & Interaction
- **Multi-Media Slider**: 포스트 당 최대 10개의 이미지/비디오를 지원하는 슬라이더 UI.
- **Micro Interactions**: 더블 클릭 좋아요, 댓글 토글, 캡션 더보기(more) 로직.
- **Dynamic Content**: 팔로우 상태에 따른 비공개 계정 접근 제어 및 추천 게시물(Suggested) 시스템.

### 2. Modern Navigation & Discovery
- **Instagram Style Routing**: 프로필(`/[username]`), 게시물 상세(`/p/[id]`) 등 실제 인스타그램의 URL 구조 재현.
- **Smart Search**: 아이디는 물론 게시물 본문 텍스트와 해시태그까지 포함하는 확장 검색 엔진.
- **Recent Searches**: 최근 검색한 계정 저장 및 관리 기능 (LocalStorage 연동).

### 3. Rich Stories & Reels
- **Story Bar**: 팔로우 기반 필터링 및 본인 우선 고정 시스템.
- **Full-Screen Viewer**: 프로필 이동 연동 및 자동 재생 로직을 포함한 스토리/릴스 뷰어.
- **Reels Upload UI**: 영상 1분 제한 Trimming 안내, 대표 이미지 설정, 배경음악 검색 인터페이스.

### 4. Technical Excellence
- **Next.js App Router**: SSR/ISR을 활용한 SEO 및 성능 최적화.
- **AEO Optimization**: JSON-LD 구조화 데이터를 통한 AI 답변 엔진 최적화.
- **Multilingual Support**: 한국어/영어 설정을 지원하며 번역 보기(See translation) 기능 제공.

## 🛠 Tech Stack

### Frontend

* Next.js 14 (App Router) <- Framework
* Tailwind CSS <- Styling
* Framer Motion <- Animations

### Backend

* Spring Boot
* Spring Data JPA

### Database

* PostgreSQL / MySQL

### Tools

* DBeaver (DB 관리)
* GitHub
* VS Code

## 📂 Documentation
- [ERD Specification](./ERD_SPEC.md): 정밀 데이터베이스 설계도
- [Migration History](./NEXTJS_MIGRATION.md): Vite SPA에서 Next.js로의 전환 기록
- [Future Roadmap](./FUTURE_ROADMAP.md): 향후 DB 및 백엔드 통합 전략


## 🏗️ Architecture Overview

본 프로젝트는 **프론트엔드와 백엔드를 분리한 Fullstack 아키텍처**를 기반으로 설계되었습니다.

### 🔹 Frontend

* Framework: Next.js (App Router 기반 SSR/ISR)
* 역할:

  * UI 렌더링 (SSR, CSR 혼합)
  * 사용자 인터랙션 처리
  * SEO/AEO 최적화

### 🔹 Backend

* Framework: Spring Boot
* ORM: JPA (Hibernate)
* 역할:

  * REST API 제공
  * 비즈니스 로직 처리
  * 인증 및 권한 관리 (JWT 예정)

### 🔹 Database

* RDBMS: PostgreSQL 또는 MySQL
* 역할:

  * 사용자, 게시물, 팔로우 관계 등 데이터 저장
  * 트랜잭션 및 데이터 무결성 보장

### 🔹 Database Client (DB Tool)

* DBeaver (권장)
* DataGrip (선택)
* SQL Developer (비권장, 무거움)

> ⚠️ Database와 DB Tool은 다른 개념입니다.
>
> * Database: 실제 데이터를 저장하는 서버 (PostgreSQL, MySQL)
> * DB Tool: 데이터베이스에 접속하여 데이터를 조회/수정하는 클라이언트 프로그램 (DBeaver 등)

### 🔹 Overall Flow

Next.js (Frontend)
↓ REST API 호출
Spring Boot (Backend)
↓ JPA
PostgreSQL / MySQL (Database)
