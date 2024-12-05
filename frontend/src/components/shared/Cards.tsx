/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { Suspense } from 'react';

import { useSuspenseQuery } from '@/hooks/useSuspenseQuery';

import Card from './Card';

export default function Cards({ className, initialData }: { className?: string, initialData: any }) {
  const resource = useSuspenseQuery(initialData);

  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <div className={`columns-2 md:columns-4 space-y-5 gap-4 ${className}`}>
        {resource.read().map((elem: any, index: number) => (
          <Card key={index} cover={elem.image_url} {...elem} />
        ))}
      </div>
    </Suspense>
  );
}
