import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getAllImages } from '@/apis/image';

import Cards from './Cards';

export default async function CardsHydrate({ page }: { page: string }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['images', page],
    queryFn: () => getAllImages(page),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Cards page={page} />
    </HydrationBoundary>
  );
}
