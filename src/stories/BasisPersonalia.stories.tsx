import {ComponentMeta} from "@storybook/react";
import React from "react";
import {FakeQuestionWrapper} from "./FakeQuestionWrapper";
import {BasisPersonalia} from "../components/personalia/BasisPersonalia";
import {Personalia} from "../generated/apolloClientTypes";

const Template = (args: {personalia: Personalia}) => {
    return (
        <FakeQuestionWrapper>
            <BasisPersonalia personalia={args.personalia} />
        </FakeQuestionWrapper>
    );
};

export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
    personalia: {
        navn: {
            fornavn: "Austin",
            mellomnavn: "Danger",
            etternavn: "Powers",
        },
        fnr: "12345678901",
        statsborgerskap: "Storbritannia",
    },
};

export default {
    title: "BasisPersonalia",
    component: BasisPersonalia,
    argTypes: {
        personalia: {
            control: "object",
        },
    },
} as ComponentMeta<typeof BasisPersonalia>;
