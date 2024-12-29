// 'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { likeImage } from '@/apis/image';

import Like from '../icon/Like';

interface ImageLikeButtonProps {
  id: number;
  likeCount: number;
  className?: string;
  onLikeCountChange: (likeCount: number) => void;
}

export default function ImageLikeButton({
  id,
  likeCount,
  onLikeCountChange,
  className,
}: ImageLikeButtonProps) {
  const [isHover, setIsHover] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: likeImageMutation } = useMutation({
    mutationFn: (image_id: number) => likeImage(image_id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['images'] });
      const previousLikeCount = likeCount;
      onLikeCountChange(previousLikeCount + 1);
      return { previousLikeCount };
    },
    onError: (error, image_id, context) => {
      if (context) {
        onLikeCountChange(context?.previousLikeCount);
      }

      //TODO: 로컬스토리지 로직 (인증로직) 후에 한곳에서 처리하도록 수정
      if (localStorage.getItem('accessToken')) {
        toast.error('이미 좋아요를 누른 사진입니다.');
      } else {
        toast.error('로그인 후 이용해주세요');
      }
    },
  });

  return (
    <button
      onClick={() => likeImageMutation(id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={className}
    >
      {isHover ? <Like fill="red" stroke="red" /> : <Like />}
    </button>
  );
}
