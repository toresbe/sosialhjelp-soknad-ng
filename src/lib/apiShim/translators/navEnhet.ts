import {LegacyNavEnhet} from "../legacyTypes/personalia";
import {NavEnhet} from "../../../generated/apolloServerTypes";
import {navEnhetStatusFraLegacy} from "./navEnhetStatus";

// Konverter GraphQL-kompatibelt NAV-enhet fra legacy
export const navEnhetFraLegacy = (legacyEnhet: LegacyNavEnhet): NavEnhet => {
    const {enhetsnr, kommunenavn, enhetsnavn} = legacyEnhet;
    return {
        id: enhetsnr,
        kommune: kommunenavn,
        navn: enhetsnavn,
        status: navEnhetStatusFraLegacy(legacyEnhet),
    };
};
