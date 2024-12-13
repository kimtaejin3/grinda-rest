'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressWrap() {
  return (
      <ProgressBar
        height="3px"
        color="#FF7979"
        options={{ showSpinner: false }}
        shallowRouting
      />
  );
}