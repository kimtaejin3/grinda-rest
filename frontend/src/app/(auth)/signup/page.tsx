"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useSignUpMutation } from '@/store/auth';

const INITIAL_FORM = {
  username: '',
  password: '',
  passwordCheck: '',
};

export default function Page() {
  const [form, setForm] = useState(INITIAL_FORM);

  const [signUp, {isError, isSuccess, error}] = useSignUpMutation();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, passwordCheck } = form;
    if (!username || !password || !passwordCheck) {
      alert('아이디와 비밀번호 및 비밀번호 확인을 모두 입력해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    signUp({ username, password });

    if (isError) {
      alert('회원가입에 실패했습니다.');
      console.log('error',error);
    } else if (isSuccess) {
      alert('회원가입에 성공했습니다.');
      router.push('/signin');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">아이디</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="text"
          id="username"
          placeholder="아이디 입력해주세요"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <div className="mt-8">
        <label htmlFor="password">비밀번호</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div className="mt-8">
        <label htmlFor="password">비밀번호 확인</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="password"
          id="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          onChange={(e) => setForm({ ...form, passwordCheck: e.target.value })}
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
