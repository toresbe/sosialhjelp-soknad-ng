import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {HTTPUnauthorized, serverGet} from "./lib/apiShim/restClients";
import {LegacyTilgangResponse, LegacyTilgangResponseSchema} from "./lib/apiShim/legacyTypes/statusInformation";

export const middleware = async (req: NextRequest) => {
    try {
        const cookies: Record<string, string> = {};

        req.cookies.getAll().forEach((c) => (cookies[c.name] = c.value));

        await serverGet<LegacyTilgangResponse>(
            `informasjon/utslagskriterier/sosialhjelp`,
            LegacyTilgangResponseSchema,
            cookies
        );

        return NextResponse.next();
    } catch (e: any) {
        const loginUrl = new URL(e.loginUrl);

        loginUrl.searchParams.set("redirect", req.url);
        if (e instanceof HTTPUnauthorized) return NextResponse.redirect(loginUrl);

        throw e;
    }
};
