'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { postImage } from '@/apis/image';
import { $ } from '@/lib/core';
import { createClient } from '@/utils/supabase/client';

import Box from '../icon/Box';
import Camera from '../icon/Camera';

const initialForm: {
  title: string;
  content: string;
  category: string;
  categories: string[];
} = {
  title: '',
  content: '',
  category: '',
  categories: [],
};

export default function PinCreationForm({ className }: { className?: string }) {
  const router = useRouter();
  const supabase = createClient();

  const queryClient = useQueryClient();

  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
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

  const image_preview = useMemo(() => {
    if (files.length > 0) {
      return URL.createObjectURL(files[0]);
    }
    return null;
  }, [files]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
    console.log();
    const files = event.dataTransfer.files;
    // 파일 처리 로직 추가
    console.log(files);
    setFiles(Array.from(files));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setFiles(Array.from(files));
  };

  const insertImage = async (file: File) => {
    try {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(file.name.split('.')[0], file);
      try {
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error);
      }

      return data;
    } catch (error) {
      alert('이미지 업로드 해주세요.');
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 후 이용해주세요.');
      router.push('/signin');
      return;
    }

    const toastId = toast.loading('핀 생성 중...');

    const data2 = await insertImage(files[0]);
    const { title, content, categories } = form;

    if (!data2) {
      return;
    }
    if (title === '' || content === '' || categories.length === 0) {
      alert('제목, 설명, 카테고리를 1개 이상 입력해주세요.');
      return;
    }

    const image_url = `https://gmpgjtjmalohyjsespkr.supabase.co/storage/v1/object/public/images/${data2.path}`;

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
      <div>
        <label
          htmlFor="pin"
          className="cursor-pointer overflow-hidden shrink-0 w-[300px] h-[400px]  bg-gray-200 rounded-2xl flex justify-center items-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          {files.length > 0 && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {image_preview && <img src={image_preview} alt="uploaded" />}
            </div>
          )}
          {files.length === 0 && (
            <div className="flex flex-col items-center">
              {!dragActive ? <Camera /> : <Box className="w-10 h-10" />}
              <p className="text-center">
                파일을 선택하거나
                <br /> 여기로 끌어다 놓으세요.
              </p>
            </div>
          )}
        </label>
        <input
          id="pin"
          type="file"
          accept="image/*"
          className="hidden"
          multiple={false}
          onChange={handleFileChange}
        />
      </div>
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
