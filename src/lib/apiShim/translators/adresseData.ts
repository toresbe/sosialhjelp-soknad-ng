import {adresseValgFraLegacy} from "./adresseValg";
import {AdresseValg, Opphold} from "../../../generated/apolloServerTypes";
import {adresseFraLegacy} from "./adresse";
import {LegacyAdresser} from "../legacyTypes/personalia";

export const adresseDataFraLegacy = ({valg, folkeregistrert, soknad, midlertidig}: LegacyAdresser): Opphold => {
    const valgtAdresse = adresseValgFraLegacy(valg);

    if (!folkeregistrert && valgtAdresse == AdresseValg.Bosted)
        throw new Error("adressevalg == folkeregistrert, but folkeregistrert is null");

    return {
        valgtAdresse,
        bostedsAdresse: folkeregistrert ? adresseFraLegacy(folkeregistrert) : null,
        oppholdsAdresse: midlertidig ? adresseFraLegacy(midlertidig) : null,
        soknadsAdresse: soknad ? adresseFraLegacy(soknad) : null,
    };
};
