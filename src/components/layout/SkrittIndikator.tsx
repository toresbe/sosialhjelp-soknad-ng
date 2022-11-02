import {Stepper} from "@navikt/ds-react";

export interface SkrittIndikatorProps {
    activeStep: number;
    onStepChange: (step: number) => void;
}

// FIXME: Unlabelled links like these are probably awful practice with screen readers.
// Add some aria spice!
export const SkrittIndikator = ({activeStep, onStepChange}: SkrittIndikatorProps) => {
    return (
        <Stepper activeStep={activeStep} orientation={"horizontal"} onStepChange={onStepChange}>
            <Stepper.Step>{""}</Stepper.Step>
            <Stepper.Step>{""}</Stepper.Step>
            <Stepper.Step>{""}</Stepper.Step>
            <Stepper.Step>{""}</Stepper.Step>
            <Stepper.Step>{""}</Stepper.Step>
            <Stepper.Step>{""}</Stepper.Step>
            <Stepper.Step>{""}</Stepper.Step>
            <Stepper.Step>{""}</Stepper.Step>
        </Stepper>
    );
};

export default SkrittIndikator;
