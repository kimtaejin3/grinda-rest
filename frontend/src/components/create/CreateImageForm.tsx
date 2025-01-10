'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { postImage } from '@/apis/image';
import { $ } from '@/lib/core';
import { uploadImage } from '@/utils/supabase/storage';

import ImageFileInput from './ImageFileInput';

const initialForm: {
  title: string;
  content: string;
  category: string;
  categories: string[];
  files: File[];
} = {
  title: '',
  content: '',
  category: '',
  categories: [],
  files: [],
};

export default function CreateImageForm({ className }: { className?: string }) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [form, setForm] = useState(initialForm);

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      image_url,
      title,
      content,
      categories,
    }: {
      image_url: string;
      title: string;
      content: string;
      categories: string[];
    }) => postImage(image_url, title, content, categories),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 후 이용해주세요.');
      router.push('/signin');
      return;
    }
    const { title, content, categories, files } = form;
    if (
      title === '' ||
      content === '' ||
      categories.length === 0 ||
      files.length === 0
    ) {
      alert('제목, 설명, 카테고리를 1개 이상 입력해주세요.');
      return;
    }

    const toastId = toast.loading('핀 생성 중...');

    const imageInfo = await uploadImage(files[0]);

    if (!imageInfo) {
      return;
    }

    const image_url = `https://gmpgjtjmalohyjsespkr.supabase.co/storage/v1/object/public/images/${imageInfo.path}`;

    if (isPending) return;

    await mutate(
      { image_url, title, content, categories },
      {
        onSuccess: () => {
          toast.dismiss(toastId);
          queryClient.invalidateQueries({ queryKey: ['images'] });
          toast.success('핀 생성에 성공했습니다.');
        },
        onError: () => {
          toast.dismiss(toastId);
          toast.error('핀 생성에 실패했습니다.');
        },
      }
    );

    router.push('/');
  };

  return (
    <form className={$(className, 'flex gap-10')} onSubmit={handleSubmit}>
      <ImageFileInput
        files={form.files}
        setFiles={(files) => setForm({ ...form, files })}
      />
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <label htmlFor="title">제목</label>
          <input
            className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="">
            설명
          </label>
          <textarea
            id="description"
            className="mt-2 min-h-[100px] resize-none border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="title">카테고리</label>
          <div className="flex gap-2 items-center">
            <input
              className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
              id="title"
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (form.categories.includes(form.category)) return;
                setForm({
                  ...form,
                  categories: [...form.categories, form.category],
                  category: '',
                });
              }}
              className="shrink-0 bg-gray-500 mt-2 h-9 text-white px-4 rounded-xl"
            >
              추가
            </button>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {form.categories.map((category) => (
              <div
                className="bg-red-400 py-1 px-2 flex items-center gap-2 text-sm rounded-md text-white"
                key={category}
              >
                {category}
                <button
                  onClick={() => {
                    setForm({
                      ...form,
                      categories: form.categories.filter((c) => c !== category),
                    });
                  }}
                  className="text-xs"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="mt-8 shrink-0 bg-[#e60021] h-9 text-white px-4 rounded-xl">
          게시하기
        </button>
      </div>
    </form>
  );
}
