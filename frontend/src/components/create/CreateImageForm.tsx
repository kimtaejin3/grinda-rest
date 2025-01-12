'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { postImage } from '@/apis/image';
import useImageForm from '@/hooks/useImageForm';
import { $ } from '@/lib/core';
import { ImageFormData } from '@/types';
import { uploadImage } from '@/utils/supabase/storage';

import CategoryInput from './CategoryInput';
import ImageFileInput from './ImageFileInput';

const initialForm: ImageFormData = {
  title: '',
  content: '',
  category: '',
  categories: [],
  files: [],
};

export default function CreateImageForm({ className }: { className?: string }) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { form, updateField, addCategory, removeCategory } = useImageForm({
    initialForm,
  });

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

    const imageInfo = await uploadImage(files[0]);

    if (!imageInfo) {
      return;
    }

    const image_url = `https://gmpgjtjmalohyjsespkr.supabase.co/storage/v1/object/public/images/${imageInfo.path}`;

    if (isPending) return;

    const toastId = toast.loading('핀 생성 중...');

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
        setFiles={(files) => updateField('files', [...files])}
      />
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <label htmlFor="title">제목</label>
          <input
            className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
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
            onChange={(e) => updateField('content', e.target.value)}
          />
        </div>
        <CategoryInput
          category={form.category}
          categories={form.categories}
          onUpdateCategory={(category) => updateField('category', category)}
          onAddCategory={addCategory}
          onRemoveCategory={removeCategory}
        />

        <button className="mt-12 shrink-0 bg-[#e60021] h-9 text-white px-4 rounded-xl">
          게시하기
        </button>
      </div>
    </form>
  );
}
