import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getAllImages } from '@/apis/image';

import Cards from './Cards';

export default async function CardsHydrate() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['images'],
    queryFn: getAllImages,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Cards />
    </HydrationBoundary>
  );
}
