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

    setTimeout(() => {
      grid.positionItems();
    }, 100);

    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  return (
    <div ref={container as React.RefObject<HTMLDivElement>}>{children}</div>
  );
};

export default MagicGridWrapper;
