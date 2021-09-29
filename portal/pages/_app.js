import { ApolloProvider } from "@apollo/client";
import client from "../apolloClient";
import { Layout } from "../components/Layout";
import FilterProvider from "../context/FilterContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <FilterProvider>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </FilterProvider>
    </ApolloProvider>
  );
}

export default MyApp;
