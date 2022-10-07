// Konverterer GraphQL-definert vegadresse til REST API-kompatibel

import {AdresseFraSystem, InputVegadresse} from "../../../generated/apolloServerTypes";
import {LegacyAdresseElement, LegacyGateadresse} from "../legacyTypes/personalia";
import {formatLegacyGateadresse} from "../../formatters/FormatLegacyGateadresse";

export const vegadresseTilLegacy = (adresse: InputVegadresse): LegacyAdresseElement => {
    const {nummer, bokstav, kommunenummer, postnummer, adressenavn} = adresse;

    return {
        type: "gateadresse",
        gateadresse: {
            gatenavn: adressenavn,
            husbokstav: bokstav,
            husnummer: nummer,
            kommunenummer,
            postnummer,
        },
        matrikkeladresse: null,
        ustrukturert: null,
    };
};

export const vegadresseFraLegacy = (legacyGateadresse: LegacyGateadresse): AdresseFraSystem => {
    const {postnummer, poststed} = legacyGateadresse;

    if (!postnummer || !poststed) throw new Error("adresss lacks postnummer or poststed");

    return {
        adresseTekst: formatLegacyGateadresse(legacyGateadresse),
        postnummer: postnummer,
        poststed: poststed,
    };
};
