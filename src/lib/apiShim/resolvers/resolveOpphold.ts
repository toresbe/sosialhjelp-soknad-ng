import {LegacyAdresser, LegacyAdresserSchema, LegacyNavEnhet, LegacyNavEnhetSchema} from "../legacyTypes/personalia";
import {serverGet} from "../restClients";
import {Opphold, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {adresseDataFraLegacy} from "../translators/adresseData";
import {navEnhetFraLegacy} from "../translators/navEnhet";

export const resolveOpphold: Resolver<Opphold, Pick<Soknad, "id">> = async (parent, _, context) => {
    const legacyAdresse = await serverGet<LegacyAdresser>(
        `soknader/${parent.id}/personalia/adresser`,
        LegacyAdresserSchema,
        context
    );

    const legacyNavEnhet = await serverGet<LegacyNavEnhet>(
        `soknader/${parent.id}/personalia/navEnhet`,
        LegacyNavEnhetSchema,
        context
    );

    return {
        ...adresseDataFraLegacy(legacyAdresse),
        navEnhet: navEnhetFraLegacy(legacyNavEnhet),
    };
};
