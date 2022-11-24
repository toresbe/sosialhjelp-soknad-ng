import {
    MutationStatus,
    Resolver,
    SoknadMutationResult,
    SoknadMutationsTelefonArgs,
    TelefonData,
} from "../../../generated/apolloServerTypes";
import {restClient} from "../restClients";
import {LegacyTelefon, LegacyTelefonInput, LegacyTelefonSchema} from "../restSchemas/personalia";
import {ApolloContextType} from "../apolloServer";
import {DeepPartial} from "utility-types";

const telefonnummerToLegacy = ({brukerdefinert}: Pick<TelefonData, "brukerdefinert">): LegacyTelefonInput => ({
    brukerdefinert: brukerdefinert !== null,
    brukerutfyltVerdi: brukerdefinert || null,
});

export const mutateTelefonnummer: Resolver<
    DeepPartial<SoknadMutationResult>,
    any,
    ApolloContextType,
    SoknadMutationsTelefonArgs
> = async (_, {input: {behandlingsId, brukerdefinert}}, {cookies}) => {
    await restClient<LegacyTelefon>({
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
