import {ComponentMeta, Story} from "@storybook/react";
import React from "react";
import {FakeQuestionWrapper} from "./FakeQuestionWrapper";
import {SkrittIndikator, SkrittIndikatorProps} from "../components/layout/SkrittIndikator";
import {useArgs} from "@storybook/client-api";

// Test
const Template: Story<SkrittIndikatorProps> = (args: SkrittIndikatorProps) => {
    const [{}, updateArgs] = useArgs();
    const handle = (step: number) => {
        updateArgs({...args, activeStep: step});
        args.onStepChange(step);
    };

    return (
        <FakeQuestionWrapper>
            <SkrittIndikator activeStep={args.activeStep} onStepChange={handle} />
        </FakeQuestionWrapper>
    );
};

export const Primary = Template.bind({});

Primary.args = {
    activeStep: 1,
};

export default {
    title: "SkrittIndikator",
    component: SkrittIndikator,
    argTypes: {
        activeStep: {
            control: "number",
        },
        onStepChange: {
            action: "Navigated to page",
        },
    },
} as ComponentMeta<typeof SkrittIndikator>;
