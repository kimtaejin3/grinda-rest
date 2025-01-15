# Pearl-rest

pinterest와 pixabay를 모티브로 한 이미지 공유 플랫폼입니다. 사용자들이 이미지를 업로드하고 공유할 수 있는 서비스를 제공합니다.

현재 페이지네이션 기능으로 동작하고 있습니다.
[https://grinda-rest.vercel.app/](https://grinda-rest.vercel.app/)

무한 스크롤 버전
[https://grinda-rest-git-feat-magic-grid-kimtaejin3s-projects.vercel.app/](https://grinda-rest-git-feat-magic-grid-kimtaejin3s-projects.vercel.app/)

masonry 레이아웃 라이브러리를 사용하고 무한 스크롤 기능을 구현하고 있습니다. 해당 버전은 문제가 많기에 계속 공부 후 수정하고 있습니다.

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
- React Query

### Infrastructure

- 모노레포 구조
- Docker
- Git

## 📁 프로젝트 구조

```
pearl-rest/
├── backend/           # FastAPI 백엔드
├── frontend/          # Next.js 프론트엔드
└── package.json
```

## ✨ 주요 기능

- 🖼️ 이미지 업로드
- 👤 사용자 인증
- 💾 이미지 저장
- 🔍 이미지 검색
- 💕 좋아요

## Next.js 14 Streaming 기능

Server Side Rendering시 페이지를 컴포넌트 단위로 점진적으로 로딩하여 초기 로딩 속도를 높였습니다.

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

2. 의존성 설치

```bash
# 프론트엔드
cd frontend
pnpm install

# 백엔드
cd backend
pip install -r requirements.txt
```

4. 개발 서버 실행

```bash
# 프론트엔드 백엔드 동시 실행
pnpm run dev

# 프론트엔드
cd frontend
pnpm run dev

# 백엔드
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```
