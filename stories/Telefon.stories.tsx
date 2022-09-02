import React from "react";

import {ComponentStory, ComponentMeta} from "@storybook/react";
import Telefon from "../components/personalia/telefon/Telefon";
import {MockStore} from "@graphql-tools/mock";
import styled from "styled-components";

const FakeQuestionWrapper = styled.div`
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem;
    border-right: 1px solid black;
    border-left: 1px solid black;
`;

const telefonResolvers = (store: MockStore) => ({
    Soknad: {
        telefon: (root: any) => store.get(root, "telefon"),
    },
    Query: {
        soknad: (_: any, {id}: {id: string}) => store.get("Soknad", id),
    },
    Mutation: {
        setTelefonnummer: (ref: any, {id, tlfnr}: {id: string; tlfnr: string}) => {
            store.set("Soknad", id, "telefon", {brukerdefinert: tlfnr});
            return store.get("Soknad", id);
        },
    },
});

export const IngentingIKrr: ComponentStory<typeof Telefon> = () => (
    <FakeQuestionWrapper>
        <Telefon />
    </FakeQuestionWrapper>
);

IngentingIKrr.parameters = {
    apolloDefaultValues: {
        TelefonData: () => ({brukerdefinert: null, fraKrr: null}),
    },
    apolloResolvers: telefonResolvers,
};

export const FraKrr: ComponentStory<typeof Telefon> = () => (
    <FakeQuestionWrapper>
        <Telefon />
    </FakeQuestionWrapper>
);

FraKrr.parameters = {
    apolloDefaultValues: {
        TelefonData: () => ({brukerdefinert: null, fraKrr: "+4722225555"}),
    },
    apolloResolvers: telefonResolvers,
};

export const FraBruker: ComponentStory<typeof Telefon> = () => (
    <FakeQuestionWrapper>
        <Telefon />
    </FakeQuestionWrapper>
);

FraBruker.parameters = {
    apolloDefaultValues: {
        TelefonData: () => ({brukerdefinert: "+4723040000", fraKrr: "+4722225555"}),
    },
    apolloResolvers: telefonResolvers,
};

export default {
    title: "Telefon",
    component: Telefon,
} as ComponentMeta<typeof Telefon>;
