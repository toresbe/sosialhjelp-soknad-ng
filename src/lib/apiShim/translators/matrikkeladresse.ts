import {LegacyMatrikkelAdresse} from "../legacyTypes/personalia";
import {Matrikkeladresse} from "../../../generated/apolloServerTypes";

// FIXME: MOCK
export const matrikkeladresseFraLegacy = (legacyMatrikkel: LegacyMatrikkelAdresse): Matrikkeladresse => {
    return {
        bruksnummer: "",
        festenummer: "",
        gaardsnummer: "",
        seksjonsnummer: "",
        undernummer: "",
    };
};
