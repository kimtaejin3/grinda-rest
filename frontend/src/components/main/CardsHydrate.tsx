import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getAllImages } from '@/apis/image';

import Cards from './Cards';

export default async function CardsHydrate({
  page,
  search,
}: {
  page: string;
  search: string | undefined;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['images', page, search],
    queryFn: () => getAllImages(page, search),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Cards page={page} search={search} />
    </HydrationBoundary>
  );
}
