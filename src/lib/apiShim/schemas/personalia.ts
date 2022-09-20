import {z} from "zod";

// In the absence of an API specification on the REST API,
// Zod is used to verify data returned from calls, in addition
// to typing.
//
// This allows us to verify that the data returned from the API
// conforms to our expectations.
//
// First, a schema is defined:
export const LegacyNavnSchema = z.object({
    fornavn: z.string(),
    mellomnavn: z.string().optional(),
    etternavn: z.string(),
    fulltNavn: z.string(),
});
// Then a type is inferred from it.
export type LegacyNavn = z.infer<typeof LegacyNavnSchema>;

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

export const LegacyKontonummerSchema = z.object({
    brukerdefinert: z.boolean(),
    systemverdi: z.string().nullable(),
    brukerutfyltVerdi: z.string().nullable(),
    harIkkeKonto: z.boolean().nullable(),
});

export type LegacyPersonalia = z.infer<typeof LegacyPersonaliaSchema>;
export type LegacyTelefon = z.infer<typeof LegacyTelefonSchema>;
export type LegacyKontonummer = z.infer<typeof LegacyKontonummerSchema>;
