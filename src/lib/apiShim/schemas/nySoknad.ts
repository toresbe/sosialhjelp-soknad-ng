import {z} from "zod";

export const NySoknadResponseSchema = z.object({
    brukerBehandlingId: z.string(),
});

// Response from legacy API to application creation request
export type NySoknadResponse = z.infer<typeof NySoknadResponseSchema>;
