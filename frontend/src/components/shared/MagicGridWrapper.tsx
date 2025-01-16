/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MagicGrid from 'magic-grid';
import React, { useEffect, useRef } from 'react';

const MagicGridWrapper = ({
  children,
  reposition,
  ...props
}: {
  children: React.ReactNode;
  reposition: boolean;
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
        static: true,
        ...props,
      });
      window.addEventListener('resize', resize);
    }

    grid.positionItems();

    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        grid.positionItems();
      }, 150 * i);
    }

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [reposition]);

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
