import Link from 'next/link';
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
        <CardsHydrate />
      </Suspense>
      <div className="mt-10 relative">
        <Link
          className="absolute left-[50%] translate-x-[-50%] border-[0.1em] border-black rounded-full py-2 px-4"
          href={`?page=${parseInt(page) + 1}`}
        >
          다음 페이지
        </Link>
        <div className="flex items-center gap-6 absolute right-0">
          <Link href={`?page=${parseInt(page) - 1}`}>{'<'}</Link>
          <div>
            <input
              className="border-[1px] border-black rounded-md w-10 p-2 inline-flex items-center justify-center text-center"
              type="number"
              value={page}
            />{' '}
            &nbsp; / &nbsp; 10
          </div>
          <Link href={`?page=${parseInt(page) + 1}`}>{'>'}</Link>
        </div>
      </div>
    </div>
  );
}
