"use client";

import React from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  InMemoryCache as NextSSRInMemoryCache,
  ApolloClient as NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";

export function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.ERXES_API_URL,
    credentials: "include",
    headers: {
      "x-app-token": process.env.ERXES_APP_TOKEN || "",
    },
    fetchOptions: { cache: "no-store" },
  });

  const link =
    typeof window === "undefined"
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
      : httpLink;

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link,
  });
}

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
