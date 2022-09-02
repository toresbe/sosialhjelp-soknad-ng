import i18n from "./i18next.js";
import "@navikt/ds-css";
import {SoknadContext} from "../lib/SoknadContext";
//import {initialize, mswDecorator} from "msw-storybook-addon";

//initialize();

import {apolloMockDecorator} from "../lib/storybook/apolloMockDecorator";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    i18n,
    locale: "nb",
    locales: {
        en: "English",
        nb: "Norsk Bokmål",
    },
};
export const decorators = [
    //mswDecorator,
    apolloMockDecorator,
    (Story) => (
        <SoknadContext.Provider value={"storybook"}>
            <Story />
        </SoknadContext.Provider>
    ),
];
