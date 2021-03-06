import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        demo_item: {
          keyArgs: false,
          merge(existing, incoming, { args: { offset = 0 } }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://api.test.lokal.network/v1/graphql",
  cache: new InMemoryCache(),
});

export default client;
