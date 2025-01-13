import Image from 'next/image';
import { useEffect, useState } from 'react';

import { $ } from '@/lib/core';

import ImageDownloadButton from './ImageDownloadButton';
import ImageLikeButton from './ImageLikeButton';

interface CardProps {
  id: number;
  className?: string;
  cover: string;
  title: string;
  content: string;
  like_count: number;
}

export default function Card(props: CardProps) {
  const { id, className, cover, title, content, like_count } = props;

  const [isHover, setIsHover] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(like_count);

  useEffect(() => {
    setLocalLikeCount(like_count);
  }, [like_count]);

  return (
    <div
      className={$(
        className,
        'rounded-lg overflow-hidden cursor-pointer relative hover:scale-105 bg-gray-200'
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="h-full relative">
        <Image
          // loading="lazy"
          width={100}
          height={100}
          className="w-full h-auto object-cover"
          src={cover}
          alt={title}
          // sizes="100vw"
          quality={75}
        />
      </div>
      {isHover && (
        <div className="absolute z-10 inset-0 bg-black text-white opacity-60  py-2 px-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between ">
              <p className="text-sm">{title}</p>
              <div className="flex items-center gap-1">
                <ImageLikeButton
                  id={id}
                  likeCount={localLikeCount}
                  onLikeCountChange={(likeCount) =>
                    setLocalLikeCount(likeCount)
                  }
                />
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
