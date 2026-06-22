"use client";

import { ApolloProvider } from "@apollo/client/react";
import { getClient } from "../lib/client";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = getClient();
  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}