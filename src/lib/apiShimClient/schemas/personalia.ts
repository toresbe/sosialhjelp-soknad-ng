import {z} from "zod";

export const LegacyNavnSchema = z.object({
    fornavn: z.string(),
    mellomnavn: z.string().optional(),
    etternavn: z.string(),
    fulltNavn: z.string(),
});

export const LegacyPersonaliaSchema = z.object({
    navn: LegacyNavnSchema,
    fodselsnummer: z.string(),
    statsborgerskap: z.string(),
    nordiskBorger: z.boolean(),
});

export const LegacyTelefonSchema = z.object({
    brukerdefinert: z.boolean(),
    systemverdi: z.string().nullable(),
    brukerutfyltVerdi: z.string().nullable(),
});

export type LegacyNavn = z.infer<typeof LegacyNavnSchema>;
export type LegacyPersonalia = z.infer<typeof LegacyPersonaliaSchema>;
export type LegacyTelefon = z.infer<typeof LegacyTelefonSchema>;
