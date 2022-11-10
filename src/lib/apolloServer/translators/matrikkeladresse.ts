import {LegacyMatrikkelAdresse} from "../../legacyTypes/personalia";
import {AdresseFraSystem} from "../../../generated/apolloServerTypes";
import {fmtLegacyMatrikkeladresse} from "../../formatters/fmtLegacyMatrikkeladresse";

export const matrikkeladresseFraLegacy = (adresse: LegacyMatrikkelAdresse): AdresseFraSystem => ({
    adresseTekst: fmtLegacyMatrikkeladresse(adresse),
    postnummer: adresse.postnummer,
    poststed: adresse.poststed,
});
