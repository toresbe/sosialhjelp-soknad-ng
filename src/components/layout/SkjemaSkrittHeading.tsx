import {Heading} from "@navikt/ds-react";

export interface SkjemaSkrittHeadingProps {
    activeStep: number;
}

// FIXME: Hard-coded to page 1 - must look up page headings from i18n
export const SkjemaSkrittHeading = ({activeStep}: SkjemaSkrittHeadingProps) => (
    <div className={"text-center"}>
        <Heading size={"large"}>Personopplysninger</Heading>
    </div>
);
