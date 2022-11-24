// Konverterer GraphQL-definert adressevalg til API-kompatibelt
import {LegacyAdresseKategori} from "../restSchemas/personalia";
import {AdresseValg, Maybe} from "../../../generated/apolloServerTypes";

// Konverter GraphQL-kompatibelt adressevalg til legacy-adressevalg
export const adresseValgTilLegacy = (valg: AdresseValg): LegacyAdresseKategori => {
    switch (valg) {
        case AdresseValg.Bosted:
            return "folkeregistrert";
        case AdresseValg.Opphold:
            return "midlertidig";
        case AdresseValg.Soknad:
            return "soknad";
    }
};

// Konverter GraphQL-kompatibelt adressevalg fra legacy-adressevalg
export const adresseValgFraLegacy = (valg: Maybe<LegacyAdresseKategori>): Maybe<AdresseValg> => {
    switch (valg) {
        case "folkeregistrert":
            return AdresseValg.Bosted;
        case "midlertidig":
            return AdresseValg.Opphold;
        case "soknad":
            return AdresseValg.Soknad;
        case null:
            return null;
    }
};
