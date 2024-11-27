import { baseApi } from "./baseApi";

const injectedRtkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signUp: build.mutation<{access_token: string, token_type: string}, {username: string, password: string}>({
      query: (body) => ({ url: '/users', method: 'POST', body }),
    }),

    signIn: build.mutation<{access_token: string, token_type: string}, {username: string, password: string}>({
      query: (body) => ({ url: '/token', method: 'POST', body }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = injectedRtkApi;
