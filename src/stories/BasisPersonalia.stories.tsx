import {ComponentMeta, Story} from "@storybook/react";
import React from "react";
import {FakeQuestionWrapper} from "./FakeQuestionWrapper";
import {BasisPersonalia, BasisPersonaliaProps} from "../components/personalia/BasisPersonalia";

const Template: Story<BasisPersonaliaProps> = ({personalia}: BasisPersonaliaProps) => {
    return (
        <FakeQuestionWrapper>
            <BasisPersonalia personalia={personalia} />
        </FakeQuestionWrapper>
    );
};

export const Primary = Template.bind({});

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
    title: "Personalia/BasisPersonalia",
    component: BasisPersonalia,
    argTypes: {
        personalia: {
            control: "object",
        },
    },
} as ComponentMeta<typeof BasisPersonalia>;
