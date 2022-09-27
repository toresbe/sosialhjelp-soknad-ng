import {serverGet} from "../restClients";
import {LegacyTelefon, LegacyTelefonSchema} from "../legacyTypes/personalia";
import {Resolver, Soknad, TelefonData} from "../../../generated/apolloServerTypes";
import {DeepPartial} from "utility-types";

export const resolveTelefonnummer: Resolver<TelefonData, DeepPartial<Soknad>> = async (parent) => {
    const soknadId = parent.id;

    if (!soknadId) throw new Error("soknadId was nullish");

    const translateBrukerdefinert = ({brukerdefinert, brukerutfyltVerdi}: LegacyTelefon) =>
        brukerdefinert ? brukerutfyltVerdi : null;

    const data = await serverGet<LegacyTelefon>(`soknader/${soknadId}/personalia/telefonnummer`, LegacyTelefonSchema);

    return {
        fraKrr: data.systemverdi,
        brukerdefinert: translateBrukerdefinert(data),
    };
};
