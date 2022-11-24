import {ReactNode, useEffect} from "react";
import SkrittIndikator from "./SkrittIndikator";
import {SoknadDiv} from "./SoknadDiv";
import {useRouter} from "next/router";
import {useBehandlingsIdFromRouter} from "../../lib/soknadContext/useBehandlingsIdFromRouter";
import {SkjemaSkrittHTMLMeta} from "./SkjemaSkrittHTMLMeta";
import {SkjemaSkrittHeading} from "./SkjemaSkrittHeading";

export const LAST_FORM_STEP = 8;

export interface SkjemaSkrittProps {
    activeStep: number;
    children?: ReactNode;
}

export const SkjemaSkritt = ({activeStep, children}: SkjemaSkrittProps) => {
    const router = useRouter();
    const behandlingsId = useBehandlingsIdFromRouter();

    useEffect(() => {
        if (activeStep < LAST_FORM_STEP) router.prefetch(`/${behandlingsId}/${(activeStep + 1).toString()}`).then();
    }, [behandlingsId, activeStep, router]);

    return (
        <SoknadDiv>
            <SkjemaSkrittHTMLMeta activeStep={activeStep} />
            <SkrittIndikator
                activeStep={activeStep}
                onStepChange={(step) =>
                    router.push({pathname: `/[behandlingsId]/${step.toString()}`, query: {behandlingsId}})
                }
            />
            <SkjemaSkrittHeading activeStep={activeStep} />
            {children}
        </SoknadDiv>
    );
};
