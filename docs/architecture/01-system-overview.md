# docs/architecture/01-system-overview.md - 시스템 아키텍처 개요

Aigram 프로젝트의 전체적인 기술 스택과 서버 구성을 설명합니다.

## 🏗 전체 구조
본 프로젝트는 **Next.js 14 (App Router)**를 중심으로 한 Full-stack 웹 애플리케이션입니다.

### 1. Frontend Layer
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4 (Utility-first CSS)
- **State**: Context API (전역 상태 관리: 유저 정보, 언어 설정 등)
- **Animation**: Framer Motion (부드러운 UI 전환)

### 2. Backend Layer (Spring Boot)
- **Framework**: Spring Boot 3.x (Java 17+)
- **Security**: Spring Security & JWT (인증 및 인가)
- **API**: RESTful API (Next.js와 통신)
- **Validation**: Spring Boot Starter Validation

### 3. Data & Storage Layer
- **Database**: PostgreSQL 또는 MySQL (관계형 데이터베이스)
- **ORM**: JPA / Hibernate (Entity 모델링 및 쿼리 관리)
- **DB Tool**: DBeaver (데이터베이스 관리 및 스키마 확인)
- **Storage**: 
    - **Development**: Cloudinary (이미지/비디오 자동 최적화 및 썸네일 생성 활용)
    - **Production**: AWS S3 (대규모 서비스 확장 시 전환 고려)

## 📡 인프라 구성
- **Hosting**: Vercel (Frontend & Serverless Functions)
- **CDN**: Next.js Image Optimization & Cloudinary/S3 CDN
