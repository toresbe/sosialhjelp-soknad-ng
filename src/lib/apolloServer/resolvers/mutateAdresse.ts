import {
    MutationStatus,
    Resolver,
    Soknad,
    SoknadMutationResult,
    SoknadMutationsAdresseArgs,
} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {RESTRequest} from "../restClients";
import {LegacyAdresser, LegacyAdresserSchema, LegacyNavEnhet, LegacyNavEnhetSchema} from "../../legacyTypes/personalia";
import {vegadresseTilLegacy} from "../translators/vegadresse";
import {adresseValgTilLegacy} from "../translators/adresseValg";
import {navEnhetFraLegacy} from "../translators/navEnhet";
import {UserInputError} from "apollo-server-micro";
import {ApolloContextType} from "../apolloServer";

export const mutateAdresse: Resolver<
    DeepPartial<SoknadMutationResult>,
    Soknad,
    ApolloContextType,
    SoknadMutationsAdresseArgs
> = async ({id: behandlingsId}, {input: {valg, brukerdefinert}}, {cookies}) => {
    if (!brukerdefinert) throw new UserInputError("brukerdefinert kan ikke være tom");
    if (!valg) throw new UserInputError("valg kan ikke være tom");

    const adresser = await RESTRequest<LegacyAdresser>({
        path: `soknader/${behandlingsId}/personalia/adresser`,
        schema: LegacyAdresserSchema,
        cookies,
    });

    const legacyAdresser: LegacyAdresser = {
        ...adresser,
        soknad: brukerdefinert ? vegadresseTilLegacy(brukerdefinert) : adresser.soknad,
        valg: adresseValgTilLegacy(valg),
    };

    const legacyNavEnhet = await RESTRequest<LegacyNavEnhet>({
        method: "PUT",
        path: `soknader/${behandlingsId}/personalia/adresser`,
        body: JSON.stringify(legacyAdresser),
        schema: LegacyNavEnhetSchema,
        cookies,
    });

    return {
        status: MutationStatus.Success,
        soknad: {
            id: behandlingsId,
            opphold: {
                navEnhet: navEnhetFraLegacy(legacyNavEnhet),
                adresser: {
                    valgt: valg,
                    soknadsadresse: brukerdefinert ?? undefined,
                },
            },
        },
    };
};
