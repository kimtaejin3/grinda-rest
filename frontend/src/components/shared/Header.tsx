"use client";

import Link from 'next/link';

import Logo from '../icon/Logo';
import NavItem from './NavItem';
import ProfileButtonWrap from './ProfileButtonWrap';
import SearchForm from './SearchForm';

export default function Header() {
  return (
    <header className="flex gap-5 justify-between items-center px-4 py-5">
      <div className="flex gap-5 md:gap-10 items-center">
        <h1>
          <span className="sr-only">그린다레스트 로고</span>
          <Link href="/">
            <Logo className="w-6" />
          </Link>
        </h1>
        <nav className="flex gap-2 items-center">
          <NavItem href="/">홈</NavItem>
          <NavItem href="/create">만들기</NavItem>
        </nav>
      </div>
      <div className="flex-1 max-md:px-12 max-md:fixed max-md:left-0 max-md:right-0 max-md:bottom-10 max-md:z-50">
        <SearchForm />
      </div>
      <ProfileButtonWrap />
    </header>
  );
}
