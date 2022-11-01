import {z} from "zod";

export const LoginRedirectSchema = z.object({id: z.string(), message: z.string(), loginUrl: z.string()});

export type LoginRedirect = z.infer<typeof LoginRedirectSchema>;
