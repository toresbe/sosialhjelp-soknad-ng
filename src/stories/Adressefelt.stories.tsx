import {ComponentMeta, Story} from "@storybook/react";
import React from "react";
import {FakeQuestionWrapper} from "./FakeQuestionWrapper";
import {Adressefelt, AdressefeltProps} from "../components/personalia/adresse/Adressefelt";

const Template: Story<AdressefeltProps> = ({adresse}: AdressefeltProps) => {
    return (
        <FakeQuestionWrapper>
            <Adressefelt adresse={adresse} />
        </FakeQuestionWrapper>
    );
};

export const Vegadresse = Template.bind({});

Vegadresse.args = {
    adresse: {
        adresseTekst: "Fyrstikkalléen 1A",
        postnummer: "0661",
        poststed: "OSLO",
    },
};

export const Matrikkel = Template.bind({});

Matrikkel.args = {
    adresse: {
        adresseTekst: "130/103/1-1",
        postnummer: "",
        poststed: "",
    },
};

export default {
    title: "Personalia/Adresse/Adressefelt",
    component: Adressefelt,
    argTypes: {
        personalia: {
            control: "object",
        },
    },
} as ComponentMeta<typeof Adressefelt>;
