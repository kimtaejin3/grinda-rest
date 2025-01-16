import { useEffect, useState } from 'react';

const useImagesLoaded = (imageUrls: string[]) => {
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const imageElements = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    const checkAllImagesLoaded = () => {
      if (imageElements.every((img) => img.complete)) {
        setAllLoaded(true);
      }
    };

    imageElements.forEach((img) => {
      img.onload = checkAllImagesLoaded;
      img.onerror = checkAllImagesLoaded; // 에러가 발생해도 체크
    });

    // 초기 체크
    checkAllImagesLoaded();

    // 클린업
    return () => {
      imageElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls]);

  return allLoaded;
};

export default useImagesLoaded;
