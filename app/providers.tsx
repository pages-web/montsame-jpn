"use client";

import { ApolloWrapper } from "../lib/apollo-wrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
