'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

import { $ } from '@/lib/core';

import Like from '../icon/Like';

export default function Card({
  className,
  cover,
}: {
  className?: string;
  cover: StaticImageData;
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
          className=" h-full object-cover"
          src={cover as StaticImageData}
          alt=""
        />
      </div>
      {isHover && (
        <div className="absolute flex items-start justify-between z-10 inset-0 bg-black text-white opacity-60  py-2 px-4">
          <p className="text-sm">짱구는 잘말려</p>
          <div className="flex items-center gap-1">
            <Like />
            <p className="text-sm">12</p>
          </div>
        </div>
      )}
    </div>
  );
}
