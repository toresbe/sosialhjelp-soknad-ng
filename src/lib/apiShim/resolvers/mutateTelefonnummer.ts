import {
    SoknadMutation,
    MutationSetTelefonnummerArgs,
    Resolver,
    SetTelefonnummerInput,
} from "../../../generated/apolloServerTypes";
import {serverPut} from "../restClients";
import {LegacyTelefon, LegacyTelefonInput, LegacyTelefonSchema} from "../legacyTypes/personalia";
import {DeepPartial} from "utility-types";

const telefonnummerToLegacy = ({tlfnr}: Pick<SetTelefonnummerInput, "tlfnr">): LegacyTelefonInput => ({
    brukerdefinert: tlfnr !== null,
    brukerutfyltVerdi: tlfnr || null,
});

export const mutateTelefonnummer: Resolver<
    DeepPartial<SoknadMutation>,
    any,
    any,
    MutationSetTelefonnummerArgs
> = async (_, {input: {tlfnr, soknadId}}, context) => {
    await serverPut<LegacyTelefon>(
        `soknader/${soknadId}/personalia/telefonnummer`,
        JSON.stringify(telefonnummerToLegacy({tlfnr})),
        LegacyTelefonSchema,
        context
    );

    return {
        soknad: {
            id: soknadId,
            telefon: {
                brukerdefinert: tlfnr,
            },
        },
    };
};
