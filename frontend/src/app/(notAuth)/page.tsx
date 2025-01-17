
import CardsHydrate from '@/components/shared/CardsHydrate';
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
      <CardsHydrate page={page} search={search} />
    </div>
  );
}
