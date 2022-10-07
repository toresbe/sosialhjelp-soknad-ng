import {LegacyMatrikkelAdresse} from "../apiShim/legacyTypes/personalia";

// Matrikkeladresse: <gardsnummer>/<bruksnummer>/<ev festenummer>-<ev undernummer>
// ev= hvis fins. Hvis ikke skal formateringstegn utgå foran/bak
// Støtter ikke adressetilleggsnavn
export const formatLegacyMatrikkeladresse = ({
    gaardsnummer,
    bruksnummer,
    festenummer,
    undernummer,
}: LegacyMatrikkelAdresse) => {
    if (festenummer)
        if (undernummer) return `${gaardsnummer}/${bruksnummer}/${festenummer}-${undernummer}`;
        else return `${gaardsnummer}/${bruksnummer}/${festenummer}`;

    return `${gaardsnummer}/${bruksnummer}`;
};
