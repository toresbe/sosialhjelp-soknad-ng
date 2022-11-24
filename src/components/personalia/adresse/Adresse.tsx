import {AdresseValg, Adresse, Opphold} from "../../../generated/apolloClientTypes";
import Adressefelt from "./Adressefelt";
import {Heading, RadioGroup} from "@navikt/ds-react";
import {HorisontalRadio} from "../../common/HorisontalRadio";
import {NavEnhetStatusPanel} from "../NavEnhetStatusPanel";

import AdresseSok from "./AdresseSok";
import {useState} from "react";

// This is a compatibility layer kludge until an issue with the adresse API is resolved
// whereby setting valg to user-defined without a valid address yields a 500 error
export const OppholdInputStaged: typeof OppholdInput = ({opphold, setOpphold}) => {
    const [waitingForOpphold, setWaitingForOpphold] = useState<boolean>(false);

    const setBufferedOpphold: typeof setOpphold = (nyttOpphold) => {
        const {valgtAdresse, brukerdefinert} = {...opphold, ...nyttOpphold};

        const delayMutateUntilBrukerdefinert = valgtAdresse === AdresseValg.Soknad && !brukerdefinert;

        setWaitingForOpphold(delayMutateUntilBrukerdefinert);

        if (!delayMutateUntilBrukerdefinert) setOpphold({valgtAdresse, brukerdefinert});
    };

    const bufferedOpphold = (opphold: Opphold) => ({
        ...opphold,
        valgtAdresse: waitingForOpphold ? AdresseValg.Soknad : opphold.valgtAdresse,
    });

    return <OppholdInput opphold={bufferedOpphold(opphold)} setOpphold={setBufferedOpphold} />;
};

export const OppholdInput = ({
    opphold,
    setOpphold,
}: {
    opphold: Opphold;
    setOpphold: (opphold: Partial<Pick<Adresse, "valgtAdresse" | "brukerdefinert">>) => void;
}) => {
    return (
        <div>
            <RadioGroup
                defaultValue={opphold.valgtAdresse}
                onChange={async (valgtAdresse) => setOpphold({valgtAdresse})}
                legend={"Oppgi adressen der du bor (obligatorisk)"}
            >
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
            {opphold.valgtAdresse === AdresseValg.Soknad && (
                <AdresseSok
                    onChange={(nyVegadresse) => {
                        nyVegadresse && setOpphold({brukerdefinert: nyVegadresse});
                    }}
                />
            )}
            <NavEnhetStatusPanel navEnhet={opphold.navEnhet} />
        </div>
    );
};
