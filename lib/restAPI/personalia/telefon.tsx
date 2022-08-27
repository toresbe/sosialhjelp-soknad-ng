import {serverGet, serverPut} from "../rest-utils";

export interface Telefonnummer {
    brukerdefinert: null | boolean;
    systemverdi: null | string;
    brukerutfyltVerdi: null | string;
}

export const getTelefonnummer = async (behandlingsId: string) => {
    const translateBrukerdefinert = (data: Telefonnummer) => (data.brukerdefinert ? data.brukerutfyltVerdi : null);

    const data = await serverGet<Telefonnummer>(`soknader/${behandlingsId}/personalia/telefonnummer`);

    return {
        fraKRR: data.systemverdi,
        brukerdefinert: translateBrukerdefinert(data),
    };
};

export const setTelefonnummer = async (behandlingsId: string, tlfnr: string | null) => {
    await serverPut<Telefonnummer>(
        `soknader/${behandlingsId}/personalia/telefonnummer`,
        JSON.stringify({
            brukerdefinert: tlfnr !== null,
            brukerutfyltVerdi: tlfnr,
        })
    );
};
