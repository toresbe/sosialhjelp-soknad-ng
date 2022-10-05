// Konverterer GraphQL-definert vegadresse til REST API-kompatibel
import {InputVegadresse} from "../../../generated/apolloServerTypes";
import {LegacyAdresseElement, LegacyGateadresse} from "../legacyTypes/personalia";

export const vegadresseTilLegacy = (adresse: InputVegadresse): LegacyAdresseElement => {
    const {husnummer, husbokstav, kommunenummer, postnummer, adressenavn} = adresse;

    return {
        type: "gateadresse",
        gateadresse: {
            gatenavn: adressenavn,
            husbokstav,
            husnummer,
            kommunenummer,
            postnummer,
        },
        matrikkeladresse: null,
        ustrukturert: null,
    };
};

export const vegadresseFraLegacy = (legacyGateadresse: LegacyGateadresse) => {
    const {gatenavn, husbokstav, husnummer, kommunenummer, postnummer} = legacyGateadresse;

    return {
        adressenavn: gatenavn,
        husbokstav,
        husnummer,
        kommunenummer,
        postnummer,
    };
};
