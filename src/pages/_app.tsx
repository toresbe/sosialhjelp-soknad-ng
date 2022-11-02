import type {AppProps} from "next/app";
import {ApolloProvider} from "@apollo/client";
import {useApollo} from "../lib/apolloClient/useApollo";
import {appWithTranslation} from "next-i18next";
import "@navikt/ds-css";
import {HeaderBanner} from "../components/layout/HeaderBanner";

const MyApp = ({Component, pageProps}: AppProps) => (
    <ApolloProvider client={useApollo(pageProps.initialApolloState)}>
        <HeaderBanner />
        <Component {...pageProps} />
    </ApolloProvider>
);

export default appWithTranslation(MyApp);
