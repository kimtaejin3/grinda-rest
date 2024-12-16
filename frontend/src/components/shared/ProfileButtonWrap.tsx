'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { getUser } from '@/apis/user';
import useHandleOutsideClick from '@/hooks/useHandleOutsideClick';

import Profile from '../icon/Profile';
import Popover from './Popover';

export default function ProfileButtonWrap() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<{ username: string; id: number }>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useHandleOutsideClick(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      setUser(user);
    }
    try {
      loadUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div ref={wrapperRef} className="relative z-50">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Profile />
      </button>
      <Popover
        isOpen={isOpen}
        className="absolute top-9 bg-white right-0 w-[150px] rounded-md shadow-lg overflow-hidden"
      >
        {isLogin ? (
          <div className="">
            <div className="py-2 justify-center flex gap-2 items-center">
              <Profile />
              <span>{user?.username}</span>
            </div>
            <button
              onClick={() => {
                toast.success('로그아웃 되었습니다.');
                setIsOpen(false);
                setIsLogin(false);
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
            <Link
              className="py-2 block hover:bg-gray-100 text-center"
              href="/signin"
            >
              로그인
            </Link>
            <Link
              className="py-2 block hover:bg-gray-100 text-center"
              href="/signup"
            >
              회원가입
            </Link>
          </>
        )}
      </Popover>
    </div>
  );
}
