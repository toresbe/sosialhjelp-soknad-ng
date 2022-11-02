import SkrittIndikator from "./SkrittIndikator";
import {ReactNode} from "react";
import {SoknadDiv} from "./soknadDiv";
import {useRouter} from "next/router";
import {useSoknadIdFromRouter} from "../../lib/soknadContext/useSoknadIdFromRouter";

export interface SkjemaSkrittProps {
    activeStep: number;
    children?: ReactNode;
}

export const SkjemaSkritt = ({activeStep, children}: SkjemaSkrittProps) => {
    const router = useRouter();
    const behandlingsId = useSoknadIdFromRouter();

    return (
        <SoknadDiv>
            <SkrittIndikator
                activeStep={activeStep}
                onStepChange={(step) =>
                    router.push({pathname: `/[behandlingsId]/${step.toString()}`, query: {behandlingsId}})
                }
            />
            {children}
        </SoknadDiv>
    );
};
