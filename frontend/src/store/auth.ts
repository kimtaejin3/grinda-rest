import { baseApi } from "./baseApi";

const injectedRtkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({ url: '/users', method: 'POST', body }),
    }),
  }),
});

export const { useSignUpMutation } = injectedRtkApi;
