import {Notes} from "@navikt/ds-icons";
import {Accordion, Button, Heading} from "@navikt/ds-react";
import React from "react";
import {AccordionHeaderOversikt} from "./AccordionHeaderOversikt";
import {useMutation} from "@apollo/client";
import {MutationStatus, NySoknadDocument} from "../../generated/apolloClientTypes";
import {useRouter} from "next/router";

export const NySoknad = () => {
    const router = useRouter();
    const [mutate] = useMutation(NySoknadDocument, {
        onCompleted: ({nySoknad: {soknad, status}}) => {
            if (status === MutationStatus.Success) router.push(`/${soknad!.id}/1`);
        },
    });
    return (
        <Accordion.Item>
            <AccordionHeaderOversikt ikon={<Notes />}>
                <Heading level="2" size="small">
                    Start en ny søknad
                </Heading>
            </AccordionHeaderOversikt>
            <Accordion.Content>
                <div>Info om ny søknad goes here</div>
                <div className={"text-center"}>
                    <Button
                        onClick={() => {
                            mutate();
                        }}
                    >
                        Ny søknad
                    </Button>
                </div>
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default NySoknad;
