/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React from 'react';

import { getAllImages } from '@/apis/image';

import Card from './Card';
import Pagination from './Pagination';

export default function Cards({
  className,
  page,
  search,
}: {
  className?: string;
  page: string;
  search: string | undefined;
}) {
  const { data } = useQuery({
    queryKey: ['images', page, search],
    queryFn: () => getAllImages(page, search),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });

  const totalPage = Math.ceil(data?.total / 17);

  return (
    <>
      <div className={`columns-2 md:columns-4 space-y-5 gap-4  ${className}`}>
        {data?.images.map((elem: any, index: number) => (
          <Card key={index} cover={elem.image_url} {...elem} />
        ))}
      </div>
      <div className="mt-10 relative flex flex-col items-center gap-5">
        <Pagination search={search} page={page} totalPage={totalPage} />
      </div>
    </>
  );
}
