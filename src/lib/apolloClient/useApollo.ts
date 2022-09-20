import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {useMemo} from "react";

// React hook for useApollo, with various magic sprinkled in to give fast server-side rendering and caching.

let client: ApolloClient<NormalizedCacheObject> | null;

const createApolloClient = () =>
    new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: "/sosialhjelp/soknad/api/graphql",
        }),
        cache: new InMemoryCache(),
    });

const initializeApollo = (initialState: any = null) => {
    const _apolloClient = client ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore({...existingCache, ...initialState});
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!client) client = _apolloClient;
    return _apolloClient;
};

// React hook returning an Apollo client for use both for client- and server-side rendering
export const useApollo = (initialState: any) => useMemo(() => initializeApollo(initialState), [initialState]);
