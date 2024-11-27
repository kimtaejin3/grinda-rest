import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from './baseApi';

export const store = configureStore({
  reducer: {
    // 여기에 리듀서를 추가하세요
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 