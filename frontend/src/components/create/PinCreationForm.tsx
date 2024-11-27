'use client';

import { useState } from 'react';

import { $ } from '@/lib/core';
import { createClient } from '@/utils/supabase/client';

import Box from '../icon/Box';
import Camera from '../icon/Camera';

const initialForm: {
  title: string;
  description: string;
  category: string;
  categories: string[];
} = {
  title: '',
  description: '',
  category: '',
  categories: [],
};

export default function PinCreationForm({ className }: { className?: string }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState(initialForm);

  const supabase = createClient();

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

    console.log('data1:', data);
    return data;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    const data2 = await insertImage(files[0]);

    // 여기서 url을 받을 수 있으니 이제 요청 보낼 수 있게 되었음!! ㅎㅎ
    console.log('data2:', data2);
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
              <img src={URL.createObjectURL(files[0])} alt="uploaded" />
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
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
