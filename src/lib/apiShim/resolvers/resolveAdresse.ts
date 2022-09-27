// Adresse og NAV-enhet

import {LegacyAdresser, LegacyAdresserSchema} from "../legacyTypes/personalia";
import {serverGet} from "../restClients";
import {AdresseData} from "../../../generated/apolloServerTypes";
import {adresseValgFraLegacy} from "../translators/adresseValg";

export const resolveAdresse = async (behandlingsId: string): Promise<AdresseData> => {
    const legacyAdresser = await serverGet<LegacyAdresser>(
        `soknader/${behandlingsId}/personalia/adresser`,
        LegacyAdresserSchema
    );

    const valgt = adresseValgFraLegacy(legacyAdresser.valg);

    return {
        bostedsadresse: undefined,
        oppholdsadresse: undefined,
        soknadsadresse: undefined,
        valgt,
    };
};
