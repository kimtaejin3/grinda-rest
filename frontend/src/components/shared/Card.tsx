'use client';

import Image from 'next/image';
import { useState } from 'react';

import { $ } from '@/lib/core';

import Like from '../icon/Like';

export default function Card({
  className,
  cover,
  title,
  content,
  categories,
}: {
  className?: string;
  cover: string;
  title: string;
  content: string;
  categories: string[];
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={$(
        className,
        'rounded-lg overflow-hidden cursor-pointer relative hover:scale-105 transition-all duration-300'
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="h-full relative">
        <Image
          layout="responsive"
          width={100}
          height={100}
          objectFit="cover"
          className="w-full h-full object-cover"
          src={cover}
          alt=""
        />
      </div>
      {isHover && (
        <div className="absolute z-10 inset-0 bg-black text-white opacity-60  py-2 px-4 flex flex-col gap-6">
          <div className="flex items-start justify-between ">
            <p className="text-sm">{title}</p>
            <div className="flex items-center gap-1">
              <Like />
              <p className="text-sm">12</p>
            </div>
          </div>
          <p className="text-sm">{content}</p>
        </div>
      )}
    </div>
  );
}
