"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { Provider } from 'react-redux';

// import { store } from '../store/store';

// export default function ClientProvider({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
