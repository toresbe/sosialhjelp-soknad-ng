import {ComponentMeta, Story} from "@storybook/react";
import React from "react";
import {FakeQuestionWrapper} from "./FakeQuestionWrapper";
import {NavEnhetStatus} from "../generated/apolloClientTypes";
import NavEnhetStatusPanelProps, {NavEnhetStatusPanel} from "../components/personalia/NavEnhetStatusPanel";

const Template: Story<NavEnhetStatusPanelProps> = ({navEnhet}: NavEnhetStatusPanelProps) => (
    <FakeQuestionWrapper>
        <NavEnhetStatusPanel navEnhet={navEnhet} />
    </FakeQuestionWrapper>
);

export const Aktiv = Template.bind({});

Aktiv.args = {
    navEnhet: {
        id: "123",
        navn: "LOL",
        kommune: "LMAO",
        status: NavEnhetStatus.Aktiv,
    },
};

export const Deaktivert = Template.bind({});

// @ts-ignore
Deaktivert.args = {
    navEnhet: {
        id: "123",
        navn: "LOL",
        kommune: "LMAO",
        status: NavEnhetStatus.Deaktivert,
    },
};

export const MidlertidigDeaktivert = Template.bind({});

MidlertidigDeaktivert.args = {
    navEnhet: {
        id: "123",
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
