import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useLoadingDelay(dependencies: any[], delay: number) {
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log('isFirstRender');
      return;
    }
    console.log('ii')
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [...dependencies]);

  return isLoading;
}
