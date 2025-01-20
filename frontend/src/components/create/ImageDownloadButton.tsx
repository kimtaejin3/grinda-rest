import { useCallback } from 'react';

import { downloadImage } from '@/utils/download';

import Download from '../icon/Download';

export default function ImageDownloadButton({
  className,
  imageUrl,
  title,
}: {
  className?: string;
  imageUrl: string;
  title: string;
}) {
  const handleDownload = useCallback(() => {
    downloadImage(imageUrl, `from-grinda-rest-${title}`).catch((err) => {
      console.error('다운로드 에러:', err);
    });
  }, [imageUrl, title]);

  return (
    <button className={className} onClick={handleDownload}>
      <Download />
    </button>
  );
}
