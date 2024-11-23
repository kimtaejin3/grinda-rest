'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { $ } from '@/lib/core';

export default function NavItem({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  props?: React.ComponentProps<'a'>;
}) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <Link
      href={href}
      className={$(
        isActive ? 'bg-black text-white rounded-full' : '',
        className,
        'px-4 py-1 transition-all'
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
