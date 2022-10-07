import {LegacyAdresser, LegacyAdresserSchema} from "../legacyTypes/personalia";
import {serverGet} from "../restClients";
import {Opphold, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {adresseDataFraLegacy} from "../translators/adresseData";

export const resolveAdresser: Resolver<Opphold, Pick<Soknad, "id">> = async (parent) => {
    const legacyAdresse = await serverGet<LegacyAdresser>(
        `soknader/${parent.id}/personalia/adresser`,
        LegacyAdresserSchema
    );

    return adresseDataFraLegacy(legacyAdresse);
};
