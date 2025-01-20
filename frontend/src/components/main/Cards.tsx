/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getAllImages } from '@/apis/image';
import useLoadingDelay from '@/hooks/useLoadingDelay';

import Pagination from '../shared/Pagination';
import Card from './Card';
import CardsLoading from './CardsLoading';

export default function Cards({
  className,
  page,
  search,
}: {
  className?: string;
  page: string;
  search: string | undefined;
}) {
  const isLoading = useLoadingDelay([page, search], 500);

  const { data } = useQuery({
    queryKey: ['images', page, search],
    queryFn: () => getAllImages(page, search),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });

  const totalPage = Math.ceil(data?.total / 17);

  if (isLoading) {
    return <CardsLoading className="mt-3" columns={4} itemsPerColumn={4} />;
  }

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
