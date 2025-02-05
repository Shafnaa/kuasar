import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloClientProvider,
} from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  );
}

export default ApolloProvider;
