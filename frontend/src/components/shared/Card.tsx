'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { likeImage } from '@/apis/image';
import { $ } from '@/lib/core';

import Like from '../icon/Like';
import ImageDownloadButton from './ImageDownloadButton';

export default function Card({
  id,
  className,
  cover,
  title,
  content,
  like_count,
}: {
  id: number;
  className?: string;
  cover: string;
  title: string;
  content: string;
  like_count: number;
}) {
  const [isHover, setIsHover] = useState(false);
  const [isLikedButtonHover, setIsLikedButtonHover] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(like_count);

  const queryClient = useQueryClient();

  useEffect(() => {
    setLocalLikeCount(like_count);
  }, [like_count]);

  const { mutate: likeImageMutation } = useMutation({
    mutationFn: (image_id: number) => likeImage(image_id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['images'] });
      const previousLikeCount = localLikeCount;
      setLocalLikeCount(previousLikeCount + 1);
      return { previousLikeCount };
    },
    onError: (error, image_id, context) => {
      if (context) {
        setLocalLikeCount(context?.previousLikeCount);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });

  const handleLikeClick = useCallback((image_id: number) => {
    likeImageMutation(image_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={$(
        className,
        'rounded-lg overflow-hidden cursor-pointer relative hover:scale-105 transition-all duration-300 bg-gray-200'
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="h-full relative">
        <Image
          width={100}
          height={100}
          className="w-full h-auto object-cover"
          src={cover}
          alt={title}
          sizes="100vw"
          quality={75}
        />
      </div>
      {isHover && (
        <div className="absolute z-10 inset-0 bg-black text-white opacity-60  py-2 px-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between ">
              <p className="text-sm">{title}</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleLikeClick(id)}
                  onMouseEnter={() => setIsLikedButtonHover(true)}
                  onMouseLeave={() => setIsLikedButtonHover(false)}
                >
                  {isLikedButtonHover ? (
                    <Like fill="red" stroke="red" />
                  ) : (
                    <Like />
                  )}
                </button>
                <p className="text-sm">{localLikeCount}</p>
              </div>
            </div>
            <p className="text-smmt mt-5">{content}</p>
          </div>
          {cover && (
            <ImageDownloadButton
              className="mb-3 flex justify-end"
              imageUrl={cover}
              title={title}
            />
          )}
        </div>
      )}
    </div>
  );
}
