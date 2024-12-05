/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectedRtkApi } from '@/store/image';
import { store } from '@/store/store';
import { wrapPromise } from '@/utils/wrapPromise';


export const useSuspenseQuery = (initialData: any) => {
  const promise = store.dispatch(injectedRtkApi.endpoints.getImages.initiate()).unwrap();
  const resource = wrapPromise(Promise.resolve(initialData || promise));
  return resource;
};