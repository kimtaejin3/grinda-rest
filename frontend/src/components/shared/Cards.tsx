/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

import { getAllImages } from '@/apis/image';

import Card from './Card';

export default function Cards({
  className,
  page,
}: {
  className?: string;
  page: string;
}) {
  const { data } = useQuery({
    queryKey: ['images', page],
    queryFn: () => getAllImages(page),
  });

  return (
    <>
      <div className={`columns-2 md:columns-4 space-y-5 gap-4  ${className}`}>
        {data?.images.map((elem: any, index: number) => (
          <Card key={index} cover={elem.image_url} {...elem} />
        ))}
      </div>
      <div className="mt-10 relative">
        <Link
          className="absolute left-[50%] translate-x-[-50%] border-[0.1em] border-black rounded-full py-2 px-4"
          href={`?page=${parseInt(page) + 1}`}
        >
          다음 페이지
        </Link>
        <div className="flex items-center gap-6 absolute right-0">
          <Link href={`?page=${parseInt(page) - 1}`}>{'<'}</Link>
          <div>
            <input
              className="border-[1px] border-black rounded-md w-10 p-2 inline-flex items-center justify-center text-center"
              type="number"
              value={page}
            />{' '}
            &nbsp; / &nbsp; {Math.ceil(data?.total / 17)}
          </div>
          <Link href={`?page=${parseInt(page) + 1}`}>{'>'}</Link>
        </div>
      </div>
    </>
  );
}
