import { Suspense } from 'react';

import CardsHydrate from '@/components/shared/CardsHydrate';
import CardsLoading from '@/components/shared/CardsLoading';
import ProgressWrap from '@/components/shared/ProgressWrap';

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string; search: string | undefined };
}) {
  const page = searchParams.page ?? '1';
  const search = searchParams.search;

  return (
    <div className="pb-40">
      <ProgressWrap />
      <Suspense
        fallback={
          <CardsLoading className="mt-3" columns={4} itemsPerColumn={5} />
        }
      >
        <CardsHydrate page={page} search={search} />
      </Suspense>
    </div>
  );
}
