import type {AppProps} from "next/app";
import {ApolloProvider} from "@apollo/client";
import {useApollo} from "../lib/apolloClient/useApollo";
import {appWithTranslation} from "next-i18next";
import "@navikt/ds-css";
import {AppBanner} from "../components/layout/AppBanner";
import "../styles/globals.css";

const MyApp = ({Component, pageProps}: AppProps) => (
    <ApolloProvider client={useApollo(pageProps.initialApolloState)}>
        <AppBanner />
        <main>
            <Component {...pageProps} />
        </main>
    </ApolloProvider>
);

export default appWithTranslation(MyApp);
