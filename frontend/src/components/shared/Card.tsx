'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

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

  const onClickImgLink = useCallback((srcUrl: string, name: string) => {
    fetch(srcUrl, { method: 'GET' })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(url);
        }, 1000);
        a.remove();
      })
      .catch((err) => {
        console.error('err', err);
      });
  }, []);

  return (
    <div
      className={$(
        className,
        'rounded-lg overflow-hidden cursor-pointer relative hover:scale-105 transition-all duration-300 bg-gray-200'
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="h-full relative">
        <Image
          width={1}
          height={1}
          className="w-full h-auto object-cover"
          src={cover}
          alt=""
          sizes="100vw"
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
          {cover && (
            <button
              onClick={() => onClickImgLink(cover, `fromGindaRest ${title}`)}
            >
              이미지 다운로드
            </button>
          )}
        </div>
      )}
    </div>
  );
}
