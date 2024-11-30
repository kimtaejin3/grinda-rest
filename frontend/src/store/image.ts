import { baseApi } from "./baseApi";

const injectedRtkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postImage: build.mutation<{image_url: string}, {image_url: string}>({
      query: (body) => ({ url: '/image', method: 'POST', headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }, body }),
    }),
  }),
});

export const { usePostImageMutation } = injectedRtkApi;