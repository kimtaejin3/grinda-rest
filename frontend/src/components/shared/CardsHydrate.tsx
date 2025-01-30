import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getAllImages } from '@/apis/image';

import Cards from './Cards';

export default async function CardsHydrate({
  search,
}: {
  search: string | undefined;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['images', search],
    queryFn: () => getAllImages(0, search),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Cards search={search} />
    </HydrationBoundary>
  );
}
