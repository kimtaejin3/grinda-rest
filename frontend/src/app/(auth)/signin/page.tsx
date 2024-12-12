"use client"

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { signIn } from '@/apis/auth';

// import { useSignInMutation } from '@/store/auth';


export default function Page() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  // const [signIn, {isError, isSuccess, error, data}] = useSignInMutation();
  const { mutate: signInMutation, isError,isSuccess, error, data } = useMutation({
    mutationFn: ({username, password}: {username: string, password: string}) => signIn(username, password),
  });

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    const { username, password } = form;
    if (!username || !password) {
      alert('닉네임과 비밀번호를 모두 입력해주세요.');
      return;
    }
    signInMutation({ username, password });

    if (isError) {
      alert('로그인에 실패했습니다.');
      console.log(error);
      return;
    } 

    if(isSuccess){
      alert('로그인에 성공했습니다.');
      console.log('data:', data);

      localStorage.setItem('accessToken', data.access_token);
      router.push('/');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">아이디</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="text"
          id="username"
          placeholder="아이디를 입력해주세요"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <div className="mt-8">
        <label htmlFor="password">비밀번호</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="text"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <div className="mt-8">
        <button className="w-full shrink-0 bg-[#e60021] h-9 text-white px-4 rounded-xl">
          로그인
        </button>
        <Link className="mt-2 block text-center text-sm" href="/signup">
          회원가입
        </Link>
      </div>
    </form>
  );
}
