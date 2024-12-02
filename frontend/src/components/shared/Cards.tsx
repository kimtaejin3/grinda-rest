'use client';

import { $ } from '@/lib/core';
import { useGetImagesQuery } from '@/store/image';

import Card from './Card';

export default function Cards({ className }: { className?: string }) {
  const { data } = useGetImagesQuery();

  return (
    <div className={$(`columns-2 md:columns-4 space-y-5 gap-4`, className)}>
      {data?.map((elem, index) => (
        <Card key={index} cover={elem.image_url} {...elem} />
      ))}
    </div>
  );
}
