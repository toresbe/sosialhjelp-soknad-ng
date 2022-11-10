import React from "react";
import {Accordion} from "@navikt/ds-react";

interface AccordionHeaderOversiktProps {
    ikon?: React.ReactNode;
    children: React.ReactNode;
}

// Spesialtilpasset AccordionHeader-wrapper for Søknadsoversikt, med prop for å inkludere et ikon
export const AccordionHeaderOversikt = ({ikon, children}: AccordionHeaderOversiktProps) => (
    <Accordion.Header className={"items-center"}>
        <div className={"flex items-center"}>
            <div className="aspect-square w-14 [&>svg]:w-full [&>svg]:h-full bg-digisosGronnLys rounded-full p-2 mr-6">
                {ikon}
            </div>
            <div className="grow h-fit">{children}</div>
        </div>
    </Accordion.Header>
);
