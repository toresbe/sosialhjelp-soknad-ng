import {LegacyAdresser, LegacyAdresserSchema, LegacyNavEnhet, LegacyNavEnhetSchema} from "../legacyTypes/personalia";
import {RESTRequest} from "../restClients";
import {Opphold, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {adresseDataFraLegacy} from "../translators/adresseData";
import {navEnhetFraLegacy} from "../translators/navEnhet";
import {ApolloContextType} from "../apolloServer";

export const resolveOpphold: Resolver<Opphold, Pick<Soknad, "id">, ApolloContextType> = async (
    parent,
    _,
    {cookies}
) => {
    const legacyAdresse = await RESTRequest<LegacyAdresser>({
        path: `soknader/${parent.id}/personalia/adresser`,
        schema: LegacyAdresserSchema,
        cookies,
    });

    const legacyNavEnhet = await RESTRequest<LegacyNavEnhet>({
        path: `soknader/${parent.id}/personalia/navEnhet`,
        schema: LegacyNavEnhetSchema,
        cookies,
    });

    return {
        ...adresseDataFraLegacy(legacyAdresse),
        navEnhet: navEnhetFraLegacy(legacyNavEnhet),
    };
};
