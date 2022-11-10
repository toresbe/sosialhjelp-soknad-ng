import {OppholdFragment, AdresseValg} from "../../../generated/apolloClientTypes";
import Adressefelt from "./Adressefelt";
import {Heading, RadioGroup} from "@navikt/ds-react";
import {HorisontalRadio} from "../../common/HorisontalRadio";

export interface OppholdProps {
    opphold: OppholdFragment;
}

export const Opphold = ({opphold}: OppholdProps) => {
    return (
        <RadioGroup legend={"Oppgi adressen der du bor (obligatorisk)"}>
            <HorisontalRadio value={AdresseValg.Bosted} hide={!opphold.bostedsAdresse}>
                <Heading level={"4"} size={"xsmall"}>
                    Folkeregistrert adresse
                </Heading>
                <Adressefelt className="pt-2" adresse={opphold.bostedsAdresse} />
            </HorisontalRadio>
            <HorisontalRadio value={AdresseValg.Opphold} hide={!opphold.oppholdsAdresse}>
                <Heading level={"4"} size={"xsmall"}>
                    Midlertidig oppholdsadresse
                </Heading>
                <Adressefelt className="pt-2" adresse={opphold.oppholdsAdresse} />
            </HorisontalRadio>
            <HorisontalRadio value={AdresseValg.Soknad}>Jeg oppholder meg på en annen adresse</HorisontalRadio>
        </RadioGroup>
    );
};
