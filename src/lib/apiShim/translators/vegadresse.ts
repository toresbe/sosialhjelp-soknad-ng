// Konverterer GraphQL-definert vegadresse til REST API-kompatibel
import {NyVegadresse} from "../../../generated/apolloServerTypes";
import {LegacyAdresseElement, LegacyGateadresse} from "../legacyTypes/personalia";

export const vegadresseTilLegacy = (adresse: NyVegadresse): LegacyAdresseElement => {
    const {husnummer, husbokstav, kommunenummer, postnummer, adressenavn} = adresse;

    return {
        type: "gateadresse",
        gateadresse: {
            gatenavn: adressenavn,
            husbokstav: husbokstav,
            husnummer: husnummer,
            kommunenummer: kommunenummer,
            postnummer: postnummer,
        },
        matrikkeladresse: null,
        ustrukturert: null,
    };
};
const vegadresseFraLegacy = (legacyGateadresse: LegacyGateadresse) => {};
