import {
    MutationStatus,
    Resolver,
    SoknadMutationResult,
    SoknadMutationsAdresseArgs,
} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {restClient} from "../restClients";
import {
    LegacyAdresser,
    LegacyAdresserSchema,
    LegacyNavEnheter,
    LegacyNavEnheterSchema,
} from "../restSchemas/personalia";
import {vegadresseTilLegacy} from "../translators/vegadresse";
import {adresseValgTilLegacy} from "../translators/adresseValg";
import {navEnhetFraLegacy} from "../translators/navEnhet";
import {ApolloContextType} from "../apolloServer";

export const mutateAdresse: Resolver<
    DeepPartial<SoknadMutationResult>,
    any,
    ApolloContextType,
    SoknadMutationsAdresseArgs
> = async (_, {input: {behandlingsId, valgtAdresse, brukerdefinert}}, {cookies}) => {
    const adresser = await restClient<LegacyAdresser>({
        path: `soknader/${behandlingsId}/personalia/adresser`,
        schema: LegacyAdresserSchema,
        cookies,
    });

    const legacyAdresser: LegacyAdresser = {
        ...adresser,
        soknad: brukerdefinert ? vegadresseTilLegacy(brukerdefinert) : adresser.soknad,
        valg: valgtAdresse ? adresseValgTilLegacy(valgtAdresse) : null,
    };

    const legacyNavEnhet = await restClient<LegacyNavEnheter>({
        method: "PUT",
        body: JSON.stringify(legacyAdresser),
        path: `soknader/${behandlingsId}/personalia/adresser`,
        schema: LegacyNavEnheterSchema,
        cookies,
    });

    legacyNavEnhet[0].valgt = true;

    await restClient<LegacyNavEnheter>({
        method: "PUT",
        path: `soknader/${behandlingsId}/personalia/navEnheter`,
        body: JSON.stringify(legacyNavEnhet[0]),
        schema: LegacyNavEnheterSchema,
        cookies,
    });

    return {
        status: MutationStatus.Success,
        soknad: {
            id: behandlingsId,
            opphold: {
                navEnhet: navEnhetFraLegacy(legacyNavEnhet[0]),
                adresser: {
                    valgt: valgtAdresse,
                    soknadsadresse: brukerdefinert ?? undefined,
                },
            },
        },
    };
};
