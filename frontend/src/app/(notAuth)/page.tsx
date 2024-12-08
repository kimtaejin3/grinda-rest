import { Suspense } from 'react';

import CardsHydrate from '@/components/shared/CardsHydrate';
import CardsLoading from '@/components/shared/CardsLoading';

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ?? '1';

  return (
    <div className="pb-40">
      <Suspense fallback={<CardsLoading className="mt-3" count={17} />}>
        <CardsHydrate page={page} />
      </Suspense>
    </div>
  );
}
