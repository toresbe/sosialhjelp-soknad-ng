import {MockedProvider} from "@apollo/client/testing";
import i18n from "./i18next.js";
import "@navikt/ds-css";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    apolloClient: {
        MockedProvider,
    },
    i18n,
    locale: "nb",
    locales: {
        en: "English",
        nb: "Norsk Bokmål",
    },
};
