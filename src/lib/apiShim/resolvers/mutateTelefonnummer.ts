import {
    SoknadMutation,
    MutationSetTelefonnummerArgs,
    Resolver,
    SetTelefonnummerInput,
} from "../../../generated/apolloServerTypes";
import {RESTRequest} from "../restClients";
import {LegacyTelefon, LegacyTelefonInput, LegacyTelefonSchema} from "../legacyTypes/personalia";
import {DeepPartial} from "utility-types";
import {ApolloContextType} from "../apolloServer";

const telefonnummerToLegacy = ({tlfnr}: Pick<SetTelefonnummerInput, "tlfnr">): LegacyTelefonInput => ({
    brukerdefinert: tlfnr !== null,
    brukerutfyltVerdi: tlfnr || null,
});

export const mutateTelefonnummer: Resolver<
    DeepPartial<SoknadMutation>,
    any,
    ApolloContextType,
    MutationSetTelefonnummerArgs
> = async (_, {input: {tlfnr, soknadId}}, {cookies}) => {
    await RESTRequest<LegacyTelefon>({
        method: "PUT",
        path: `soknader/${soknadId}/personalia/telefonnummer`,
        body: JSON.stringify(telefonnummerToLegacy({tlfnr})),
        schema: LegacyTelefonSchema,
        cookies,
    });

    return {
        soknad: {
            id: soknadId,
            telefon: {
                brukerdefinert: tlfnr,
            },
        },
    };
};
