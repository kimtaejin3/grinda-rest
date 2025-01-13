/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getAllImages } from '@/apis/image';
import useLoadingDelay from '@/hooks/useLoadingDelay';

import Card from './Card';
import CardsLoading from './CardsLoading';
import MagicGridWrapper from './MagicGridWrapper';
import Pagination from './Pagination';

export default function Cards({
  page,
  search,
}: {
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
      <MagicGridWrapper
        items={data.images.length}
        // animate={true}
        gutter={15}
        maxColumns={4}
      >
        {data.images.map((elem: any, index: number) => (
          <Card
            className="w-[250px] min-h-[250px]"
            key={index}
            cover={elem.image_url}
            {...elem}
          />
        ))}
      </MagicGridWrapper>

      <div className="mt-10 relative flex flex-col items-center gap-5">
        <Pagination search={search} page={page} totalPage={totalPage} />
      </div>
    </>
  );
}
