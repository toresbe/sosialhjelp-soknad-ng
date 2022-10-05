// Adresse og NAV-enhet

import {LegacyAdresser, LegacyAdresserSchema} from "../legacyTypes/personalia";
import {serverGet} from "../restClients";
import {AdresseData, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {adresseValgFraLegacy} from "../translators/adresseValg";

export const resolveAdresser: Resolver<AdresseData, Pick<Soknad, "id">> = async (parent): Promise<AdresseData> => {
    const legacyAdresser = await serverGet<LegacyAdresser>(
        `soknader/${parent.id}/personalia/adresser`,
        LegacyAdresserSchema
    );

    const valgt = adresseValgFraLegacy(legacyAdresser.valg);
    //const bostedsadresse = adresseFraLegacy(legacyAdresser.folkeregistrert);

    return {
        bostedsadresse: undefined,
        oppholdsadresse: undefined,
        soknadsadresse: undefined,
        valgt,
    };
};
