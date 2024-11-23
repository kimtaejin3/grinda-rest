import { $ } from '@/lib/core';

import Camera from '../icon/Camera';

export default function PinCreationForm({ className }: { className?: string }) {
  return (
    <form className={$(className, 'flex gap-10')}>
      <div>
        <label
          htmlFor="pin"
          className="cursor-pointer shrink-0 w-[300px] h-[400px]  bg-gray-200 rounded-2xl flex justify-center items-center"
        >
          <div className="flex flex-col items-center">
            <Camera />
            <p className="text-center">파일을 선택하세요</p>
          </div>
        </label>
        <input id="pin" type="file" accept="image/*" className="hidden" />
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <label htmlFor="title">제목</label>
          <input
            className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
            id="title"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="description" className="">
            설명
          </label>
          <textarea
            id="description"
            className="mt-2 min-h-[100px] resize-none border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="title">카테고리</label>
          <div className="flex gap-2 items-center">
            <input
              className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
              id="title"
              type="text"
            />
            <button className="shrink-0 bg-gray-500 mt-2 h-9 text-white px-4 rounded-xl">
              추가
            </button>
          </div>
        </div>

        <button className="mt-8 shrink-0 bg-[#e60021] h-9 text-white px-4 rounded-xl">
          게시하기
        </button>
      </div>
    </form>
  );
}
