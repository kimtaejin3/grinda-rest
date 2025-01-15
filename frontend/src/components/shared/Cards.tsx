/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getAllImages } from '@/apis/image';
import useInView from '@/hooks/useInView';
import useLoadingDelay from '@/hooks/useLoadingDelay';

import Card from './Card';
import CardsLoading from './CardsLoading';
import MagicGridWrapper from './MagicGridWrapper';

export default function Cards({ search }: { search: string | undefined }) {
  const isLoading = useLoadingDelay([0, search], 500);
  const [reposition, setReposition] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['images', search],
      queryFn: ({ pageParam = 0 }) => getAllImages(pageParam, search),
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.page + 1;
        return nextPage < Math.ceil(lastPage.total / 10) + 1
          ? nextPage
          : undefined;
      },

      initialPageParam: 0,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      setReposition(true);
      setTimeout(() => {
        setReposition(false);
      }, 100);
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <CardsLoading className="mt-3" columns={4} itemsPerColumn={4} />;
  }

  return (
    <>
      <MagicGridWrapper
        items={data?.pages.reduce(
          (total, page) => total + page.images.length,
          0
        )}
        gutter={15}
        maxColumns={4}
        reposition={reposition}
      >
        {data?.pages.flatMap((page) =>
          page.images.map((elem: any) => (
            <Card
              className="w-[250px] min-h-[250px]"
              key={elem.id}
              cover={elem.image_url}
              {...elem}
            />
          ))
        )}
      </MagicGridWrapper>
      <div ref={ref}>here</div>

      {/* <div className="mt-10 relative flex flex-col items-center gap-5">
        <Pagination search={search} page={page} totalPage={totalPage} />
      </div> */}
    </>
  );
}
