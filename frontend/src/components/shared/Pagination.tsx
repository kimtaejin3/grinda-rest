import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';

import LeftArrow from '../icon/LeftArrow';
import RightArrow from '../icon/RightArrow';

export default function Pagination({
  search,
  page,
  totalPage,
}: {
  search: string | undefined;
  page: string;
  totalPage: number;
}) {
  const router = useRouter();
  const _page = parseInt(page);

  return (
    <>
      <Link
        className="mt-5 mb-6 border-[0.1em] border-black rounded-full py-2 px-4"
        onClick={(e) => {
          e.preventDefault();
          if (_page === totalPage) return;
          router.push(`?page=${_page + 1}`);
        }}
        href="#"
      >
        다음 페이지
      </Link>
      <div className="flex items-center gap-6 right-0">
        <Link
          href={
            search
              ? `?search=${search}&page=${Math.max(_page - 1, 1)}`
              : `?page=${Math.max(_page - 1, 1)}`
          }
          prefetch
          className="w-10 h-10 hover:bg-slate-100 rounded-full flex items-center justify-center"
        >
          <LeftArrow />
        </Link>
        <div>
          <span>{page}</span>
          &nbsp; / &nbsp; {totalPage}
        </div>
        <Link
          href={
            search
              ? `?search=${search}&page=${Math.min(_page + 1, totalPage)}`
              : `?page=${Math.min(_page + 1, totalPage)}`
          }
          prefetch
          className="w-10 h-10 hover:bg-slate-100 rounded-full flex items-center justify-center"
        >
          <RightArrow />
        </Link>
      </div>
    </>
  );
}
