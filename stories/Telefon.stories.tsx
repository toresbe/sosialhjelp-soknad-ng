import React from "react";

import {ComponentStory, ComponentMeta} from "@storybook/react";
import Telefon from "../components/personalia/Telefon";
import {TelefonDataDocument} from "../lib/generated";

export const UtenEgendefinert: ComponentStory<typeof Telefon> = () => <Telefon />;

UtenEgendefinert.parameters = {
    apolloClient: {
        mocks: [
            {
                request: {
                    query: TelefonDataDocument,
                    variables: {soknadId: "110000001"},
                },
                result: {
                    data: {
                        soknad: {
                            telefon: {
                                fraKRR: "Foo",
                                brukerdefinert: null,
                            },
                        },
                    },
                },
            },
        ],
    },
};

export const Foo: ComponentStory<typeof Telefon> = () => (
    <div style={{backgroundColor: "red"}}>
        <p>HIIi</p>
    </div>
);

export default {
    title: "Telefon",
    component: Telefon,
} as ComponentMeta<typeof Telefon>;
