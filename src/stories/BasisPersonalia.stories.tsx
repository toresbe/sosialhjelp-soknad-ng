import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {FakeQuestionWrapper} from "./FakeQuestionWrapper";
import {BasisPersonalia} from "../components/personalia/BasisPersonalia";
import {Personalia} from "../generated/apollo";

export const UtenMellomnavn: ComponentStory<typeof BasisPersonalia> = () => {
    const personalia: Personalia = {
        navn: {
            fornavn: "Ola",
            etternavn: "Nordmann",
        },
        fnr: "12345678901",
        statsborgerskap: "Kløfta Demokratiske Folkerepublikk",
    };

    return (
        <FakeQuestionWrapper>
            <BasisPersonalia personalia={personalia} />
        </FakeQuestionWrapper>
    );
};

export const MedMellomnavn: ComponentStory<typeof BasisPersonalia> = () => {
    const personalia: Personalia = {
        navn: {
            fornavn: "Austin",
            mellomnavn: "Danger",
            etternavn: "Powers",
        },
        fnr: "12345678901",
        statsborgerskap: "Storbritannia",
    };

    return (
        <FakeQuestionWrapper>
            <BasisPersonalia personalia={personalia} />
        </FakeQuestionWrapper>
    );
};

export default {
    title: "BasisPersonalia",
    component: BasisPersonalia,
    argTypes: {
        personalia: {
            navn: {
                fornavn: {
                    control: {
                        type: "text",
                    },
                },
            },
        },
    },
} as ComponentMeta<typeof BasisPersonalia>;
