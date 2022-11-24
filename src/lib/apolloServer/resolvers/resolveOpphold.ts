import {LegacyAdresser, LegacyAdresserSchema, LegacyNavEnhet, LegacyNavEnhetSchema} from "../restSchemas/personalia";
import {restClient} from "../restClients";
import {Opphold, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {adresseDataFraLegacy} from "../translators/adresseData";
import {navEnhetFraLegacy} from "../translators/navEnhet";
import {ApolloContextType} from "../apolloServer";

export const resolveOpphold: Resolver<Opphold, Pick<Soknad, "id">, ApolloContextType> = async ({id}, _, {cookies}) => {
    const legacyAdresse = await restClient<LegacyAdresser>({
        path: `soknader/${id}/personalia/adresser`,
        schema: LegacyAdresserSchema,
        cookies,
    });

    // This just returns an empty string if no navEnhet is selected
    const legacyNavEnhet = await restClient<LegacyNavEnhet | string>({
        path: `soknader/${id}/personalia/navEnhet`,
        schema: LegacyNavEnhetSchema,
        cookies,
    });

    return {
        ...adresseDataFraLegacy(legacyAdresse),
        navEnhet: typeof legacyNavEnhet === "string" ? null : navEnhetFraLegacy(legacyNavEnhet),
    };
};
