import { useEffect, useRef, useState } from 'react';

export default function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    console.log('ref:', ref);
    console.log('ref.current:', ref.current);
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return { ref, inView };
}
