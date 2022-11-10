import {
    MutationStatus,
    Resolver,
    Soknad,
    SoknadMutationResult,
    SoknadMutationsTelefonArgs,
    TelefonData,
} from "../../../generated/apolloServerTypes";
import {RESTRequest} from "../restClients";
import {LegacyTelefon, LegacyTelefonInput, LegacyTelefonSchema} from "../../legacyTypes/personalia";
import {DeepPartial} from "utility-types";
import {ApolloContextType} from "../apolloServer";

const telefonnummerToLegacy = ({brukerdefinert}: Pick<TelefonData, "brukerdefinert">): LegacyTelefonInput => ({
    brukerdefinert: brukerdefinert !== null,
    brukerutfyltVerdi: brukerdefinert || null,
});

export const mutateTelefonnummer: Resolver<
    DeepPartial<SoknadMutationResult>,
    Soknad,
    ApolloContextType,
    SoknadMutationsTelefonArgs
> = async ({id: behandlingsId}, {input: {brukerdefinert}}, {cookies}) => {
    await RESTRequest<LegacyTelefon>({
        method: "PUT",
        path: `soknader/${behandlingsId}/personalia/telefonnummer`,
        body: JSON.stringify(telefonnummerToLegacy({brukerdefinert})),
        schema: LegacyTelefonSchema,
        cookies,
    });

    return {
        status: MutationStatus.Success,
        soknad: {
            id: behandlingsId,
            telefon: {
                brukerdefinert: brukerdefinert,
            },
        },
    };
};
