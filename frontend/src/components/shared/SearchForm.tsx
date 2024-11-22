import { $ } from '@/lib/core';

import Search from '../icon/Search';

function SearchForm({ className }: { className?: string }) {
  return (
    <form
      className={$(
        'flex gap-6 bg-gray-100 rounded-2xl overflow-hidden py-2 px-3',
        className
      )}
    >
      <input
        className="border bg-inherit border-none focus:outline-none w-full"
        placeholder="검색어를 입력해주세요."
      />
      <button>
        <Search />
      </button>
    </form>
  );
}

export default SearchForm;
