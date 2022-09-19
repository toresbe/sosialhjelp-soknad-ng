import type {AppProps} from "next/app";
import {ApolloProvider} from "@apollo/client";
import {useApollo} from "../lib/apollo/client";
import {appWithTranslation} from "next-i18next";
import "@navikt/ds-css";

function MyApp({Component, pageProps}: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default appWithTranslation(MyApp);
