'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import useHandleOutsideClick from '@/hooks/useHandleOutsideClick';

import Profile from '../icon/Profile';
import Popover from './Popover';

export default function ProfileButtonWrap() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useHandleOutsideClick(wrapperRef, () => setIsOpen(false));
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div ref={wrapperRef} className="relative z-50">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Profile />
      </button>
      <Popover
        isOpen={isOpen}
        className="absolute top-9 bg-white left-0 w-[150px] rounded-md shadow-lg overflow-hidden"
      >
        {isLogin ? (
          <div className="">
            <div className="py-2 justify-center flex gap-2 items-center">
              <Profile />
              <span>홍길동</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push('/profile');
              }}
              className="text-center py-2 block w-full hover:bg-gray-100"
            >
              프로필
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                localStorage.removeItem('accessToken');
                router.push('/');
              }}
              className="text-center py-2 block w-full hover:bg-gray-100"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <>
            <Link className="py-2 block hover:bg-gray-100" href="/signin">
              로그인
            </Link>
            <Link className="py-2 block hover:bg-gray-100" href="/signup">
              회원가입
            </Link>
          </>
        )}
      </Popover>
    </div>
  );
}
