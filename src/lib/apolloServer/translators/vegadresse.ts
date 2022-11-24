// Konverterer GraphQL-definert vegadresse til REST API-kompatibel

import {AdresseFraSystem, InputVegadresse, Vegadresse} from "../../../generated/apolloServerTypes";
import {LegacyAdresseElement, LegacyAdressesokTreff, LegacyGateadresse} from "../restSchemas/personalia";
import {fmtLegacyGateadresse} from "../../formatters/fmtLegacyGateadresse";

export const vegadresseTilLegacy = (adresse: InputVegadresse): LegacyAdresseElement => {
    const {nummer, bokstav, kommunenummer, postnummer, poststed, adressenavn} = adresse;

    return {
        type: "gateadresse",
        gateadresse: {
            gatenavn: adressenavn,
            husbokstav: bokstav ?? null,
            husnummer: nummer,
            kommunenummer: kommunenummer ?? null,
            postnummer,
            poststed,
        },
        matrikkeladresse: null,
        ustrukturert: null,
    };
};

export const adresseTekstFraLegacy = (legacyGateadresse: LegacyGateadresse): AdresseFraSystem => {
    const {postnummer, poststed} = legacyGateadresse;

    if (!postnummer || !poststed) throw new Error("adresss lacks postnummer or poststed");

    return {
        adresseTekst: fmtLegacyGateadresse(legacyGateadresse),
        postnummer: postnummer,
        poststed: poststed,
    };
};

export const vegadresseFraLegacyTreff = (legacyGateadresse: LegacyAdressesokTreff): Vegadresse => {
    const {adresse, husnummer, husbokstav, postnummer, poststed} = legacyGateadresse;

    return {
        adressenavn: adresse,
        nummer: husnummer,
        bokstav: husbokstav,
        postnummer,
        poststed,
    };
};
