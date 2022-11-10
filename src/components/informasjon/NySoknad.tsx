import {Notes} from "@navikt/ds-icons";
import {Button, Heading} from "@navikt/ds-react";
import React from "react";
import {AccordionHeaderOversikt} from "./AccordionHeaderOversikt";
import {Accordion} from "@navikt/ds-react";

export const NySoknad = () => (
    <Accordion.Item>
        <AccordionHeaderOversikt ikon={<Notes />}>
            <Heading level="2" size="small">
                Start en ny søknad
            </Heading>
        </AccordionHeaderOversikt>
        <Accordion.Content>
            <div>Info om ny søknad goes here</div>
            <div className={"text-center"}>
                <Button onClick={() => {}}>Ny søknad</Button>
            </div>
        </Accordion.Content>
    </Accordion.Item>
);

export default NySoknad;
