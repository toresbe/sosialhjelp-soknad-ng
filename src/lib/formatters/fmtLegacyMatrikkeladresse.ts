import {LegacyMatrikkelAdresse} from "../apolloServer/restSchemas/personalia";

// Matrikkeladresse: <gardsnummer>/<bruksnummer>/<ev festenummer>-<ev undernummer>
// ev= hvis fins. Hvis ikke skal formateringstegn utgå foran/bak
// Støtter ikke adressetilleggsnavn
export const fmtLegacyMatrikkeladresse = ({
    gaardsnummer,
    bruksnummer,
    festenummer,
    undernummer,
}: Pick<LegacyMatrikkelAdresse, "gaardsnummer" | "bruksnummer"> & Partial<LegacyMatrikkelAdresse>) => {
    if (!/^\d+$/.test(gaardsnummer) || !/^\d+$/.test(bruksnummer))
        throw new Error("must have numeric gaardsnummer and bruksnummer");

    if (festenummer)
        if (undernummer) return `${gaardsnummer}/${bruksnummer}/${festenummer}-${undernummer}`;
        else return `${gaardsnummer}/${bruksnummer}/${festenummer}`;

    return `${gaardsnummer}/${bruksnummer}`;
};
