'use client';

import Link from 'next/link';
import { useState } from 'react';

import Profile from '../icon/Profile';
import Popover from './Popover';

export default function ProfileButtonWrap() {
  const [isOpen, setIsOpen] = useState(false);

  const isLogin = false;

  return (
    <button className="relative z-50" onClick={() => setIsOpen(!isOpen)}>
      <Profile />
      <Popover
        isOpen={isOpen}
        className="absolute top-9 bg-white left-0 w-[150px] rounded-md shadow-lg overflow-hidden"
      >
        {isLogin ? (
          <>로그인 함</>
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
    </button>
  );
}
