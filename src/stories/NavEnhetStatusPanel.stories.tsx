import {ComponentMeta} from "@storybook/react";
import React from "react";
import {FakeQuestionWrapper} from "./FakeQuestionWrapper";
import {NavEnhet, NavEnhetStatus} from "../generated/apolloClientTypes";
import {NavEnhetStatusPanel} from "../components/personalia/NavEnhetStatusPanel";

const Template = (args: {navEnhet: NavEnhet}) => {
    return (
        <FakeQuestionWrapper>
            <NavEnhetStatusPanel navEnhet={args.navEnhet} />
        </FakeQuestionWrapper>
    );
};

export const Aktiv = Template.bind({});

// @ts-ignore
Aktiv.args = {
    navEnhet: {
        navn: "LOL",
        kommune: "LMAO",
        status: NavEnhetStatus.Aktiv,
    },
};

export const Deaktivert = Template.bind({});

// @ts-ignore
Deaktivert.args = {
    navEnhet: {
        navn: "LOL",
        kommune: "LMAO",
        status: NavEnhetStatus.Deaktivert,
    },
};

export const MidlertidigDeaktivert = Template.bind({});

// @ts-ignore
MidlertidigDeaktivert.args = {
    navEnhet: {
        navn: "LOL",
        kommune: "LMAO",
        status: NavEnhetStatus.MidlDeaktivert,
    },
};

export default {
    title: "NavEnhetStatusPanel",
    component: NavEnhetStatusPanel,
    argTypes: {
        navEnhet: {
            control: "object",
        },
    },
} as ComponentMeta<typeof NavEnhetStatusPanel>;
