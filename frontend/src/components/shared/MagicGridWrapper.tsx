/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MagicGrid from 'magic-grid';
import React, { useEffect, useRef } from 'react';

const MagicGridWrapper = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const container = useRef<HTMLDivElement>();

  useEffect(() => {
    let grid: MagicGrid | null = null;
    let timeout: NodeJS.Timeout | null = null;

    const resize = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        grid && grid.positionItems();
        timeout = null;
      }, 200);
    };

    if (!grid) {
      grid = new MagicGrid({
        container: container.current as HTMLElement,
        ...props,
      });
      window.addEventListener('resize', resize);
    }

    grid.positionItems();

    for (let i = 1; i < 20; i++) {
      setTimeout(() => {
        grid.positionItems();
      }, 100 * i);
    }

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      // className="min-h-[500px]"
      ref={container as React.RefObject<HTMLDivElement>}
    >
      {children}
    </div>
  );
};

export default MagicGridWrapper;
