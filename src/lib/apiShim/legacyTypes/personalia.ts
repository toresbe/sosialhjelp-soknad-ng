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

export const LegacyTelefonInputSchema = z.object({
    brukerdefinert: z.boolean(),
    brukerutfyltVerdi: z.string().nullable(),
});

export type LegacyTelefonInput = z.infer<typeof LegacyTelefonInputSchema>;

export const LegacyKontonummerSchema = z.object({
    brukerdefinert: z.boolean(),
    systemverdi: z.string().nullable(),
    brukerutfyltVerdi: z.string().nullable(),
    harIkkeKonto: z.boolean().nullable(),
});

export const LegacyNavEnhetSchema = z.object({
    orgnr: z.null(),
    behandlingsansvarlig: z.null(),
    enhetsnr: z.string(),
    isMottakMidlertidigDeaktivert: z.boolean(),
    isMottakDeaktivert: z.boolean(),
    enhetsnavn: z.string(),
    kommunenavn: z.string(),
    kommuneNr: z.string(),
    valgt: z.boolean(),
});

export type LegacyNavEnhet = z.infer<typeof LegacyNavEnhetSchema>;

export const LegacyAdressesokTreffSchema = z.object({
    adresse: z.string().nullable(),
    husnummer: z.string().nullable(),
    husbokstav: z.string().nullable(),
    kommunenummer: z.string().length(4).nullable(),
    kommunenavn: z.string().nullable(),
    postnummer: z.string().nullable(),
    poststed: z.string().nullable(),
    geografiskTilknytning: z.string().nullable(),
    gatekode: z.string().nullable(),
    bydel: z.string().nullable(),
    type: z.literal("GATEADRESSE"),
});

export type LegacyAdressesokTreff = z.infer<typeof LegacyAdressesokTreffSchema>;

// Oversettelser til ajour terminologi:
// folkeregistrert -> oppholdsaddresse
// midlertidig -> bostedsaddresse
const LegacyAdresseKategoriSchema = z.enum(["folkeregistrert", "midlertidig", "soknad"]);
export type LegacyAdresseKategori = z.infer<typeof LegacyAdresseKategoriSchema>;

// 'Ustrukturert' er fjernet her, ikke lenger støttet.
// Derfor ønskelig at det gir en feil om vi treffer på det.
const LegacyAdresseTypeSchema = z.enum(["gateadresse", "matrikkeladresse"]);

export const LegacyMatrikkelAdresseSchema = z.object({
    bruksnummer: z.string(),
    gaardsnummer: z.string(),
    festenummer: z.string(),
    seksjonsnummer: z.string(),
    undernummer: z.string(),
    // FIXME: Disse finnes pt. ikke i backend!
    postnummer: z.string().default(""),
    poststed: z.string().default(""),
});

export type LegacyMatrikkelAdresse = z.infer<typeof LegacyMatrikkelAdresseSchema>;

// All of these are nullable because the data is of varying quality
// https://pdldocs-navno.msappproxy.net/ekstern/index.html#opplysningstyper-adresseformater-vegadresse
export const LegacyGateadresseSchema = z
    .object({
        kommunenummer: z.string().nullable(),
        landkode: z.null(),
        adresselinjer: z.array(z.string()),
        bolignummer: z.string().nullable(),
        postnummer: z.string().nullable(),
        poststed: z.string().nullable(),
        gatenavn: z.string().nullable(),
        husnummer: z.string().nullable(),
        husbokstav: z.string().nullable(),
    })
    .partial();

export type LegacyGateadresse = z.infer<typeof LegacyGateadresseSchema>;

export const LegacyAdresseElementSchema = z.object({
    type: LegacyAdresseTypeSchema,
    gateadresse: LegacyGateadresseSchema.nullable(),
    matrikkeladresse: LegacyMatrikkelAdresseSchema.nullable(),
    ustrukturert: z.null(),
});

export type LegacyAdresseElement = z.infer<typeof LegacyAdresseElementSchema>;

export const LegacyAdresserSchema = z.object({
    valg: LegacyAdresseKategoriSchema,
    folkeregistrert: LegacyAdresseElementSchema.nullable(),
    midlertidig: LegacyAdresseElementSchema.nullable(),
    soknad: LegacyAdresseElementSchema.nullable(),
});

export type LegacyAdresser = z.infer<typeof LegacyAdresserSchema>;
export type LegacyPersonalia = z.infer<typeof LegacyPersonaliaSchema>;
export type LegacyTelefon = z.infer<typeof LegacyTelefonSchema>;
export type LegacyKontonummer = z.infer<typeof LegacyKontonummerSchema>;
