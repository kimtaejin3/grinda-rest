import Link from 'next/link';

import Logo from '../icon/Logo';
import NavItem from './NavItem';
import SearchForm from './SearchForm';

export default function Header() {
  return (
    <header className="flex gap-5 justify-between items-center px-4 py-5">
      <div className="flex gap-10 items-center">
        <h1>
          <span className="sr-only">그린다레스트 로고</span>
          <Link href="/">
            <Logo className="w-6" fill="#e60022" />
          </Link>
        </h1>
        <nav className="flex gap-2 items-center">
          <NavItem href="/">홈</NavItem>
          <NavItem href="/create">만들기</NavItem>
        </nav>
      </div>
      <SearchForm className="flex-1" />
      <button>
        <svg
          baseProfile="tiny"
          height="24px"
          id="Layer_1"
          version="1.2"
          viewBox="0 0 24 24"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17,9c0-1.381-0.56-2.631-1.464-3.535C14.631,4.56,13.381,4,12,4S9.369,4.56,8.464,5.465C7.56,6.369,7,7.619,7,9  s0.56,2.631,1.464,3.535C9.369,13.44,10.619,14,12,14s2.631-0.56,3.536-1.465C16.44,11.631,17,10.381,17,9z" />
          <path d="M6,19c0,1,2.25,2,6,2c3.518,0,6-1,6-2c0-2-2.354-4-6-4C8.25,15,6,17,6,19z" />
        </svg>
      </button>
    </header>
  );
}
