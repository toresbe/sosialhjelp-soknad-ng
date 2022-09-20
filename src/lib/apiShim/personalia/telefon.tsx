import {serverGet, serverPut} from "../restClients";
import {LegacyTelefon, LegacyTelefonSchema} from "../schemas/personalia";

export const getTelefonnummer = async (behandlingsId: string) => {
    const translateBrukerdefinert = ({brukerdefinert, brukerutfyltVerdi}: LegacyTelefon) =>
        brukerdefinert ? brukerutfyltVerdi : null;

    const data = await serverGet<LegacyTelefon>(
        `soknader/${behandlingsId}/personalia/telefonnummer`,
        LegacyTelefonSchema
    );

    return {
        fraKrr: data.systemverdi,
        brukerdefinert: translateBrukerdefinert(data),
    };
};

export const setTelefonnummer = async (behandlingsId: string, tlfnr: string | null) => {
    await serverPut<LegacyTelefon>(
        `soknader/${behandlingsId}/personalia/telefonnummer`,
        JSON.stringify({
            brukerdefinert: tlfnr !== null,
            brukerutfyltVerdi: tlfnr,
        }),
        LegacyTelefonSchema
    );
};
