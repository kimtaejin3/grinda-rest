import { baseApi } from './baseApi';

const injectedRtkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postImage: build.mutation<
      {
        image_url: string;
        title: string;
        content: string;
        categories: string[];
      },
      {
        image_url: string;
        title: string;
        content: string;
        categories: string[];
      }
    >({
      query: (body) => ({
        url: '/image',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body,
      }),
    }),

    getImages: build.query<
      {
        image_url: string;
        title: string;
        content: string;
        categories: string[];
      }[],
      void
    >({
      query: () => ({
        url: '/images',
        method: 'GET',
      }),
    }),
  }),
});

export const { usePostImageMutation, useGetImagesQuery } = injectedRtkApi;
export {injectedRtkApi};
