import Link from 'next/link';

export default function Page() {
  return (
    <form>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="text"
          id="nickname"
          placeholder="닉네임을 입력해주세요"
        />
      </div>
      <div className="mt-8">
        <label htmlFor="password">비밀번호</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="text"
          id="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <div className="mt-8">
        <label htmlFor="password">비밀번호 확인</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="text"
          id="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
        />
      </div>

      <div className="mt-8">
        <button className="w-full shrink-0 bg-[#e60021] h-9 text-white px-4 rounded-xl">
          회원가입
        </button>
        <Link className="mt-2 block text-center text-sm" href="/signin">
          로그인
        </Link>
      </div>
    </form>
  );
}
