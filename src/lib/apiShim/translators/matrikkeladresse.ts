import {LegacyMatrikkelAdresse} from "../legacyTypes/personalia";
import {AdresseFraSystem} from "../../../generated/apolloServerTypes";
import {formatLegacyMatrikkeladresse} from "../../formatters/FormatLegacyMatrikkeladresse";

export const matrikkeladresseFraLegacy = (adresse: LegacyMatrikkelAdresse): AdresseFraSystem => ({
    adresseTekst: formatLegacyMatrikkeladresse(adresse),
    postnummer: adresse.postnummer,
    poststed: adresse.poststed,
});
