import {MutationSetTelefonnummerArgs, Resolver, Soknad} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {serverPut} from "../restClients";
import {LegacyTelefon, LegacyTelefonSchema} from "../legacyTypes/personalia";

export const mutateTelefonnummer: Resolver<DeepPartial<Soknad>, any, any, MutationSetTelefonnummerArgs> = async (
    _,
    {soknadId, tlfnr}
) => {
    await serverPut<LegacyTelefon>(
        `soknader/${soknadId}/personalia/telefonnummer`,
        JSON.stringify({
            brukerdefinert: tlfnr !== null,
            brukerutfyltVerdi: tlfnr,
        }),
        LegacyTelefonSchema
    );

    return {
        id: soknadId,
        telefon: {
            brukerdefinert: tlfnr,
        },
    };
};
