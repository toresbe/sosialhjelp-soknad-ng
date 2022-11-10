// NedetidResponse, TilgangResponse, etc go here
import {z} from "zod";

// I've removed sperrekode, which is always "bruker", because it can't be "pilot" anymore.
export const LegacyTilgangResponseSchema = z.object({harTilgang: z.boolean()});

export type LegacyTilgangResponse = z.infer<typeof LegacyTilgangResponseSchema>;
