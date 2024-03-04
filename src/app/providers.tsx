"use client";
import React from "react";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>{children}</Hydrate>
    </QueryClientProvider>
  );
}
