# 그린다 레스트 (Grinda REST)

핀터레스트를 모티브로 한 이미지 공유 플랫폼입니다. 사용자들이 이미지를 업로드하고 공유할 수 있는 서비스를 제공합니다.

## 🚀 기술 스택

### Backend

- FastAPI
- Supabase (PostgreSQL)
- Python 3.11+

### Frontend

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- React query
- Zustand

### Infrastructure

- 모노레포 구조
- Docker
- Git

## 📁 프로젝트 구조

```
grinda-rest/
├── backend/           # FastAPI 백엔드
├── frontend/          # Next.js 프론트엔드
├── shared/            # 공통 유틸리티
└── package.json
```

## ✨ 주요 기능

- 🖼️ 이미지 업로드 및 공유
- 👤 사용자 인증 (Supabase Auth)
- 💾 이미지 저장 및 관리
- 🔍 이미지 검색
- 💫 무한 스크롤
- 💕 좋아요 및 저장 기능

## 🚀 시작하기

### prerequisites

- Node.js 18+
- Python 3.11+
- Docker

### 설치

1. 저장소 클론

```bash
git clone https://github.com/yourusername/grinda-rest.git
cd grinda-rest
```

2. 환경 변수 설정

```bash
cp .env.example .env
```

3. 의존성 설치

```bash
# Root 디렉토리에서
pnpm install

# Python 의존성 설치
cd apps/server
pip install -r requirements.txt
```

4. 개발 서버 실행

```bash
# 프론트엔드
pnpm dev:web

# 백엔드
pnpm dev:server
```

## 🗄️ Database Schema

주요 테이블 구조:

- users

  - id
  - email
  - username
  - created_at

- images

  - id
  - user_id
  - url
  - description
  - created_at

- likes
  - id
  - user_id
  - image_id
  - created_at
