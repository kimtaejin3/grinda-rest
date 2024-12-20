# 그린다 레스트 (Grinda REST)

pinterest와 pixabay를 모티브로 한 이미지 공유 플랫폼입니다. 사용자들이 이미지를 업로드하고 공유할 수 있는 서비스를 제공합니다.

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
grinda-rest/
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

Server Side Rendering시 페이지를 컴포넌트 단위로 점진적으로 로딩하여 초기 렌더링 속도를 높였습니다.

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
# Root 디렉토리에서
pnpm install

# Python 의존성 설치
cd apps/server
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
