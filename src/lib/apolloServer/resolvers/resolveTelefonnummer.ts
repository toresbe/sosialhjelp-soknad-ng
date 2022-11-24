import {restClient} from "../restClients";
import {LegacyTelefon, LegacyTelefonSchema} from "../restSchemas/personalia";
import {Resolver, Soknad, TelefonData} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";
import {ApolloContextType} from "../apolloServer";

export const resolveTelefonnummer: Resolver<TelefonData, DeepPartial<Soknad>, ApolloContextType> = async (
    parent,
    _,
    {cookies}
) => {
    const soknadId = parent.id;

    if (!soknadId) throw new Error("soknadId was nullish");

    const translateBrukerdefinert = ({brukerdefinert, brukerutfyltVerdi}: LegacyTelefon) =>
        brukerdefinert ? brukerutfyltVerdi : null;

    const data = await restClient<LegacyTelefon>({
        path: `soknader/${soknadId}/personalia/telefonnummer`,
        schema: LegacyTelefonSchema,
        cookies,
    });

    return {
        fraKrr: data.systemverdi,
        brukerdefinert: translateBrukerdefinert(data),
    };
};
