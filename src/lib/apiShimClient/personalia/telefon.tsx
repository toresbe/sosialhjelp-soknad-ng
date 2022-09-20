import {serverGet, serverPut} from "../rest-utils";
import {LegacyTelefon} from "../schemas/personalia";

export const getTelefonnummer = async (behandlingsId: string) => {
    const translateBrukerdefinert = ({brukerdefinert, brukerutfyltVerdi}: LegacyTelefon) =>
        brukerdefinert ? brukerutfyltVerdi : null;

    const data = await serverGet<LegacyTelefon>(undefined, `soknader/${behandlingsId}/personalia/telefonnummer`);

    return {
        fraKrr: data.systemverdi,
        brukerdefinert: translateBrukerdefinert(data),
    };
};

export const setTelefonnummer = async (behandlingsId: string, tlfnr: string | null) => {
    await serverPut<LegacyTelefon>(
        JSON.stringify({
            brukerdefinert: tlfnr !== null,
            brukerutfyltVerdi: tlfnr,
        }),
        undefined,
        `soknader/${behandlingsId}/personalia/telefonnummer`
    );
};
